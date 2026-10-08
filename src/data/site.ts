// 사이트 전반에서 쓰는 사실 정보. 수정은 이 파일 한 곳에서 합니다.
// [대괄호] 표기는 확정 전 자리표시입니다.
// 입학 절차와 학교 정보의 출처는 맨 아래 SOURCES에 모았습니다. 매년 11월 시청·교육청 공고가 나오면 확인해 갱신합니다.

type T = { ko: string; fr: string };

/** 다음 입학 연도. 공고가 나오면 CAMPAIGN 일정과 함께 갱신 */
export const NEXT_YEAR = { ko: '2027–2028학년도', fr: 'année scolaire 2027–2028' };

export const STATS: { value: T; label: T }[] = [
  { value: { ko: '약 51명', fr: '≈ 51' }, label: { ko: '유치원~중학교 재학생', fr: 'élèves, de la maternelle au collège' } },
  { value: { ko: '2017', fr: '2017' }, label: { ko: '한국어 국제섹션 개설', fr: 'ouverture de la section' } },
  { value: { ko: '3개', fr: '3' }, label: { ko: '학교급 (유치원·초등·중학교)', fr: 'niveaux' } },
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
    hours: { ko: '국어·외국어 시간 외에 외국 문학 주 4시간, 일부 교과를 한국어로 수업', fr: 'Lettres étrangères (4 h) en plus des langues vivantes, une discipline partiellement en coréen' },
    desc: { ko: '한국 문학과 문화를 깊이 배우고, 일부 교과를 한국어로 학습합니다.', fr: 'Littérature et culture coréennes, et une discipline enseignée en partie en coréen.' },
    subjects: [
      { ko: '한국어 문학 (2017년 11월 고시 교육과정)', fr: 'Langue et littérature coréennes (programme de 2017)' },
      { ko: '한국어로 일부 진행되는 교과 (DNL)', fr: 'Discipline non linguistique partiellement en coréen' },
      { ko: '졸업 시 DNB 국제 옵션 응시', fr: 'DNB, option internationale' },
    ],
    tint: '#E1E3DA', ink: '#5A6250',
  },
];

/** 운영진 (2026–2027, 임기 2년). latin: 프랑스어판 표기, 없으면 한글로 표시 */
export const BUREAU: { role: T; name: string; latin?: string }[] = [
  { role: { ko: '회장', fr: 'Présidente' }, name: '안정아', latin: 'Jungah Ahn' },
  { role: { ko: '부회장', fr: 'Vice-présidente' }, name: '김영란' },
  { role: { ko: '사무총장', fr: 'Secrétaire générale' }, name: '변지영' },
  { role: { ko: '회계', fr: 'Trésorière' }, name: '방은주' },
  { role: { ko: '유치원 대표', fr: 'Représentante, maternelle' }, name: '호지연', latin: 'Jeeyoun Ho' },
  { role: { ko: '초등학교 대표', fr: 'Représentante, élémentaire' }, name: '이연호', latin: 'Younho Lee' },
  { role: { ko: '중학교 대표', fr: 'Représentante, collège' }, name: '김자경', latin: 'Jakyoung Kim' },
];

