export const routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  users: '/users',
  dashboard: '/spreadsheets',
  spreadsheetDetails: (tableId: string) => `/spreadsheets/${tableId}`,
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
} as const;
