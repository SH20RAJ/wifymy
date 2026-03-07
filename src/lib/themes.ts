import { type CustomTheme } from '@/app/actions/pages';

export type { CustomTheme };

export type Theme = {
  id: string;
  name: string;
  type: 'light' | 'dark';
  style: {
    background: string;
    card: string;
    cardBorder: string;
    text: string;
    textMuted: string;
    button: string;
    buttonText: string;
    buttonHover: string;
    fontFamily: string;
  };
  effects?: {
    type: 'hearts' | 'particles' | 'grid' | 'dots' | 'folk-pattern' | 'none';
  };
};

export const themes: Theme[] = [
  {
    id: 'minimalist',
    name: 'Minimalist (Default)',
    type: 'light',
    style: {
      background: '#fafafa',
      card: '#ffffff',
      cardBorder: '#e5e7eb',
      text: '#111827',
      textMuted: '#6b7280',
      button: '#111827',
      buttonText: '#ffffff',
      buttonHover: '#374151',
      fontFamily: 'var(--font-outfit), sans-serif',
    },
  },
  {
    id: 'developer',
    name: 'Terminal',
    type: 'dark',
    style: {
      background: '#09090b',
      card: '#18181b',
      cardBorder: '#27272a',
      text: '#22c55e', // Green text for terminal feel
      textMuted: '#a1a1aa', // Zinc 400
      button: '#22c55e',
      buttonText: '#000000',
      buttonHover: '#16a34a',
      fontFamily: 'monospace',
    },
  },
  {
    id: 'creator',
    name: 'Creator Glow',
    type: 'light',
    style: {
      background: 'linear-gradient(to top right, #ffecd2 0%, #fcb69f 100%)',
      card: 'rgba(255, 255, 255, 0.6)',
      cardBorder: 'rgba(255, 255, 255, 0.8)',
      text: '#4c1d95',
      textMuted: '#7c3aed',
      button: '#ffffff',
      buttonText: '#4c1d95',
      buttonHover: 'rgba(255, 255, 255, 0.8)',
      fontFamily: 'var(--font-outfit), sans-serif', // Keep outfit for body but glow background
    },
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    type: 'dark',
    style: {
      background: '#000000',
      card: '#111111',
      cardBorder: '#333333',
      text: '#ffffff',
      textMuted: '#888888',
      button: '#ffffff',
      buttonText: '#000000',
      buttonHover: '#cccccc',
      fontFamily: 'var(--font-outfit), sans-serif',
    },
  },
  {
    id: 'neo-brutal',
    name: 'Neo Brutalism',
    type: 'light',
    style: {
      background: '#fde047', // Yellow 300
      card: '#ffffff',
      cardBorder: '#000000',
      text: '#000000',
      textMuted: '#404040', // Neutral 700
      button: '#ef4444', // Red 500
      buttonText: '#ffffff',
      buttonHover: '#dc2626',
      fontFamily: 'var(--font-outfit), sans-serif',
    },
    effects: { type: 'grid' }
  },
  {
    id: 'romance',
    name: 'Romance',
    type: 'light',
    style: {
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      card: 'rgba(255, 255, 255, 0.7)',
      cardBorder: '#fbcfe8', // Pink 200
      text: '#be185d', // Pink 700
      textMuted: '#f472b6', // Pink 400
      button: '#db2777', // Pink 600
      buttonText: '#ffffff',
      buttonHover: '#be185d',
      fontFamily: 'var(--font-outfit), sans-serif',
    },
    effects: { type: 'hearts' }
  },
  {
    id: 'indian-heritage',
    name: 'Indian Heritage',
    type: 'dark',
    style: {
      background: '#7c2d12', // Orange 900 (Terracotta)
      card: '#9a3412', // Orange 800
      cardBorder: '#f59e0b', // Amber 500 (Marigold)
      text: '#fef3c7', // Amber 50
      textMuted: '#fcd34d', // Amber 300
      button: '#f59e0b',
      buttonText: '#7c2d12',
      buttonHover: '#d97706',
      fontFamily: 'var(--font-outfit), sans-serif',
    },
    effects: { type: 'folk-pattern' }
  },
  {
    id: 'folk',
    name: 'Folk Earth',
    type: 'light',
    style: {
      background: '#fef3c7', // Amber 50
      card: '#ffffff',
      cardBorder: '#d97706', // Amber 600
      text: '#451a03', // Amber 950
      textMuted: '#78350f', // Amber 900
      button: '#15803d', // Green 700
      buttonText: '#ffffff',
      buttonHover: '#166534', // Green 800
      fontFamily: 'var(--font-outfit), sans-serif',
    },
    effects: { type: 'dots' }
  }
];

export function getTheme(id: string): Theme {
  return themes.find((t) => t.id === id) || themes[0];
}

export const defaultCustomTheme: CustomTheme = {
    backgroundType: 'solid',
    backgroundValue: '#ffffff',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundOverlay: 'rgba(0,0,0,0)',
    buttonColor: '#000000',
    buttonTextColor: '#ffffff',
    buttonStyle: 'flat',
    buttonRadius: '12px',
    textColor: '#000000',
    fontFamily: 'var(--font-outfit), sans-serif',
    avatarStyle: 'circle',
    avatarBorderColor: '#000000',
    avatarBorderSize: '0px',
    avatarBorderRadius: '50%',
    seoTitle: '',
    seoDescription: '',
    customCss: ''
};
