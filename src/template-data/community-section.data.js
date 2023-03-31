import { CONFIG } from '@/config';

export const communitySectionList = [
  {
    icon: '/icons/sprite.svg#icon-support',
    titleKey: 'community-section.support-title',
    descKey: 'community-section.support-desc',
    link: 'mailto: support@rarimo.com',
  },
  {
    icon: '/icons/sprite.svg#icon-monetization',
    titleKey: 'community-section.grant-programs-title',
    descKey: 'community-section.grant-programs-desc',
    link: null,
  },
  {
    icon: '/icons/sprite.svg#icon-discord',
    titleKey: 'community-section.discord-title',
    descKey: 'community-section.discord-desc',
    link: CONFIG.discordLink,
  },
];
