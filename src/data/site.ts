// 사이트 전반에서 쓰는 사실 정보. 수정은 이 파일 한 곳에서 합니다.
// [대괄호] 표기는 확정 전 자리표시입니다.
// 입학 절차와 학교 정보의 출처는 맨 아래 SOURCES에 모았습니다. 매년 11월 시청·교육청 공고가 나오면 확인해 갱신합니다.

type T = { ko: string; fr: string };

/** 다음 입학 연도. 공고가 나오면 CAMPAIGN 일정과 함께 갱신 */
export const NEXT_YEAR = { ko: '2027–2028학년도', fr: 'année scolaire 2027–2028' };

export const STATS: { value: T; label: T }[] = [
  { value: { ko: '약 51명', fr: '≈ 51' }, label: { ko: '유치원~중학교 재학생', fr: 'élèves, de la maternelle au collège' } },
  { value: { ko: '2017', fr: '2017' }, label: { ko: '한국어 국제섹션 개설', fr: 'ouverture de la section' } },
  { value: { ko: '주 3시간', fr: '3 h / sem.' }, label: { ko: '유치원·초등 한국어 수업', fr: 'en coréen (1er degré)' } },
  { value: { ko: '11~12월', fr: 'nov.–déc.' }, label: { ko: '입학 원서 접수', fr: 'dépôt des candidatures' } },
];

export type LevelId = 'mat' | 'elem' | 'col';
export const LEVELS: {
  id: LevelId; code: string; name: T; school: string; address: string;
  hours: T; desc: T; subjects: T[]; tint: string; ink: string;
}[] = [
  {
    id: 'mat', code: 'MATERNELLE', name: { ko: '유치원', fr: 'Maternelle' },
    school: 'École maternelle Théophile Gautier', address: '182 boulevard Saint-Denis, 92400 Courbevoie',
    hours: { ko: '주 3시간 (주 24시간 수업에 포함)', fr: '3 h par semaine, incluses dans les 24 h' },
    desc: { ko: '놀이와 그림책, 노래로 한국어를 듣고 말하는 환경을 만듭니다.', fr: 'Le coréen par le jeu, l’album et la chanson.' },
    subjects: [{ ko: '모든 영역에서 언어 활용하기', fr: 'Mobiliser le langage dans toutes ses dimensions' }],
    tint: '#DCE6E9', ink: '#4B6670',
  },
  {
    id: 'elem', code: 'ÉLÉMENTAIRE', name: { ko: '초등학교', fr: 'École élémentaire' },
    school: 'École élémentaire Armand Silvestre', address: '186 rue Armand Silvestre, 92400 Courbevoie',
    hours: { ko: '주 3시간 (주 24시간 수업에 포함, 45분씩 4회 권장)', fr: '3 h par semaine (idéalement 4 × 45 min)' },
    desc: { ko: '프랑스 정규 교과 일부를 한국어로 배웁니다.', fr: 'Une partie des enseignements dispensée en coréen.' },
    subjects: [
      { ko: 'CP~CE2 (cycle 2): 문학, 음악, 세계 탐구', fr: 'Cycle 2 : littérature, musique, questionner le monde' },
      { ko: 'CM1~CM2 (cycle 3): 문학, 음악, 역사·지리', fr: 'Cycle 3 : littérature, musique, histoire-géographie' },
    ],
    tint: '#E8DED5', ink: '#7A5A48',
  },
  {
    id: 'col', code: 'COLLÈGE', name: { ko: '중학교', fr: 'Collège' },
    school: 'Collège Les Bruyères', address: '6 rue Volta, 92400 Courbevoie',
    hours: { ko: '주 6~7시간 (2019년 보도 기준, 현행 시수 확인 필요)', fr: '6 à 7 h par semaine (selon la presse, 2019 ; à confirmer)' },
    desc: { ko: '한국어, 한국 문학·문화, 한국어로 배우는 수학을 정규 시간표에 편성합니다.', fr: 'Langue, littérature et culture coréennes, et mathématiques en coréen.' },
    subjects: [
      { ko: '외국어로서의 한국어 (주 2시간)', fr: 'Coréen langue vivante (2 h)' },
      { ko: '한국 문학과 문화 (주 3시간)', fr: 'Littérature et culture coréennes (3 h)' },
      { ko: '한국어로 배우는 수학 (주 2시간)', fr: 'Mathématiques en coréen (2 h)' },
    ],
    tint: '#E1E3DA', ink: '#5A6250',
  },
];

