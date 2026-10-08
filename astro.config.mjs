import { defineConfig } from 'astro/config';

// SITE_URL, BASE_PATH 는 배포 환경에서 지정합니다.
//  - GitHub Pages(계정.github.io/asicc-site/): .github/workflows/deploy.yml 이 자동 지정
//  - 자체 도메인 또는 Firebase Hosting: 지정하지 않으면 기본값 사용
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.asicc.fr',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