/** 협회 활동의 네 가지 축 (제1회 정기총회 발표자료, 회의록 4장) */
export const AXES: { tag: T; title: T; text: T; items: T[]; result: T; color: string }[] = [
  { tag: { ko: '지원 · SOUTIEN', fr: 'SOUTIEN' }, color: 'var(--hong)',
    title: { ko: '학교 교육 활동 지원', fr: 'Soutien aux activités scolaires' },
    text: { ko: '국제섹션 수업이 학교 생활 속에 자연스럽게 자리 잡도록, 학교와 교사의 문화 행사를 학부모가 함께 준비합니다. 학교급마다 운영 방식에 맞추어 지원 대상과 방법을 달리합니다.', fr: 'Les parents accompagnent les temps forts culturels organisés par les écoles et les enseignants, selon des modalités adaptées à chaque niveau.' },
    items: [
      { ko: '설날 등 한국 명절을 계기로 한 학교 단위 한국 문화 소개 활동 (학교와 협의하여 진행)', fr: 'Présentation de la culture coréenne dans les écoles à l’occasion des fêtes traditionnelles, en accord avec les établissements' },
      { ko: '한국의 날(Journée de la Corée) 준비와 진행 지원', fr: 'Préparation de la Journée de la Corée' },
      { ko: '학교 축제의 한국 문화 부스 운영', fr: 'Stands de culture coréenne lors des fêtes d’école' },
    ],
    result: { ko: '학생들의 참여와 한국 문화에 대한 긍정적 인식', fr: 'Adhésion des élèves et image positive de la culture coréenne' } },
  { tag: { ko: '대외협력 · COOPÉRATION', fr: 'COOPÉRATION' }, color: 'var(--jjok)',
    title: { ko: '관계 기관과의 지속적 소통', fr: 'Dialogue avec les institutions' },
    text: { ko: '국제섹션은 한국과 프랑스 기관이 역할을 나누어 운영하므로, 학부모의 의견을 각 기관에 정확히 전달하는 창구가 필요합니다. 협회는 학교 현장의 상황을 기록하고 공식적으로 전달합니다.', fr: 'La section reposant sur plusieurs institutions françaises et coréennes, l’association transmet officiellement la voix des familles et suit les échanges dans la durée.' },
    items: [
      { ko: '주프랑스 한국교육원장과 해마다 한 차례 이상 정기 면담', fr: 'Rencontre au moins annuelle avec la direction du Centre éducatif coréen' },
      { ko: '학교와 섹션의 주요 소식 공유, 필요한 지원 요청', fr: 'Partage des informations et demandes de soutien' },
      { ko: '학교 학부모 대표 활동을 통한 학교 운영 참여', fr: 'Participation aux instances de l’école via les représentants de parents' },
    ],
    result: { ko: '기관과의 신뢰에 바탕을 둔 지속적 협력 관계', fr: 'Partenariats durables' } },
  { tag: { ko: '학생확보 · DÉVELOPPEMENT', fr: 'DÉVELOPPEMENT' }, color: 'var(--gam-d)',
    title: { ko: '안정적인 학생 수 유지', fr: 'Des effectifs stables' },
    text: { ko: '섹션이 안정적으로 운영되려면 학교급마다 꾸준한 지원자가 필요합니다. 협회는 입학을 고민하는 가정이 정확한 정보를 얻을 수 있도록 안내하고, 지원 과정 전반을 돕습니다.', fr: 'La pérennité de la section dépend de candidatures régulières à chaque niveau ; l’association informe et accompagne les familles intéressées.' },
    items: [
      { ko: '한인 온라인 커뮤니티와 지역 한인 사회에 국제섹션 소개', fr: 'Présentation de la section auprès de la communauté coréenne' },
      { ko: '입학 관심 가정에 절차와 일정 안내, 재학생 가정 경험 공유', fr: 'Information des familles sur la procédure et le calendrier' },
      { ko: '주프랑스 한국교육원의 입학설명회 개최 협력', fr: 'Appui aux réunions d’information du Centre éducatif coréen' },
    ],
    result: { ko: '지원자 확보와 섹션의 지속 가능한 발전', fr: 'Candidatures et pérennité de la section' } },
  { tag: { ko: '공동체 · COMMUNAUTÉ', fr: 'COMMUNAUTÉ' }, color: 'var(--sol)',
    title: { ko: '학교급을 넘어 하나의 국제섹션으로', fr: 'Une seule section, trois niveaux' },
    text: { ko: '유치원, 초등학교, 중학교는 서로 다른 학교에 있지만 하나의 과정으로 이어집니다. 협회는 학교급 사이의 정보를 잇고, 새로 온 가정이 섹션에 빨리 적응하도록 돕습니다.', fr: 'Les trois niveaux sont répartis dans trois établissements mais forment un même parcours ; l’association relie les familles et facilite l’accueil des nouvelles.' },
    items: [
      { ko: '학교급 대표를 통한 학교별 정보 공유', fr: 'Relais d’information par les représentants de niveau' },
      { ko: '새로 입학한 가정 안내', fr: 'Accueil des nouvelles familles' },
      { ko: '임원 교체에도 이어지는 기록 보존과 인수인계', fr: 'Archivage et transmission entre bureaux successifs' },
    ],
    result: { ko: '학부모 네트워크와 공동체 강화', fr: 'Un réseau de parents solide' } },
];

