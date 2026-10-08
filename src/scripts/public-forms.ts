// 공개 양식(문의, 설명회 신청, 소식지 구독)을 백엔드로 보냄
import { getBackend, type InboxCol } from './backend';

const ko = document.documentElement.lang !== 'fr';
const T = {
  required: ko ? '필수 항목을 입력해 주세요.' : 'Merci de remplir les champs obligatoires.',
  email: ko ? '올바른 이메일 주소를 입력해 주세요.' : 'Adresse e-mail invalide.',
  consent: ko ? '개인정보 수집 동의가 필요합니다.' : 'Votre accord est nécessaire.',
  ok: ko ? '접수되었습니다. 감사합니다.' : 'Merci, votre demande a bien été envoyée.',
  okDemo: ko ? '접수되었습니다. (데모 모드: 이 브라우저에만 저장됨)' : 'Envoyé. (Mode démo : enregistré dans ce navigateur)',
  fail: ko ? '전송하지 못했습니다. 잠시 뒤 다시 시도해 주세요.' : 'Échec de l’envoi. Réessayez plus tard.',
};

document.querySelectorAll<HTMLFormElement>('form[data-public-form]').forEach((form) => {
  const msg = form.querySelector<HTMLElement>('[data-form-msg]')!;
  form.addEventListener('input', () => { msg.textContent = ''; });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.style.color = '';
    const fd = new FormData(form);
    if (fd.get('website')) return; // 스팸 봇 함정
    for (const el of form.querySelectorAll<HTMLInputElement>('[required]')) {
      if (el.type === 'checkbox' ? !el.checked : !el.value.trim()) {
        msg.textContent = el.name === 'consent' ? T.consent : T.required; el.focus(); return;
      }
    }
    const email = String(fd.get('email') ?? '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = T.email; return; }

    const data: Record<string, any> = {};
    for (const [k, v] of fd.entries()) {
      if (k === 'website' || k === 'consent') continue;
      if (k === 'levels') (data.levels ??= []).push(v); else data[k] = String(v).trim();
    }
    data.consent = true;
    data.pageLang = ko ? 'ko' : 'fr';
    const btn = form.querySelector<HTMLButtonElement>('[type=submit]')!;
    btn.disabled = true;
    try {
      const b = await getBackend();
      await b.submitPublic(form.dataset.publicForm as InboxCol, data);
      form.reset();
      msg.style.color = 'var(--ok)';
      msg.textContent = b.mode === 'demo' ? T.okDemo : T.ok;
    } catch {
      msg.textContent = T.fail;
    }
    btn.disabled = false;
  });
});
