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
      return "bg-falu_red-800 text-falu_red-600 border border-falu_red-400";
    case 2:
      return "bg-falu_red-900 text-falu_red-700 border border-falu_red-300";
    case 3:
      return "bg-peach-800 text-peach-300 border border-peach-400";
    case 4:
      return "bg-lion-800 text-lion-500 border border-lion-300";
    case 5:
      return "bg-lion-900 text-lion-600 border border-lion-200";
    default:
      return "bg-brown-900 text-brown-600 border border-brown-300";
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