export const BUREAU: { role: T; name: string }[] = [
  { role: { ko: '회장', fr: 'Présidente' }, name: '[이름]' },
  { role: { ko: '부회장', fr: 'Vice-présidente' }, name: '[이름]' },
  { role: { ko: '사무총장', fr: 'Secrétaire générale' }, name: '[이름]' },
  { role: { ko: '회계', fr: 'Trésorière' }, name: '[이름]' },
  { role: { ko: '유치원 대표', fr: 'Représentante maternelle' }, name: '[이름]' },
  { role: { ko: '초등학교 대표', fr: 'Représentant(e) élémentaire' }, name: '[이름]' },
  { role: { ko: '중학교 대표', fr: 'Représentante collège' }, name: '[이름]' },
];

/** 협회 활동의 네 가지 축 (제1회 정기총회 발표자료) */
export const AXES: { tag: T; title: T; items: T[]; result: T }[] = [
  { tag: { ko: '지원', fr: 'Soutien' }, title: { ko: '학교 활동 지원', fr: 'Vie scolaire' },
    items: [{ ko: '설날 한국 과자 간식 꾸러미', fr: 'Colis du Nouvel An lunaire' }, { ko: '한국의 날(Journée de la Corée) 준비', fr: 'Préparation de la Journée de la Corée' }],
    result: { ko: '학생 호응과 긍정적 인식', fr: 'Adhésion des élèves' } },
  { tag: { ko: '대외협력', fr: 'Coopération' }, title: { ko: '지속적인 소통', fr: 'Dialogue institutionnel' },
    items: [{ ko: '주프랑스 한국교육원과 정기 면담', fr: 'Rencontres régulières avec le Centre éducatif coréen' }, { ko: '학교와 섹션 소식 공유', fr: 'Partage des informations de la section' }],
    result: { ko: '지속적인 협력 관계', fr: 'Partenariats durables' } },
  { tag: { ko: '학생확보', fr: 'Développement' }, title: { ko: '안정적인 학생 수', fr: 'Effectifs stables' },
    items: [{ ko: '국제섹션 홍보 (온라인, 한인 사회)', fr: 'Communication en ligne et auprès de la communauté' }, { ko: '입학 관심 가정 안내', fr: 'Accompagnement des familles candidates' }],
    result: { ko: '지원자 확보와 지속 발전', fr: 'Candidatures et pérennité' } },
  { tag: { ko: '커뮤니티', fr: 'Communauté' }, title: { ko: '하나의 국제섹션', fr: 'Une seule section' },
    items: [{ ko: '피크닉, 바비큐 등 가족 모임', fr: 'Pique-niques et barbecues' }, { ko: '유치원·초등·중학교 간 교류', fr: 'Échanges entre les trois niveaux' }],
    result: { ko: '학부모 네트워크 강화', fr: 'Réseau de parents' } },
];

export const HISTORY: { date: T; title: T; text: T }[] = [
  { date: { ko: '2017.09', fr: 'Septembre 2017' }, title: { ko: '한국어 국제섹션 개설', fr: 'Ouverture de la section coréenne' },
    text: { ko: '한·불 수교 130주년을 계기로 양국 교육부 협약에 따라 쿠르브부아(초등학교·중학교)와 스트라스부르(Collège Vauban)에 개설되었습니다. 유치원 과정은 이후 추가되었습니다.', fr: 'À l’occasion des 130 ans des relations franco-coréennes, la section ouvre à Courbevoie (élémentaire et collège) et à Strasbourg (collège Vauban), dans le cadre d’un accord entre les deux ministères. La maternelle s’y ajoute ensuite.' } },
  { date: { ko: '2017~2025', fr: '2017–2025' }, title: { ko: '자발적 학부모 활동', fr: 'Engagement bénévole des parents' },
    text: { ko: '정식 협회 없이 학부모들이 행사 지원, 홍보, 기관 소통을 이어 왔습니다.', fr: 'Sans association formelle, les parents soutiennent les événements, la communication et le dialogue avec les institutions.' } },
  { date: { ko: '2026.03.16', fr: '16 mars 2026' }, title: { ko: '정관 채택', fr: 'Adoption des statuts' },
    text: { ko: '학부모 의견을 공식적으로 대표할 조직이 필요하다는 공감대 속에 협회 정관을 채택했습니다.', fr: 'Les parents adoptent les statuts afin de disposer d’une représentation officielle.' } },
  { date: { ko: '2026.04.28', fr: '28 avril 2026' }, title: { ko: '협회 공식 신고', fr: 'Déclaration officielle' },
    text: { ko: '1901년 법에 따른 비영리 협회로 신고했습니다. 9월에 협회 계좌 개설과 책임보험 가입을 마쳤습니다.', fr: 'Déclaration comme association loi 1901 ; compte bancaire et assurance en septembre.' } },
  { date: { ko: '2026.10.04', fr: '4 octobre 2026' }, title: { ko: '제1회 정기총회', fr: '1re assemblée générale' },
    text: { ko: '운영진 재신임(임기 2년)과 연회비를 의결하고 정식 운영체제로 전환했습니다.', fr: 'Reconduction du bureau (mandat de deux ans), vote de la cotisation, fonctionnement régulier.' } },
];

