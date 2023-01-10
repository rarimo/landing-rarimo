import { CONFIG } from '@/config';

export const communitySectionList = [
  {
    icon: '/sprite.svg#icon-messages',
    titleKey: 'community-section.engineering-support-title',
    link: 'mailto: support@rarimo.com',
  },
  {
    icon: '/sprite.svg#icon-monetization',
    titleKey: 'community-section.grant-programs-title',
    link: null,
  },
  {
    icon: '/sprite.svg#icon-discord',
    titleKey: 'community-section.discord-title',
    link: CONFIG.discordLink,
  },
];
