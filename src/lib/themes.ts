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
  }
];

export function getTheme(id: string): Theme {
  return themes.find((t) => t.id === id) || themes[0];
}