export const PARTNERS: { name: T; role: T }[] = [
  { name: { ko: '대한민국 교육부', fr: 'Ministère coréen de l’Éducation' }, role: { ko: '교사 인건비 예산', fr: 'Financement des postes' } },
  { name: { ko: '주프랑스 한국교육원', fr: 'Centre éducatif coréen en France' }, role: { ko: '교사 채용과 급여 집행, 섹션 홍보', fr: 'Recrutement, rémunération, promotion' } },
  { name: { ko: '베르사유 교육청', fr: 'Académie de Versailles' }, role: { ko: '수업 관리·감독, 입학 결정', fr: 'Pilotage pédagogique, admissions' } },
  { name: { ko: '쿠르브부아 세 학교', fr: 'Les trois établissements' }, role: { ko: '수업 운영', fr: 'Enseignement' } },
];

/* ---------------- 입학 ---------------- */

export const PROFILES: { title: T; text: T }[] = [
  { title: { ko: '외국 국적 가정', fr: 'Familles étrangères' },
    text: { ko: '초등학교에 지원하는 경우, 자녀가 같은 나이 학급을 따라갈 수 있는 프랑스어 실력을 갖춰야 합니다.', fr: 'En élémentaire, l’enfant doit avoir un niveau de français lui permettant de suivre sa classe d’âge.' } },
  { title: { ko: '이중국적 가정', fr: 'Familles binationales' },
    text: { ko: '부모 중 한 명이 한국 국적이어야 합니다.', fr: 'L’un des deux parents doit être ressortissant coréen.' } },
  { title: { ko: '해외에서 돌아온 프랑스 가정', fr: 'Familles françaises de retour d’expatriation' },
    text: { ko: '자녀가 유럽 언어 기준(CECRL)에 맞는 한국어 역량을 갖춰야 합니다.', fr: 'L’enfant doit avoir les compétences linguistiques requises (CECRL).' } },
];

export const EXPECTED: { when: T; level: T }[] = [
  { when: { ko: '유치원 GS 말 (CP 진입)', fr: 'Fin de grande section' }, level: { ko: '말하기 A2', fr: 'A2 à l’oral' } },
  { when: { ko: '초등 CM2 말 (중학교 진입)', fr: 'Fin de CM2' }, level: { ko: '말하기 B1, 쓰기 A2', fr: 'B1 à l’oral, A2 à l’écrit' } },
];

/** 1차 모집 절차. 날짜는 2026–2027학년도 공고 기준이며 매년 비슷한 시기에 진행됩니다. */
export const CAMPAIGN: { when: T; what: T; detail: T }[] = [
  { when: { ko: '11월 ~ 12월 중순', fr: 'Novembre à mi-décembre' }, what: { ko: '원서 제출', fr: 'Dépôt des dossiers' },
    detail: { ko: '교육청 누리집에서 지원서를 내려받아 제출합니다. 지난해 마감: 12월 19일 17시.', fr: 'Dossier à télécharger sur le site de l’académie. L’an dernier : clôture le 19 décembre à 17 h.' } },
  { when: { ko: '1월', fr: 'Janvier' }, what: { ko: '서류 검토와 면접 안내', fr: 'Étude des dossiers et convocations' },
    detail: { ko: '서류를 검토한 뒤 면접 일정을 알려 줍니다.', fr: 'Les familles retenues sont convoquées à un entretien.' } },
  { when: { ko: '2월 초 ~ 4월 초', fr: 'Février à début avril' }, what: { ko: '부모·자녀 면접', fr: 'Entretiens' },
    detail: { ko: '지원 동기와 자녀의 언어 수준을 평가합니다.', fr: 'Évaluation de la motivation et du niveau de langue.' } },
  { when: { ko: '4월 중순', fr: 'Mi-avril' }, what: { ko: '도 단위 위원회 심사', fr: 'Commission départementale' },
    detail: { ko: '교육청 국장이 주재하는 위원회가 입학을 결정합니다.', fr: 'Présidée par le directeur académique, elle décide des admissions.' } },
  { when: { ko: '6월 초', fr: 'Début juin' }, what: { ko: '결과 통보', fr: 'Communication des décisions' },
    detail: { ko: '지난해 통보일: 6월 4일.', fr: 'L’an dernier : le 4 juin.' } },
];

