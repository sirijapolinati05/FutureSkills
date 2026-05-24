import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojsbmmtdngznojywznup.supabase.co';
const supabaseKey = 'sb_publishable_jzLvSNZNy_oLcigw22r8BA_rlc1Dn6t';

export const supabase = createClient(supabaseUrl, supabaseKey);
