export type Level = 'mat' | 'elem' | 'col';
export type Role = 'member' | 'rep' | 'admin';
export type Status = 'pending' | 'approved' | 'rejected';
export type Lang = 'ko' | 'fr';

export interface User { uid: string; email: string; emailVerified: boolean }

export interface Profile {
  uid: string;
  name: string;
  email: string;
  levels: Level[];
  phone: string;
  imageConsent: boolean;
  privacyConsent: boolean;
  lang: Lang;
  status: Status;
  role: Role;
  repLevel: Level | null;
  createdAt: number;
  approvedBy?: string | null;
  approvedAt?: number | null;
}
export type NewProfile = Pick<Profile, 'name' | 'email' | 'levels' | 'phone' | 'imageConsent' | 'privacyConsent' | 'lang'>;
export type ProfilePatch = Partial<Pick<Profile, 'name' | 'levels' | 'phone' | 'imageConsent' | 'lang'>>;

/** 회원 전용 콘텐츠 */
export type ContentCol = 'notices' | 'minutes' | 'relations' | 'gallery' | 'expenses' | 'sharing';
/** 공개 양식으로 들어오는 데이터 (임원만 열람) */
export type InboxCol = 'messages' | 'registrations' | 'subscribers';

export interface StoredFile { name: string; path: string; url?: string }
export interface Item { id: string; createdAt: number; files?: StoredFile[]; [k: string]: any }

export interface Backend {
  mode: 'demo' | 'firebase';
  onAuth(cb: (u: User | null) => void): void;
  signUp(email: string, password: string, lang: Lang): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  resetPassword(email: string, lang: Lang): Promise<void>;
  resendVerification(lang: Lang): Promise<void>;
  reloadUser(): Promise<User | null>;
  deleteAccount(): Promise<void>;

  getProfile(uid: string): Promise<Profile | null>;
  createProfile(uid: string, p: NewProfile): Promise<void>;
  updateMyProfile(uid: string, patch: ProfilePatch): Promise<void>;

  list(col: ContentCol | InboxCol): Promise<Item[]>;
  add(col: ContentCol, data: Record<string, any>, files?: File[]): Promise<string>;
  remove(col: ContentCol | InboxCol, id: string): Promise<void>;
  fileUrl(f: StoredFile): Promise<string>;
  submitPublic(col: InboxCol, data: Record<string, any>): Promise<void>;

  listMembers(): Promise<Profile[]>;
  setStatus(uid: string, status: Status, by: string): Promise<void>;
  setRole(uid: string, role: Role, repLevel: Level | null): Promise<void>;
}

/** 백엔드 오류를 화면 문구 키로 정리 */
export class AppError extends Error {
  constructor(public code: string, message?: string) { super(message ?? code); }
}
