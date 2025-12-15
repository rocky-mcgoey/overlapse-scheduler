import 'react-native-url-polyfill/auto'; // overrides react-native default URL/URLParams object -- which are intrinsically restrictive
import AsyncStorage from '@react-native-async-storage/async-storage'; // allows us to store auth sessions in react native -- Not totally secure alone, but this is fine for a class project
import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
});
