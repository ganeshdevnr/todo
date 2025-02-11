import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and anon key
const supabaseUrl = 'https://isesukmjircgklrhwuwf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzZXN1a21qaXJjZ2tscmh3dXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNDkzODAsImV4cCI6MjA1NDgyNTM4MH0.7GtoAIT65NNBOK3tRfHWG0FFb1mZnUrjGPdFocEc3uY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
