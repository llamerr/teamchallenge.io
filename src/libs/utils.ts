import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toFormData = <T>(values: Partial<T>) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (Array.isArray(value)) {
      // Handle array values by appending each item with indexed keys
      value.forEach((item) => {
        formData.append(`${key}`, item.toString());
      });
    } else {
      // Handle non-array values
      formData.append(key, value as string | Blob);
    }
  }

  return formData;
};
