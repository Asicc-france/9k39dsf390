import { getBackend } from '../backend';
import { tr, esc, base, lang, errMsg, isEmail, demoBar, setBusy } from './common';

const root = document.getElementById('app')!;
root.innerHTML = `
  <div class="card auth-card stack gap-24">
    <div class="stack gap-8">
      <span class="m-badge" style="align-self:flex-start">${esc(tr('membersOnly'))}</span>
      <h1 class="h2">${esc(tr('loginTitle'))}</h1>
      <p class="muted">${esc(tr('loginIntro'))}</p>
    </div>
    <form class="stack gap-16" novalidate>
      <label class="field">${esc(tr('email'))}<input name="email" type="email" autocomplete="email" required></label>
      <label class="field">${esc(tr('password'))}<input name="password" type="password" autocomplete="current-password" required></label>
      <p class="err" data-msg role="alert"></p>
      <button class="btn btn-dark" type="submit">${esc(tr('login'))}</button>
      <button class="btn btn-ghost btn-sm" type="button" data-reset style="align-self:flex-start;border:0;padding-left:0">${esc(tr('forgot'))}</button>
    </form>
    <p class="small muted" style="border-top:1px solid var(--line);padding-top:20px">${esc(tr('noAccount'))} <a href="${base}signup/">${esc(tr('signupLink'))}</a></p>
  </div>`;

const form = root.querySelector('form')!;
const msg = root.querySelector<HTMLElement>('[data-msg]')!;
const say = (t: string, ok = false) => { msg.textContent = t; msg.style.color = ok ? 'var(--ok)' : ''; };

getBackend().then((b) => {
  demoBar(b);
  const next = new URLSearchParams(location.search).get('next');
  const go = () => location.replace(next && next.startsWith(base) ? next : base);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const pw = (form.elements.namedItem('password') as HTMLInputElement).value;
    if (!isEmail(email)) return say(tr('err.email'));
    if (!pw) return say(tr('err.required'));
    const btn = form.querySelector<HTMLButtonElement>('[type=submit]')!;
    setBusy(btn, true); say('');
    try { await b.signIn(email, pw); go(); }
    catch (err) { say(errMsg(err)); setBusy(btn, false); }
  });
  root.querySelector('[data-reset]')!.addEventListener('click', async () => {
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    if (!isEmail(email)) return say(tr('resetNeedEmail'));
    try { await b.resetPassword(email, lang); say(tr('resetSent'), true); }
    catch (err) { say(errMsg(err)); }
  });
});
