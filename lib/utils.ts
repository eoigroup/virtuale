import { clsx, type ClassValue } from "clsx";
import { FieldValues, UseFormGetValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDirtyValues<T extends FieldValues>(
  getValues: UseFormGetValues<T>,
  dirtyFields: Partial<Record<keyof T, boolean>>
): Partial<T> {
  const allValues = getValues();
  const dirtyValues = Object.keys(dirtyFields).reduce((acc, key) => {
    if (dirtyFields[key]) {
      acc[key as keyof T] = allValues[key as keyof T];
    }
    return acc;
  }, {} as Partial<T>);

  return dirtyValues;
}

export const removeEmojis = (input: string): string => {
  // Define a regular expression to match all emojis
  const emojiRegex =
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF])/g;

  return input.replace(emojiRegex, "");
};

export const convertBlobToBase64 = (
  blob: Blob,
  full?: boolean
): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const result = reader.result as string;
      let base64String = result.split(",")[1];
      if (full) {
        base64String = reader.result as string;
      }
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const replaceQuotes = (url: string) => {
  url = url.replace(/client_id="([^"]*)"/, "client_id=$1");

  return url;
};

// Validation function to check if file is an image
export const validateImageFile = (file: File) => {
  return file.type.startsWith("image/");
};
