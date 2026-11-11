// No token or supplier credentials may be exported to client components.
export function makitoDemoEnabled() {
  return process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development' || (!process.env.VERCEL_ENV && process.env.MAKITO_DEMO_LOCAL === 'true');
}
