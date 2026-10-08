// ─────────────────────────────────────────────────────────────
//  사이트 공개 설정 (이 파일 한 곳만 바꾸면 됩니다)
// ─────────────────────────────────────────────────────────────

/**
 * 검색엔진 노출 여부.
 * false: 모든 페이지에 noindex 태그, robots.txt 전체 차단 (준비 기간)
 * true : 정식 공개 시 검색엔진 등록 허용
 */
export const SEARCH_INDEXING = false;

/** 사이트 기본 경로. GitHub Pages(계정.github.io/저장소명/)에서는 빌드 시 자동 설정됩니다. */
export const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
