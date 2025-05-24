import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => any {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    
    return new Promise<ReturnType<T>>((resolve) => {
      timeoutId = setTimeout(() => {
        const result = fn(...args) as ReturnType<T>;
        resolve(result);
        timeoutId = null;
      }, delay);
    });
  };
}