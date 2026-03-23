import { clsx, type ClassValue } from 'clsx';

// Utility: merge class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
