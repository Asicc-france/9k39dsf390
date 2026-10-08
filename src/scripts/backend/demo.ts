// 데모 백엔드: Firebase 연결 전 화면과 흐름을 시험하기 위한 가짜 데이터.
// 모든 데이터는 이 브라우저의 localStorage에만 저장되며 다른 사람에게 보이지 않습니다.
import { AppError, type Backend, type ContentCol, type InboxCol, type Item, type Profile, type User } from './types';

const KEY = 'asicc-demo-v2';
type DemoUser = { uid: string; email: string; pw: string };
interface State {
  users: Record<string, DemoUser>;            // key: email
  session: string | null;                      // uid
  members: Record<string, Profile>;
  cols: Record<string, Item[]>;
}

const day = (s: string) => new Date(s).getTime();
const uid = () => Math.random().toString(36).slice(2, 12);

function seed(): State {
  const admin: Profile = { uid: 'u-admin', name: '데모 임원', email: 'admin@demo.asicc', levels: ['mat'], phone: '', imageConsent: true, privacyConsent: true, lang: 'ko', status: 'approved', role: 'admin', repLevel: 'mat', createdAt: day('2026-04-01') };
  const parent: Profile = { uid: 'u-parent', name: '데모 학부모', email: 'parent@demo.asicc', levels: ['elem'], phone: '', imageConsent: true, privacyConsent: true, lang: 'ko', status: 'approved', role: 'member', repLevel: null, createdAt: day('2026-05-01') };
  const pending: Profile = { uid: 'u-pending', name: '가입 대기 학부모', email: 'new@demo.asicc', levels: ['mat', 'elem'], phone: '', imageConsent: false, privacyConsent: true, lang: 'fr', status: 'pending', role: 'member', repLevel: null, createdAt: day('2026-10-07') };
  const it = (o: Record<string, any>): Item => ({ id: uid(), createdAt: day(o.date ?? '2026-10-01'), ...o });
  return {
    users: {
      'admin@demo.asicc': { uid: 'u-admin', email: 'admin@demo.asicc', pw: 'demo1234' },
      'parent@demo.asicc': { uid: 'u-parent', email: 'parent@demo.asicc', pw: 'demo1234' },
      'new@demo.asicc': { uid: 'u-pending', email: 'new@demo.asicc', pw: 'demo1234' },
    },
    session: null,
    members: { 'u-admin': admin, 'u-parent': parent, 'u-pending': pending },
    cols: {
      // 아래는 화면 확인용 가상 예시입니다. 실제 협회 자료는 넣지 않습니다.
      notices: [
        it({ date: '2026-10-05', title: '[예시] 정기총회 결과 안내', body: '공지 예시입니다. 실제 공지는 임원 관리 화면에서 등록합니다.' }),
        it({ date: '2026-09-24', title: '[예시] 행사 준비 수요 조사', body: '학교급 대표에게 회신해 주세요.' }),
      ],
      minutes: [
        it({ date: '2026-10-04', title: '[예시] 정기총회', type: 'ag', summary: '회의록 예시', files: [{ name: 'exemple-pv.pdf', path: 'demo' }] }),
        it({ date: '2026-03-16', title: '[예시] 설립 모임', type: 'founding', summary: '정관 채택', files: [{ name: 'exemple-statuts.pdf', path: 'demo' }] }),
      ],
      relations: [
        it({ date: '2026-10-06', org: 'edu-center', title: '[예시] 면담 요청', note: '기관별 접촉 기록 예시입니다.' }),
        it({ date: '2026-09-28', org: 'ministry', title: '[예시] 건의 전달', note: '경과와 다음 단계를 적어 둡니다.' }),
        it({ date: '2026-05-10', org: 'community', title: '[예시] 협력 논의', note: '담당자가 바뀌어도 이어갈 수 있도록 기록합니다.' }),
      ],
      gallery: [
        it({ date: '2026-10-02', cat: 'class', grade: 'GS', caption: '[예시] 학급 활동' }),
        it({ date: '2026-09-30', cat: 'art', grade: 'CE1', caption: '[예시] 그림' }),
        it({ date: '2026-09-25', cat: 'diary', grade: 'CP', caption: '[예시] 그림일기' }),
      ],
      expenses: [
        it({ date: '2026-10-01', label: '책임보험', amount: '' }),
        it({ date: '2026-10-01', label: '도메인·웹사이트', amount: '' }),
      ],
      sharing: [
        it({ date: '2026-09-24', title: '[예시] 그림책 나눔', body: '나눔 글 예시입니다.', uid: 'u-parent', authorName: '데모 학부모' }),
        it({ date: '2026-09-14', title: '[예시] 아동 의류 나눔', body: '나눔 글 예시입니다.', uid: 'u-parent', authorName: '데모 학부모' }),
      ],
      messages: [it({ date: '2026-10-07', name: 'Exemple', email: 'exemple@example.fr', type: 'admission', level: 'mat', message: 'Bonjour, quelles sont les conditions d’admission en GS ?' })],
      registrations: [],
      subscribers: [],
    },
  };
}