export const WAVE2: T = {
  ko: '12월 15일 이후에 프랑스 귀국이나 파리 지역 이주가 정해진 해외 거주 가정과 일드프랑스 밖 가정을 위한 모집입니다. 지난해에는 4월 30일 17시까지 접수했고 5월 26일에 결과를 알렸습니다.',
  fr: 'Réservée aux familles expatriées ou non franciliennes informées de leur arrivée après le 15 décembre. L’an dernier : dépôt jusqu’au 30 avril à 17 h, décisions le 26 mai.',
};

export const ADMISSION_NOTES: T[] = [
  { ko: '모집은 학교급이 바뀔 때마다 다시 진행됩니다: 유치원 GS 말(CP 진입), 초등 CM2 말(중학교 진입).', fr: 'Un recrutement a lieu à chaque changement de cycle : fin de GS (entrée au CP), fin de CM2 (entrée au collège).' },
  { ko: '유치원 국제섹션에 다녔다고 초등학교 입학 평가 통과가 보장되지는 않습니다. 중학교도 마찬가지입니다.', fr: 'Être scolarisé en SI en maternelle ne garantit pas l’admission en élémentaire ; de même pour le collège.' },
  { ko: '국제섹션 학생은 해당 학교에 전일제로 다니며 여러 학급에 나뉘어 배정됩니다. 쿠르브부아 밖에 살면 거주지 시청의 학구 예외 허가(dérogation)가 필요합니다.', fr: 'Les élèves sont scolarisés à temps plein dans l’école et répartis dans les classes ; une dérogation de la mairie de résidence est nécessaire.' },
  { ko: 'CP에 들어갈 때 프랑스어가 부족하면 1년 쉬어 갈 수 있습니다. 자리는 유지되지만 CE1 입학 절차를 다시 밟아야 합니다.', fr: 'Un élève de profil SI dont le français est insuffisant à l’entrée au CP peut faire une pause d’un an ; il candidate ensuite pour le CE1.' },
  { ko: '과정 중단은 가정이 단독으로 정할 수 없고, 학교와 교사가 준비한 자료를 검토해 장학관이 결정합니다.', fr: 'L’arrêt du parcours relève de l’inspectrice de l’Éducation nationale, après examen du dossier.' },
];

export const ADMISSION_CONTACTS: { label: T; value: string; href?: string }[] = [
  { label: { ko: '지원서와 공식 안내 (교육청)', fr: 'Dossiers et informations (académie)' }, value: 'ac-versailles.fr/si92', href: 'https://www.ac-versailles.fr/si92' },
  { label: { ko: '유치원·초등 문의 (이메일만, 전화 불가)', fr: '1er degré (par e-mail uniquement)' }, value: 'sidesecolesdu92@ac-versailles.fr', href: 'mailto:sidesecolesdu92@ac-versailles.fr' },
  { label: { ko: '중학교 문의', fr: 'Collège' }, value: 'Collège Les Bruyères', href: 'https://clg-bruyeres-courbevoie.ac-versailles.fr/' },
  { label: { ko: '쿠르브부아 시청 안내', fr: 'Mairie de Courbevoie' }, value: 'ville-courbevoie.fr', href: 'https://www.ville-courbevoie.fr/10-7591/toutes-les-actualites/fiche/campagne-d-inscription-en-section-internationale.htm' },
];

/* ---------------- 일정 ---------------- */