export const HISTORY: { date: T; title: T; text: T }[] = [
  { date: { ko: '2017년 9월', fr: 'Septembre 2017' }, title: { ko: '한국어 국제섹션 개설', fr: 'Ouverture de la section internationale coréenne' },
    text: { ko: '한·불 수교 130주년을 계기로 한국과 프랑스 교육부가 맺은 협약에 따라, 베르사유 교육청 관할의 쿠르브부아(초등학교·중학교)와 스트라스부르 교육청 관할의 Collège Vauban에 한국어 국제섹션이 처음 문을 열었습니다. 이후 쿠르브부아에는 유치원 과정이 더해져, 유치원부터 중학교까지 이어지는 과정이 갖추어졌습니다.', fr: 'Dans le cadre d’un accord entre les ministères français et coréen, à l’occasion des 130 ans des relations diplomatiques, la section ouvre à Courbevoie (élémentaire et collège) et au collège Vauban de Strasbourg. La maternelle complète ensuite le parcours à Courbevoie.' } },
  { date: { ko: '2017 ~ 2025', fr: '2017–2025' }, title: { ko: '학부모 자원 활동의 축적', fr: 'Huit années d’engagement bénévole' },
    text: { ko: '정식 협회가 없던 시기에도 학부모들은 학교 행사 지원, 신입생 홍보, 주프랑스 한국교육원과의 면담을 자발적으로 이어 왔습니다. 섹션이 성장하면서 학교와 관계 기관에 학부모 전체의 의견을 공식적으로 대표할 조직이 필요하다는 공감대가 형성되었습니다.', fr: 'Sans structure formelle, les parents ont soutenu les événements, la promotion de la section et le dialogue avec le Centre éducatif coréen. La croissance de la section a fait émerger le besoin d’une représentation officielle.' } },
  { date: { ko: '2026년 3월', fr: 'Mars 2026' }, title: { ko: '정관 채택', fr: 'Adoption des statuts' },
    text: { ko: '3월 16일 학부모 모임에서 협회 정관을 채택하고, 3월 30일 정관에 서명했습니다. 국제섹션에 자녀를 둔 학부모는 정관에 따라 모두 협회 회원이 됩니다.', fr: 'Les statuts sont adoptés le 16 mars et signés le 30 mars. Tous les parents d’élèves de la section en sont membres.' } },
  { date: { ko: '2026년 4월 28일', fr: '28 avril 2026' }, title: { ko: '협회 공식 신고', fr: 'Déclaration de l’association' },
    text: { ko: '1901년 법에 따른 비영리 협회로 신고를 마쳤습니다. 이후 임시 운영진이 협회 운영의 기틀을 마련했습니다.', fr: 'Déclaration en préfecture comme association loi 1901 ; une équipe provisoire met en place le fonctionnement.' } },
  { date: { ko: '2026년 9월', fr: 'Septembre 2026' }, title: { ko: '운영 기반 마련', fr: 'Mise en place administrative' },
    text: { ko: '협회 명의의 은행 계좌를 개설하고 책임보험 가입을 추진했습니다.', fr: 'Ouverture du compte bancaire et souscription de l’assurance responsabilité civile.' } },
  { date: { ko: '2026년 10월 4일', fr: '4 octobre 2026' }, title: { ko: '제1회 정기총회', fr: 'Première assemblée générale' },
    text: { ko: '운영진 재신임(임기 2년)과 2026–2027년도 연회비(가정당 20유로)를 의결하고, 임시 운영체제에서 정식 운영체제로 전환했습니다. 학교급별 대표를 새로 정하고 실무진 모집을 시작했습니다.', fr: 'Reconduction du bureau pour deux ans, vote de la cotisation 2026–2027 (20 € par famille) et passage à un fonctionnement régulier ; désignation des représentants de niveau.' } },
];

