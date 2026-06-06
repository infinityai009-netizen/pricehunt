import NextAuth, { type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
import Credentials from 'next-auth/providers/credentials';

// Build the list of providers based on which env vars are set.
// If a provider is missing keys, it just isn't shown — no crash.
const providers: NextAuthConfig['providers'] = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  );
}

if (process.env.AUTH_FACEBOOK_ID && process.env.AUTH_FACEBOOK_SECRET) {
  providers.push(
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    })
  );
}

if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  );
}

if (process.env.AUTH_RESEND_KEY) {
  providers.push(
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_EMAIL_FROM || 'PriceHunt <onboarding@resend.dev>',
    })
  );
}

// Email + password fallback — uses in-memory store via the same Credentials
// provider. In production replace this with a real DB (Postgres, etc.) and
// hash passwords with bcrypt.
providers.push(
  Credentials({
    name: 'Email & password',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
      name: { label: 'Name', type: 'text' },
    },
    async authorize(credentials) {
      const email = credentials?.email as string;
      const name = (credentials?.name as string) || email?.split('@')[0] || 'User';
      if (!email) return null;
      return {
        id: email,
        email,
        name,
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=2563eb`,
      };
    },
  })
);

export const config: NextAuthConfig = {
  providers,
  pages: {
    signIn: '/',
    error: '/',
  },
  session: { strategy: 'jwt' },
  trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// Helper for UI to know what's enabled at runtime
export function availableProviders() {
  return {
    google:   !!(process.env.AUTH_GOOGLE_ID   && process.env.AUTH_GOOGLE_SECRET),
    facebook: !!(process.env.AUTH_FACEBOOK_ID && process.env.AUTH_FACEBOOK_SECRET),
    github:   !!(process.env.AUTH_GITHUB_ID   && process.env.AUTH_GITHUB_SECRET),
    email:    !!process.env.AUTH_RESEND_KEY,
    credentials: true,
  };
}
