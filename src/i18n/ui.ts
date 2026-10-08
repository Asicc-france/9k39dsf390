import { BASE } from '../config';

export const LANGS = ['ko', 'fr'] as const;
export type Lang = (typeof LANGS)[number];

export const langPaths = () => LANGS.map((lang) => ({ params: { lang } }));

/** 같은 페이지의 다른 언어 주소 */
export const altPath = (lang: Lang, rest: string) => `${BASE}${lang === 'ko' ? 'fr' : 'ko'}/${rest}`;
export const href = (lang: Lang, rest = '') => `${BASE}${lang}/${rest}`;

type Dict = Record<string, { ko: string; fr: string }>;

export const ui = {
  'site.name': { ko: '쿠르브부아 한국어 국제섹션 학부모협회', fr: 'Association de la Section Internationale Coréenne à Courbevoie' },
  'site.short': { ko: '쿠르브부아 한국어 국제섹션 학부모협회', fr: 'Section internationale coréenne de Courbevoie' },
  'nav.about': { ko: '협회 소개', fr: 'L’association' },
  'nav.section': { ko: '국제섹션', fr: 'La section' },
  'nav.admission': { ko: '입학', fr: 'Admissions' },
  'nav.news': { ko: '소식', fr: 'Actualités' },
  'nav.events': { ko: '행사', fr: 'Agenda' },
  'nav.join': { ko: '참여', fr: 'S’engager' },
  'nav.contact': { ko: '문의', fr: 'Contact' },
  'nav.members': { ko: '회원', fr: 'Espace membres' },
  'nav.menu': { ko: '메뉴', fr: 'Menu' },
  'nav.skip': { ko: '본문 바로가기', fr: 'Aller au contenu' },
  'lang.switch': { ko: 'Français', fr: '한국어' },
  'lang.label': { ko: '언어', fr: 'Langue' },
  'footer.declared': { ko: '2026년 4월 28일 신고', fr: 'déclarée le 28 avril 2026' },
  'footer.legal': { ko: '법적 고지', fr: 'Mentions légales' },
  'footer.privacy': { ko: '개인정보 처리방침', fr: 'Confidentialité' },
  'footer.statuts': { ko: '정관', fr: 'Statuts' },
  'footer.subscribe': { ko: '소식지 구독', fr: 'Lettre d’information' },
  'common.more': { ko: '자세히 보기', fr: 'En savoir plus' },
  'common.all': { ko: '전체 보기', fr: 'Tout voir' },
  'common.back': { ko: '목록으로', fr: 'Retour à la liste' },
  'common.placeholder': { ko: '확정 후 게재', fr: 'À compléter' },
} satisfies Dict;

export type UiKey = keyof typeof ui;
export const t = (lang: Lang, key: UiKey) => ui[key][lang];

/** 페이지별 짧은 문구를 한 곳에서 다루기 위한 헬퍼 */
export const L = <T,>(lang: Lang, v: { ko: T; fr: T }) => v[lang];

export const NAV: { key: UiKey; path: string }[] = [
  { key: 'nav.about', path: 'about/' },
  { key: 'nav.section', path: 'section/' },
  { key: 'nav.admission', path: 'admission/' },
  { key: 'nav.news', path: 'news/' },
  { key: 'nav.events', path: 'events/' },
  { key: 'nav.join', path: 'join/' },
  { key: 'nav.contact', path: 'contact/' },
];

export const formatDate = (lang: Lang, d: Date | string) => {
  const date = typeof d === 'string' ? new Date(d) : d;
  return lang === 'ko'
    ? `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
    : date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};
