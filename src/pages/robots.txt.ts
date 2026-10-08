import type { APIRoute } from 'astro';
import { SEARCH_INDEXING, BASE } from '../config';

// 준비 기간에는 모든 검색엔진과 AI 수집 봇의 접근을 막고,
// 정식 공개(SEARCH_INDEXING = true) 후에는 회원 영역만 막습니다.
export const GET: APIRoute = () => {
  const body = SEARCH_INDEXING
    ? `User-agent: *\nDisallow: ${BASE}ko/membres/\nDisallow: ${BASE}fr/membres/\n`
    : [
        '# 사이트 준비 중: 검색엔진 수집 차단',
        'User-agent: *',
        'Disallow: /',
        '',
        '# AI 학습용 수집 봇',
        ...['GPTBot', 'ChatGPT-User', 'CCBot', 'Google-Extended', 'anthropic-ai', 'ClaudeBot', 'PerplexityBot', 'Bytespider'].flatMap((b) => [`User-agent: ${b}`, 'Disallow: /', '']),
      ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