export const EVENTS: { date: string; time?: T; title: T; place: T; kind: 'school' | 'asso' | 'info'; desc?: T; tentative?: boolean }[] = [
  { date: '2026-11-15', title: { ko: '입학 원서 접수 시작 (예상)', fr: 'Ouverture des candidatures (prévision)' },
    place: { ko: '교육청 누리집', fr: 'Site de l’académie' }, kind: 'info', tentative: true,
    desc: { ko: '지난해에는 11월에 시작해 12월 19일에 마감했습니다. 공고가 나오면 정확한 날짜로 바꿉니다.', fr: 'L’an dernier : de novembre au 19 décembre. Date exacte dès publication.' } },
  { date: '2026-11-30', title: { ko: '입학설명회', fr: 'Réunion d’information' },
    place: { ko: '[장소 확정 후 공지]', fr: '[Lieu à confirmer]' }, kind: 'info', tentative: true,
    desc: { ko: '주프랑스 한국교육원 주최로 보통 11월 말~12월 초에 열립니다.', fr: 'Organisée en général fin novembre ou début décembre par le Centre éducatif coréen.' } },
  { date: '2026-12-18', title: { ko: '1차 원서 마감 (예상)', fr: 'Clôture des dossiers (prévision)' },
    place: { ko: '교육청', fr: 'Académie' }, kind: 'info', tentative: true },
  { date: '2027-02-06', title: { ko: '설날 간식 꾸러미', fr: 'Colis du Nouvel An lunaire' },
    place: { ko: '세 학교', fr: 'Dans les trois établissements' }, kind: 'school', tentative: true },
  { date: '2027-02-08', title: { ko: '입학 면접 기간 시작 (예상)', fr: 'Début des entretiens (prévision)' },
    place: { ko: '교육청 안내', fr: 'Selon convocation' }, kind: 'info', tentative: true,
    desc: { ko: '2월 초부터 4월 초까지 진행됩니다.', fr: 'De début février à début avril.' } },
  { date: '2027-06-03', title: { ko: '입학 결과 통보 (예상)', fr: 'Communication des décisions (prévision)' },
    place: { ko: '교육청', fr: 'Académie' }, kind: 'info', tentative: true },
];

/* ---------------- FAQ ---------------- */

export const FAQ: { q: T; a: T }[] = [
  { q: { ko: '비용이 드나요?', fr: 'La section est-elle payante ?' },
    a: { ko: '국제섹션은 프랑스 공립학교의 정규 과정이라 수업료가 없습니다. 학부모협회 연회비(가정당 20유로)는 자율 납부이고, 행사비는 행사별로 따로 나눕니다.', fr: 'Non, la section fait partie de l’enseignement public. La cotisation à l’association (20 € par famille et par an) est libre ; les événements sont financés à part.' } },
  { q: { ko: '누가 지원할 수 있나요?', fr: 'Qui peut candidater ?' },
    a: { ko: '외국 국적 가정, 부모 중 한 명이 한국 국적인 이중국적 가정, 해외에서 돌아온 프랑스 가정이 지원할 수 있습니다. 자녀의 한국어 수준은 유치원 GS 말 말하기 A2, 초등 CM2 말 말하기 B1·쓰기 A2가 기준입니다.', fr: 'Les familles étrangères, binationales (un parent coréen) et françaises de retour d’expatriation. Niveaux attendus : A2 oral en fin de GS ; B1 oral et A2 écrit en fin de CM2.' } },
  { q: { ko: '평가는 어떻게 하나요?', fr: 'Comment se passe la sélection ?' },
    a: { ko: '서류 심사 뒤 2월부터 4월 사이에 부모와 자녀가 함께 면접을 봅니다. 지원 동기와 언어 수준을 보고, 4월 중순 도 단위 위원회가 입학을 결정합니다.', fr: 'Après étude du dossier, un entretien parents-enfant a lieu entre février et avril (motivation, niveau de langue). La commission départementale décide mi-avril.' } },
  { q: { ko: '쿠르브부아에 살지 않아도 되나요?', fr: 'Faut-il habiter Courbevoie ?' },
    a: { ko: '지원할 수 있습니다. 다만 국제섹션 학교에 전일제로 다니므로 거주지 시청의 학구 예외 허가(dérogation)가 필요합니다.', fr: 'Non, mais l’élève est scolarisé à temps plein dans l’école de la section : une dérogation de votre mairie de résidence est nécessaire.' } },
  { q: { ko: '유치원에 다니면 초등학교에 자동으로 올라가나요?', fr: 'Le passage maternelle → élémentaire est-il automatique ?' },
    a: { ko: '아닙니다. 학교급이 바뀔 때마다(CP, 중학교 진입) 다시 지원하고 평가를 받습니다.', fr: 'Non. Une nouvelle candidature est requise à chaque changement de cycle (CP, collège).' } },
  { q: { ko: '수업은 얼마나 하나요?', fr: 'Combien d’heures en coréen ?' },
    a: { ko: '유치원과 초등학교는 주 24시간 수업 중 3시간을 한국어로 합니다. 중학교는 한국어, 한국 문학·문화, 한국어 수학을 합쳐 주 6~7시간으로 보도된 바 있습니다(2019년 기준).', fr: '3 h sur les 24 h hebdomadaires en maternelle et élémentaire ; au collège, 6 à 7 h (langue, littérature et culture, mathématiques), selon la presse en 2019.' } },
  { q: { ko: '해외에 살다가 늦게 귀국이 정해졌어요.', fr: 'Nous arrivons de l’étranger après décembre.' },
    a: { ko: '12월 15일 이후 귀국이나 이주가 정해진 가정을 위한 2차 모집이 있습니다. 지난해에는 4월 30일까지 접수했습니다.', fr: 'Une seconde vague existe pour les familles informées de leur arrivée après le 15 décembre (l’an dernier : jusqu’au 30 avril).' } },
  { q: { ko: '입학 문의는 어디로 하나요?', fr: 'À qui poser mes questions ?' },
    a: { ko: '공식 절차는 교육청(유치원·초등은 sidesecolesdu92@ac-versailles.fr, 중학교는 학교)에 문의합니다. 학교생활이나 섹션 분위기는 이 사이트 문의 양식으로 물어보시면 협회 학부모가 경험을 바탕으로 답변합니다.', fr: 'Pour la procédure : l’académie (1er degré : sidesecolesdu92@ac-versailles.fr) ou le collège. Pour la vie de la section : notre formulaire, des parents vous répondent.' } },
];

