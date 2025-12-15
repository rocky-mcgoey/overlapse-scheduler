import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

console.log("Supabase URL:", supabaseURL);
console.log("Supabase Key exists?:", !!supabaseKey);

export const supabase = createClient(supabaseURL, supabaseKey);
