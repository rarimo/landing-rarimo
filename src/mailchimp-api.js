import { Fetcher } from '@distributedlab/fetcher';

import { CONFIG } from '@/config';

export const mailchimpApi = new Fetcher({
  baseUrl: CONFIG.mailchipUrl,
});