export const PARTNERS: { name: T; role: T; href: string; side: 'kr' | 'fr' }[] = [
  { side: 'kr', name: { ko: '대한민국 교육부', fr: 'Ministère coréen de l’Éducation' }, role: { ko: '양국 협약에 따른 교사 인건비 예산', fr: 'Financement des postes d’enseignants' }, href: 'https://www.moe.go.kr' },
  { side: 'kr', name: { ko: '주프랑스 한국교육원', fr: 'Centre éducatif coréen en France' }, role: { ko: '한국어 교사 채용과 급여 집행, 섹션 홍보와 입학설명회', fr: 'Recrutement et rémunération des enseignants, promotion' }, href: 'https://fr-fr.educoree.fr/' },
  { side: 'fr', name: { ko: '프랑스 국민교육부', fr: 'Ministère de l’Éducation nationale' }, role: { ko: '국제섹션 제도와 교육과정', fr: 'Cadre et programmes des sections internationales' }, href: 'https://www.education.gouv.fr/' },
  { side: 'fr', name: { ko: '베르사유 교육청', fr: 'Académie de Versailles' }, role: { ko: '수업 관리·감독, 입학 심사와 결정', fr: 'Pilotage pédagogique, admissions' }, href: 'https://www.ac-versailles.fr/si92' },
  { side: 'fr', name: { ko: '쿠르브부아 시청', fr: 'Ville de Courbevoie' }, role: { ko: '유치원·초등학교 운영 지원, 입학 안내', fr: 'Écoles du 1er degré, information des familles' }, href: 'https://www.ville-courbevoie.fr/' },
  { side: 'fr', name: { ko: 'Collège Les Bruyères', fr: 'Collège Les Bruyères' }, role: { ko: '중학교 과정 운영', fr: 'Section au collège' }, href: 'https://clg-bruyeres-courbevoie.ac-versailles.fr/' },
];

/* ---------------- 입학 ---------------- */

export const PROFILES: { title: T; text: T }[] = [
  { title: { ko: '외국 국적 가정', fr: 'Familles étrangères' },
    text: { ko: '초등학교에 지원하는 경우, 자녀가 같은 나이 학급을 따라갈 수 있는 프랑스어 실력을 갖춰야 합니다.', fr: 'En élémentaire, l’enfant doit avoir un niveau de français lui permettant de suivre sa classe d’âge.' } },
  { title: { ko: '이중국적 가정', fr: 'Familles binationales' },
    text: { ko: '부모 중 한 명이 한국 국적이어야 합니다.', fr: 'L’un des deux parents doit être ressortissant coréen.' } },
  { title: { ko: '해외에서 돌아온 프랑스 가정', fr: 'Familles françaises de retour d’expatriation' },
    text: { ko: '자녀가 학년에 맞는 한국어 역량을 갖춰야 하며, 면접에서 이를 확인합니다.', fr: 'L’enfant doit avoir en coréen un niveau adapté à sa classe, vérifié lors de l’entretien.' } },
];

export const EXPECTED: { when: T; level: T }[] = [
  { when: { ko: '유치원 GS 말 (CP 진입)', fr: 'Fin de grande section' }, level: { ko: '말하기 A2 수준', fr: 'Niveau A2 à l’oral' } },
  { when: { ko: '초등 CM2 말 (중학교 진입)', fr: 'Fin de CM2' }, level: { ko: '말하기 B1, 쓰기 A2 수준', fr: 'B1 à l’oral, A2 à l’écrit' } },
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
  { date: '2027-02-08', title: { ko: '입학 면접 기간 시작 (예상)', fr: 'Début des entretiens (prévision)' },
    place: { ko: '교육청 안내', fr: 'Selon convocation' }, kind: 'info', tentative: true,
    desc: { ko: '2월 초부터 4월 초까지 진행됩니다.', fr: 'De début février à début avril.' } },
  { date: '2027-06-03', title: { ko: '입학 결과 통보 (예상)', fr: 'Communication des décisions (prévision)' },
    place: { ko: '교육청', fr: 'Académie' }, kind: 'info', tentative: true },
];

