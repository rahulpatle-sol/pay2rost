// lib/generateSlug.ts
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 8);

export const generateSlug = () => nanoid();
