import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 소식 게시물: src/content/news/{ko|fr}/파일명.md
// 같은 글의 두 언어판은 같은 파일명을 씁니다 (언어 버튼이 서로 연결됨).
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['notice', 'event', 'relations', 'press']),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
