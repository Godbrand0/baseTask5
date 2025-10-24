import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  if (!address || address === "0x0000000000000000000000000000000000000000" || address === "0x0000000000000000000000000000000000000000000") return "Not Assigned";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(timestamp: bigint): string {
  if (!timestamp || timestamp === BigInt(0)) return "Not Set";
  const date = new Date(Number(timestamp) * 1000);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleDateString();
}

export function formatDateTime(timestamp: bigint): string {
  if (!timestamp || timestamp === BigInt(0)) return "Not Set";
  const date = new Date(Number(timestamp) * 1000);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleString();
}

export function getPriorityColor(priority: bigint): string {
  const priorityNum = Number(priority);
  switch (priorityNum) {
    case 1:
      return "bg-falu_red-100 text-falu_red-800 border border-falu_red-300";
    case 2:
      return "bg-falu_red-50 text-falu_red-700 border border-falu_red-200";
    case 3:
      return "bg-peach-100 text-peach-800 border border-peach-300";
    case 4:
      return "bg-lion-100 text-lion-800 border border-lion-300";
    case 5:
      return "bg-lion-50 text-lion-700 border border-lion-200";
    default:
      return "bg-brown-100 text-brown-800 border border-brown-300";
  }
}

export function getPriorityLabel(priority: bigint): string {
  const priorityNum = Number(priority);
  switch (priorityNum) {
    case 1:
      return "High";
    case 2:
      return "Medium-High";
    case 3:
      return "Medium";
    case 4:
      return "Medium-Low";
    case 5:
      return "Low";
    default:
      return "Unknown";
  }
}