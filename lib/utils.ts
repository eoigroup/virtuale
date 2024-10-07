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
