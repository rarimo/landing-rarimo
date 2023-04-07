import { Fetcher } from '@distributedlab/fetcher';
import { CONFIG } from '@/config';

export const hubspotApi = new Fetcher({
  baseUrl: CONFIG.hubspotProxyUrl,
  headers: {
    'Content-Type': 'application/json',
    "Origin": window.origin,
  },
  credentials: 'omit'
})
