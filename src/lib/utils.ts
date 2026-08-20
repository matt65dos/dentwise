import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Gender } from "../../prisma/generated/enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatar(name: string, gender: Gender) {
  const username = name.replace(/\s+/g, "").toLocaleLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === 'FEMALE') return `${base}/girl?username=${username}`;

  return `${base}/boy?username=${username}`;
}

// phone formatting function for US numbers - ai generated 🎉
export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};
