import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

const supabaseUrl = process.env.PROJECT_URL;
const supabaseAnonKey = process.env.ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);