/** 해마다 반복되는 공식 일정 (행사 페이지의 연간 달력) */
export const ANNUAL: { when: T; items: T[] }[] = [
  { when: { ko: '9월', fr: 'Septembre' }, items: [{ ko: '신학기 시작, 학교별 신학기 행사', fr: 'Rentrée et fêtes de rentrée' }] },
  { when: { ko: '10월', fr: 'Octobre' }, items: [{ ko: '학교운영위원회 학부모 대표 선거', fr: 'Élections des représentants de parents' }, { ko: '협회 정기총회 (연 1~2회)', fr: 'Assemblée générale de l’association' }] },
  { when: { ko: '11월 ~ 12월', fr: 'Novembre – décembre' }, items: [{ ko: '주프랑스 한국교육원 입학설명회', fr: 'Réunion d’information du Centre éducatif coréen' }, { ko: '입학 원서 접수 (1차)', fr: 'Dépôt des candidatures (1re vague)' }, { ko: '주프랑스 한국교육원 정기 면담', fr: 'Rencontre avec le Centre éducatif coréen' }] },
  { when: { ko: '1월 ~ 2월', fr: 'Janvier – février' }, items: [{ ko: '입학 서류 심사와 면접 안내', fr: 'Étude des dossiers, convocations' }] },
  { when: { ko: '2월 ~ 4월', fr: 'Février – avril' }, items: [{ ko: '입학 면접', fr: 'Entretiens d’admission' }, { ko: '4월 중순 도 위원회 심사, 2차 모집 접수', fr: 'Commission mi-avril, 2e vague' }] },
  { when: { ko: '봄 학기', fr: 'Printemps' }, items: [{ ko: '한국의 날(Journée de la Corée), 학교별 일정', fr: 'Journée de la Corée (selon les écoles)' }] },
  { when: { ko: '6월', fr: 'Juin' }, items: [{ ko: '입학 결과 통보', fr: 'Résultats des admissions' }, { ko: '학년 말 학교 축제', fr: 'Fêtes de fin d’année' }] },
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
  { q: { ko: '가정에서 한국어를 얼마나 써야 하나요?', fr: 'Quelle place pour le coréen à la maison ?' },
    a: { ko: '쿠르브부아 국제섹션 안내 책자는 주 3시간 수업 밖에서도 아이가 한국어를 꾸준히, 실제 생활 속에서 접해야 한다고 밝히고 있습니다. 가정에서 한국어를 정기적으로 쓰고 한국 문화를 함께 나누는 것이 지원의 전제이며, 만화 시청이나 동요 몇 곡 정도로는 섹션 수업을 따라가기 어렵다고 안내합니다.', fr: 'La plaquette des SI de Courbevoie rappelle que l’enfant doit être exposé régulièrement et authentiquement à la langue hors des 3 heures ; les familles s’engagent à la parler à la maison. Regarder des dessins animés ou connaître quelques comptines ne suffit pas.' } },
  { q: { ko: '섹션을 중간에 그만둘 수 있나요?', fr: 'Peut-on quitter la section en cours de parcours ?' },
    a: { ko: '가정의 요청만으로 중단할 수는 없습니다. 학부모, 학교장, 섹션 교사와 담임 교사가 함께 준비한 자료를 장학관이 검토해 결정합니다. 초등 CE2 말에는 평가 자료를 바탕으로 다음 단계(cycle 3) 진행 여부를 판단합니다.', fr: 'L’interruption est prononcée par l’inspectrice de l’Éducation nationale après étude d’un dossier constitué avec l’école. En fin de CE2, les grilles d’évaluation sont étudiées pour la poursuite en cycle 3.' } },
  { q: { ko: '국제섹션 수업은 일반 수업과 어떻게 함께 진행되나요?', fr: 'Comment la section s’articule-t-elle avec la classe ?' },
    a: { ko: '섹션 학생은 학교의 여러 반에 나뉘어 일반 학생과 같은 프랑스 정규 수업을 듣고, 정해진 시간에 한국어 수업에 참여합니다. 섹션 교사와 담임 교사가 수업 내용을 협의하며, 학습 결과는 학교의 공식 기록부에 함께 남습니다.', fr: 'Les élèves suivent le programme de leur classe et rejoignent les cours de section aux horaires prévus ; enseignants de SI et de classe se concertent, et les progrès figurent dans les documents officiels de suivi.' } },
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

/* 정보 출처 (공개 페이지에는 표시하지 않음)
   - Ville de Courbevoie, Sections internationales 2026-2027 (modifié le 03/12/2025)
   - Académie de Versailles, ac-versailles.fr/si92 ; Plaquette « Les sections internationales de Courbevoie »
   - education.gouv.fr : sections internationales au collège, au lycée ; eduscol.education.gouv.fr/5319
   - 주프랑스 한국교육원 fr-fr.educoree.fr ; 프랑스존 2019.04.11, 2020.01.23 기사 */
