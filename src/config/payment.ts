// Payment Configuration

export const STRIPE_CONFIG = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
  currency: 'czk',
  country: 'CZ',
};

export const COMGATE_CONFIG = {
  merchant: import.meta.env.VITE_COMGATE_MERCHANT || '',
  secret: import.meta.env.VITE_COMGATE_SECRET || '',
  testMode: import.meta.env.VITE_COMGATE_TEST_MODE === 'true',
  apiUrl: import.meta.env.VITE_COMGATE_TEST_MODE === 'true'
    ? 'https://payments.comgate.cz/v1.0/create'
    : 'https://payments.comgate.cz/v1.0/create',
  country: 'CZ',
  currency: 'CZK',
  lang: 'cs',
};

export const PAYMENT_METHODS = {
  stripe: {
    id: 'stripe',
    name: 'Kreditní / Debetní karta',
    description: 'Platba kartou přes Stripe (Visa, Mastercard, Apple Pay, Google Pay)',
    icon: '💳',
    primary: true,
  },
  comgate: {
    id: 'comgate',
    name: 'Bankovní převod / Online platba',
    description: 'Platba přes ComGate (bankovní převod, QR platba)',
    icon: '🏦',
    primary: false,
  },
};

export type PaymentMethod = keyof typeof PAYMENT_METHODS;
