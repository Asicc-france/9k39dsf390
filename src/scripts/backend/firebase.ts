// 실제 백엔드: Firebase Authentication + Cloud Firestore + Cloud Storage
// 접근 권한은 이 파일이 아니라 firestore.rules / storage.rules가 서버에서 강제합니다.
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, sendPasswordResetEmail, sendEmailVerification, deleteUser, type User as FbUser,
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, addDoc,
  query, orderBy, serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AppError, type Backend, type Item, type Profile, type User } from './types';

// 인증 메일의 돌아올 주소 (GitHub Pages 하위 경로 대응)
const ROOT = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
const back = (lang: string, p: string) => `${location.origin}${ROOT}${lang}/${p}`;

const toUser = (u: FbUser | null): User | null => (u ? { uid: u.uid, email: u.email ?? '', emailVerified: u.emailVerified } : null);
const millis = (v: any) => (v instanceof Timestamp ? v.toMillis() : typeof v === 'number' ? v : 0);
const wrap = async <T>(p: Promise<T>): Promise<T> => {
  try { return await p; } catch (e: any) { throw new AppError(e?.code ?? 'unknown', e?.message); }
};
const safeName = (n: string) => n.replace(/[^\w.\-가-힣]/g, '_').slice(0, 120);

export function createFirebaseBackend(config: FirebaseOptions): Backend {
  const app = initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const norm = (id: string, d: any): Item => ({ ...d, id, createdAt: millis(d.createdAt) });
  const normProfile = (d: any): Profile => ({ ...d, createdAt: millis(d.createdAt), approvedAt: d.approvedAt ? millis(d.approvedAt) : null });

  return {
    mode: 'firebase',
    onAuth(cb) { onAuthStateChanged(auth, (u) => cb(toUser(u))); },
    async signUp(email, password, lang) {
      auth.languageCode = lang;
      const cred = await wrap(createUserWithEmailAndPassword(auth, email.trim(), password));
      await wrap(sendEmailVerification(cred.user, { url: back(lang, 'membres/') }));
      return toUser(cred.user)!;
    },
    async signIn(email, password) {
      const cred = await wrap(signInWithEmailAndPassword(auth, email.trim(), password));
      return toUser(cred.user)!;
    },
    async signOut() { await signOut(auth); },
    async resetPassword(email, lang) {
      auth.languageCode = lang;
      await wrap(sendPasswordResetEmail(auth, email.trim(), { url: back(lang, 'membres/login/') }));
    },
    async resendVerification(lang) {
      if (!auth.currentUser) return;
      auth.languageCode = lang;
      await wrap(sendEmailVerification(auth.currentUser, { url: back(lang, 'membres/') }));
    },
    async reloadUser() {
      if (!auth.currentUser) return null;
      await auth.currentUser.reload();
      await auth.currentUser.getIdToken(true); // email_verified 값을 규칙에 반영
      return toUser(auth.currentUser);
    },
    async deleteAccount() {
      const u = auth.currentUser; if (!u) return;
      await wrap(deleteDoc(doc(db, 'members', u.uid)));
      await wrap(deleteUser(u));
    },

    async getProfile(uid) {
      const snap = await wrap(getDoc(doc(db, 'members', uid)));
      return snap.exists() ? normProfile(snap.data()) : null;
    },
    async createProfile(uid, p) {
      await wrap(setDoc(doc(db, 'members', uid), {
        ...p, uid, status: 'pending', role: 'member', repLevel: null, createdAt: serverTimestamp(),
      }));
    },
    async updateMyProfile(uid, patch) { await wrap(updateDoc(doc(db, 'members', uid), patch)); },

    async list(col) {
      const snap = await wrap(getDocs(query(collection(db, col), orderBy('createdAt', 'desc'))));
      return snap.docs.map((d) => norm(d.id, d.data()))
        .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || b.createdAt - a.createdAt);
    },
    async add(col, data, files = []) {
      const extra: Record<string, any> = {};
      if (col === 'sharing') {
        const u = auth.currentUser!;
        const me = await getDoc(doc(db, 'members', u.uid));
        extra.uid = u.uid; extra.authorName = me.data()?.name ?? '';
      }
      const docRef = await wrap(addDoc(collection(db, col), { ...data, ...extra, createdAt: serverTimestamp() }));
      if (files.length) {
        const stored = [];
        for (const f of files) {
          const path = `${col}/${docRef.id}/${safeName(f.name)}`;
          await wrap(uploadBytes(ref(storage, path), f, { contentType: f.type }));
          stored.push({ name: f.name, path });
        }
        await wrap(updateDoc(docRef, { files: stored }));
      }
      return docRef.id;
    },
    async remove(col, id) {
      // 첨부 파일은 Storage에 남습니다. 정기적으로 콘솔에서 정리하거나 Cloud Function으로 자동화할 수 있습니다.
      await wrap(deleteDoc(doc(db, col, id)));
    },
    async fileUrl(f) { return wrap(getDownloadURL(ref(storage, f.path))); },
    async submitPublic(col, data) {
      await wrap(addDoc(collection(db, col), { ...data, date: new Date().toISOString().slice(0, 10), createdAt: serverTimestamp() }));
    },

    async listMembers() {
      const snap = await wrap(getDocs(collection(db, 'members')));
      return snap.docs.map((d) => normProfile(d.data())).sort((a, b) => b.createdAt - a.createdAt);
    },
    async setStatus(uid, status, by) {
      await wrap(updateDoc(doc(db, 'members', uid), { status, approvedBy: by, approvedAt: serverTimestamp() }));
    },
    async setRole(uid, role, repLevel) { await wrap(updateDoc(doc(db, 'members', uid), { role, repLevel })); },
  };
}
