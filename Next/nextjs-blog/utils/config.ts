export const IronSessionOptions = {
  cookieName: process.env.NEXT_PUBLCI_SESSION_COOKIE_NAME as string,
  password: process.env.NEXT_PUBLCI_SESSION_PASSWORD as string,
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  },
};
