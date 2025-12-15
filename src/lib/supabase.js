import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseKey) {
  console.warn("Missing Supabase env vars");
}

export const supabase = createClient(supabaseURL, supabaseKey);
