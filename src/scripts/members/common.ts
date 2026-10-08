import { M, type MKey } from './i18n';
import { AppError, type Backend, type Lang } from '../backend';

export const lang: Lang = document.documentElement.lang === 'fr' ? 'fr' : 'ko';
export const tr = (k: MKey | string): string => (M[lang] as any)[k] ?? (M.ko as any)[k] ?? k;
/** 사이트 기본 경로 (GitHub Pages 하위 경로 대응) */
export const ROOT = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
/** 같은 언어의 공개 페이지 주소 */
export const pub = (p = '') => `${ROOT}${lang}/${p}`;
export const base = pub('membres/');

export const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const errMsg = (e: unknown) => {
  const code = e instanceof AppError ? e.code : 'unknown';
  if (!(e instanceof AppError)) console.error(e);
  return tr(code) === code ? tr('unknown') : tr(code);
};

export const fmtDate = (s?: string | number) => {
  if (!s) return '';
  const d = new Date(s);
  return lang === 'ko'
    ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
    : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

/** 데모 모드 안내 띠 */
export function demoBar(b: Backend) {
  if (b.mode !== 'demo' || document.querySelector('.demo-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'demo-bar';
  bar.innerHTML = `${esc(tr('demo'))}: <code>admin@demo.asicc</code> (${lang === 'ko' ? '임원' : 'bureau'}) · <code>parent@demo.asicc</code> · <code>new@demo.asicc</code> (${lang === 'ko' ? '승인 대기' : 'en attente'}) / <code>demo1234</code> · <button type="button" style="border:0;background:none;color:inherit;text-decoration:underline;padding:0">${esc(tr('demoReset'))}</button>`;
  bar.querySelector('button')!.addEventListener('click', async () => {
    const { resetDemo } = await import('../backend/demo');
    resetDemo(); location.reload();
  });
  document.body.prepend(bar);
}

export const spinner = () => `<div class="spinner" role="status" aria-label="${esc(tr('loading'))}"></div>`;

export function setBusy(btn: HTMLButtonElement, busy: boolean) {
  btn.disabled = busy;
  btn.setAttribute('aria-busy', String(busy));
}

export const levelChecks = (name: string, selected: string[] = []) =>
  (['mat', 'elem', 'col'] as const)
    .map((l) => `<label class="check"><input type="checkbox" name="${name}" value="${l}" ${selected.includes(l) ? 'checked' : ''}>${esc(tr('lv.' + l))}</label>`)
    .join('');

export function fieldError(form: HTMLFormElement, name: string, msg: string) {
  const el = form.querySelector<HTMLElement>(`[data-err="${name}"]`);
  if (el) el.textContent = msg;
}
export function clearErrors(form: HTMLFormElement) {
  form.querySelectorAll<HTMLElement>('[data-err]').forEach((e) => (e.textContent = ''));
}