export const GRADES: { age: string; fr: string; ko: string; level: T }[] = [
  { age: '3', fr: 'PS (petite section)', ko: '유치원 1년차 (만 3세)', level: { ko: '유치원', fr: 'Maternelle' } },
  { age: '4', fr: 'MS (moyenne section)', ko: '유치원 2년차 (만 4세)', level: { ko: '유치원', fr: 'Maternelle' } },
  { age: '5', fr: 'GS (grande section)', ko: '유치원 3년차 (만 5세)', level: { ko: '유치원', fr: 'Maternelle' } },
  { age: '6', fr: 'CP', ko: '초등 1학년', level: { ko: '초등학교', fr: 'Élémentaire' } },
  { age: '7', fr: 'CE1', ko: '초등 2학년', level: { ko: '초등학교', fr: 'Élémentaire' } },
  { age: '8', fr: 'CE2', ko: '초등 3학년', level: { ko: '초등학교', fr: 'Élémentaire' } },
  { age: '9', fr: 'CM1', ko: '초등 4학년', level: { ko: '초등학교', fr: 'Élémentaire' } },
  { age: '10', fr: 'CM2', ko: '초등 5학년', level: { ko: '초등학교', fr: 'Élémentaire' } },
  { age: '11', fr: '6e', ko: '초등 6학년', level: { ko: '중학교', fr: 'Collège' } },
  { age: '12', fr: '5e', ko: '중학 1학년', level: { ko: '중학교', fr: 'Collège' } },
  { age: '13', fr: '4e', ko: '중학 2학년', level: { ko: '중학교', fr: 'Collège' } },
  { age: '14', fr: '3e', ko: '중학 3학년', level: { ko: '중학교', fr: 'Collège' } },
];

/** 정보 출처 (사이트에 표시) */
export const SOURCES: { label: string; href: string }[] = [
  { label: 'Ville de Courbevoie, Sections internationales 2026-2027', href: 'https://www.ville-courbevoie.fr/10-7591/toutes-les-actualites/fiche/campagne-d-inscription-en-section-internationale.htm' },
  { label: 'Académie de Versailles, Sections internationales 92', href: 'https://www.ac-versailles.fr/si92' },
  { label: '주프랑스 한국교육원, Section internationale coréenne', href: 'https://fr-fr.educoree.fr/francais/section-internationale-coreenne/' },
  { label: '프랑스존, 한국어 국제반 개설 (2019.04.11)', href: 'https://www.francezone.com/news/articleView.html?idxno=1647456' },
];