function load(): State {
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch {}
  const s = seed(); save(s); return s;
}
function save(s: State) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }

const fileToDataUrl = (f: File) => new Promise<string>((res, rej) => {
  const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = rej; r.readAsDataURL(f);
});
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export function createDemoBackend(): Backend {
  let s = load();
  const listeners: ((u: User | null) => void)[] = [];
  const current = (): User | null => {
    if (!s.session) return null;
    const u = Object.values(s.users).find((x) => x.uid === s.session);
    return u ? { uid: u.uid, email: u.email, emailVerified: true } : null;
  };
  const emit = () => listeners.forEach((l) => l(current()));
  const me = () => (s.session ? s.members[s.session] : undefined);
  const requireApproved = () => { if (me()?.status !== 'approved') throw new AppError('permission-denied'); };
  const requireStaff = () => { const m = me(); if (!m || m.status !== 'approved' || (m.role !== 'admin' && m.role !== 'rep')) throw new AppError('permission-denied'); };
  const requireAdmin = () => { if (me()?.role !== 'admin' || me()?.status !== 'approved') throw new AppError('permission-denied'); };

  return {
    mode: 'demo',
    onAuth(cb) { listeners.push(cb); setTimeout(() => cb(current()), 0); },
    async signUp(email, pw) {
      await wait();
      email = email.trim().toLowerCase();
      if (s.users[email]) throw new AppError('auth/email-already-in-use');
      if (pw.length < 8) throw new AppError('auth/weak-password');
      const u = { uid: 'u-' + uid(), email, pw };
      s.users[email] = u; s.session = u.uid; save(s); emit();
      return { uid: u.uid, email, emailVerified: true };
    },
    async signIn(email, pw) {
      await wait();
      const u = s.users[email.trim().toLowerCase()];
      if (!u || u.pw !== pw) throw new AppError('auth/invalid-credential');
      s.session = u.uid; save(s); emit();
      return { uid: u.uid, email: u.email, emailVerified: true };
    },
    async signOut() { s.session = null; save(s); emit(); },
    async resetPassword() { await wait(); },
    async resendVerification() { await wait(); },
    async reloadUser() { return current(); },
    async deleteAccount() {
      const u = current(); if (!u) return;
      delete s.members[u.uid]; delete s.users[u.email]; s.session = null; save(s); emit();
    },

    async getProfile(id) { s = load(); return s.members[id] ?? null; },
    async createProfile(id, p) {
      s.members[id] = { ...p, uid: id, status: 'pending', role: 'member', repLevel: null, createdAt: Date.now() };
      save(s);
    },
    async updateMyProfile(id, patch) { s.members[id] = { ...s.members[id], ...patch }; save(s); },

    async list(col) {
      s = load();
      if (['messages', 'registrations', 'subscribers'].includes(col)) requireAdmin(); else requireApproved();
      return [...(s.cols[col] ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || b.createdAt - a.createdAt);
    },
    async add(col, data, files = []) {
      if (col === 'sharing') requireApproved(); else requireAdmin();
      await wait();
      const stored = [];
      for (const f of files) {
        stored.push({ name: f.name, path: 'demo', url: f.type.startsWith('image/') && f.size < 1_500_000 ? await fileToDataUrl(f) : undefined });
      }
      const item: Item = { id: uid(), createdAt: Date.now(), ...data, ...(stored.length ? { files: stored } : {}) };
      if (col === 'sharing') { item.uid = s.session; item.authorName = me()?.name; }
      (s.cols[col] ??= []).push(item); save(s);
      return item.id;
    },
    async remove(col, id) {
      const item = s.cols[col]?.find((x) => x.id === id);
      if (!(col === 'sharing' && item?.uid === s.session)) requireAdmin();
      s.cols[col] = (s.cols[col] ?? []).filter((x) => x.id !== id); save(s);
    },
    async fileUrl(f) { if (f.url) return f.url; throw new AppError('demo-file'); },
    async submitPublic(col, data) {
      await wait(400);
      (s.cols[col] ??= []).push({ id: uid(), createdAt: Date.now(), date: new Date().toISOString().slice(0, 10), ...data });
      save(s);
    },

    async listMembers() { s = load(); requireStaff(); return Object.values(s.members).sort((a, b) => b.createdAt - a.createdAt); },
    async setStatus(id, status, by) {
      requireStaff();
      const m = me()!, target = s.members[id];
      if (m.role === 'rep' && !target.levels.includes(m.repLevel!)) throw new AppError('permission-denied');
      s.members[id] = { ...target, status, approvedBy: by, approvedAt: Date.now() }; save(s);
    },
    async setRole(id, role, repLevel) { requireAdmin(); s.members[id] = { ...s.members[id], role, repLevel }; save(s); },
  };
}

/** 데모 데이터를 처음 상태로 되돌림 */
export function resetDemo() { try { localStorage.removeItem(KEY); } catch {} }
