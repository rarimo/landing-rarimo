import { CONFIG } from '@/config';

export const communitySectionList = [
  {
    icon: '/sprite.svg#icon-messages',
    titleKey: 'community-section.engineering-support-title',
    link: '#',
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
