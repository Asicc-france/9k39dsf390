import { firebaseConfig } from '../../firebase-config';
import type { Backend } from './types';

let cached: Promise<Backend> | null = null;

/** Firebase 설정이 있으면 실제 백엔드, 없으면 데모 백엔드 */
export function getBackend(): Promise<Backend> {
  if (!cached) {
    cached = firebaseConfig.apiKey
      ? import('./firebase').then((m) => m.createFirebaseBackend(firebaseConfig))
      : import('./demo').then((m) => m.createDemoBackend());
  }
  return cached;
}
export * from './types';
