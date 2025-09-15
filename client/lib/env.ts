export const env = {
  supabaseUrl: (import.meta as any).env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: (import.meta as any).env.VITE_SUPABASE_ANON_KEY as
    | string
    | undefined,
  googleMapsApiKey: (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY as
    | string
    | undefined,
};
