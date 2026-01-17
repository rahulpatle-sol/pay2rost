'use client'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hmdrbhjqnpwgdhzbceaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZHJiaGpxbnB3Z2RoemJjZWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzg2NzcsImV4cCI6MjA2NDg1NDY3N30.qPfIayqOek5dfTCgOE_UsZYHJ4X7_qh2OwzKBpl-d28';

export const supabase = createClient(supabaseUrl, supabaseKey);
