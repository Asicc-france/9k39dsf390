import { getBackend, type Level } from '../backend';
import { tr, esc, base, pub, lang, errMsg, isEmail, demoBar, setBusy, levelChecks, fieldError, clearErrors } from './common';

const root = document.getElementById('app')!;
const err = (n: string) => `<span class="err" data-err="${n}"></span>`;
root.innerHTML = `
  <div class="card auth-card wide stack gap-24">
    <div class="stack gap-8">
      <span class="m-badge" style="align-self:flex-start">${esc(tr('membersOnly'))}</span>
      <h1 class="h2">${esc(tr('signupTitle'))}</h1>
      <p class="muted">${esc(tr('signupIntro'))}</p>
    </div>
    <form class="stack gap-32" novalidate>
      <fieldset class="form" style="border:0;padding:0;margin:0">
        <legend class="h3" style="margin-bottom:12px">1. ${esc(tr('stepAccount'))}</legend>
        <label class="field full">${esc(tr('email'))}<input name="email" type="email" autocomplete="email" required>${err('email')}</label>
        <label class="field">${esc(tr('password'))}<input name="password" type="password" autocomplete="new-password" minlength="8" required><span class="hint">${esc(tr('pwHint'))}</span>${err('password')}</label>
        <label class="field">${esc(tr('password2'))}<input name="password2" type="password" autocomplete="new-password" required>${err('password2')}</label>
      </fieldset>
      <fieldset class="form" style="border:0;padding:0;margin:0">
        <legend class="h3" style="margin-bottom:12px">2. ${esc(tr('stepFamily'))}</legend>
        <label class="field">${esc(tr('name'))}<input name="name" autocomplete="name" required><span class="hint">${esc(tr('nameHint'))}</span>${err('name')}</label>
        <label class="field">${esc(tr('phone'))}<input name="phone" type="tel" autocomplete="tel"></label>
        <div class="field full"><span>${esc(tr('levels'))}</span><div class="checks">${levelChecks('levels')}</div><span class="hint">${esc(tr('levelsHint'))}</span>${err('levels')}</div>
        <label class="field">${esc(tr('prefLang'))}<select name="lang"><option value="ko" ${lang === 'ko' ? 'selected' : ''}>한국어</option><option value="fr" ${lang === 'fr' ? 'selected' : ''}>Français</option></select></label>
      </fieldset>
      <fieldset class="stack gap-12" style="border:0;padding:0;margin:0">
        <legend class="h3" style="margin-bottom:12px">3. ${esc(tr('stepConsent'))}</legend>
        <label class="check"><input type="checkbox" name="imageConsent">${esc(tr('imageConsent'))}</label>
        <label class="check"><input type="checkbox" name="privacyConsent" required><span>${esc(tr('privacyConsent'))} <a href="${pub('legal/#privacy')}" target="_blank" rel="noopener">${esc(tr('privacyLink'))}</a></span></label>
        ${err('privacyConsent')}
      </fieldset>
      <div class="stack gap-12">
        <p class="err" data-msg role="alert"></p>
        <button class="btn btn-dark" type="submit" style="align-self:flex-start">${esc(tr('signup'))}</button>
      </div>
    </form>
    <p class="small muted" style="border-top:1px solid var(--line);padding-top:20px">${esc(tr('haveAccount'))} <a href="${base}login/">${esc(tr('login'))}</a></p>
  </div>`;

const form = root.querySelector('form')!;
const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim();
const checked = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).checked;

getBackend().then((b) => {
  demoBar(b);
  form.addEventListener('input', (e) => fieldError(form, (e.target as HTMLInputElement).name, ''));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors(form);
    const levels = [...form.querySelectorAll<HTMLInputElement>('[name=levels]:checked')].map((i) => i.value as Level);
    const pw = (form.elements.namedItem('password') as HTMLInputElement).value;
    const pw2 = (form.elements.namedItem('password2') as HTMLInputElement).value;
    let ok = true;
    const fail = (n: string, k: string) => { fieldError(form, n, tr(k)); ok = false; };
    if (!isEmail(val('email'))) fail('email', 'err.email');
    if (pw.length < 8) fail('password', 'err.pwShort');
    else if (pw !== pw2) fail('password2', 'err.pwMatch');
    if (!val('name')) fail('name', 'err.required');
    if (!levels.length) fail('levels', 'err.levels');
    if (!checked('privacyConsent')) fail('privacyConsent', 'err.privacy');
    if (!ok) { form.querySelector<HTMLElement>('[data-err]:not(:empty)')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }

    const btn = form.querySelector<HTMLButtonElement>('[type=submit]')!;
    const msg = form.querySelector<HTMLElement>('[data-msg]')!;
    setBusy(btn, true); msg.textContent = '';
    try {
      const user = await b.signUp(val('email'), pw, lang);
      await b.createProfile(user.uid, {
        name: val('name'), email: user.email, levels, phone: val('phone'),
        imageConsent: checked('imageConsent'), privacyConsent: true, lang: val('lang') as 'ko' | 'fr',
      });
      location.replace(base);
    } catch (e2) { msg.textContent = errMsg(e2); setBusy(btn, false); }
  });
});
