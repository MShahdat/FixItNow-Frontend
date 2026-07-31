"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const items = [
  { label: "Default", value: "default" },
  { label: "2", value: "2" },
  { label: "4", value: "4" },
  { label: "6", value: "6" },
  { label: "8", value: "8" },
];

export function CardShow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Current selected value
  const limit = searchParams.get("limit") ?? "default";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("limit");
    } else {
      params.set("limit", value);
    }

    // Optional: reset page when page size changes
    params.delete("page");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Select value={limit} onValueChange={handleChange}>
      <SelectTrigger className="w-full max-w-48 min-w-20">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Per Page</SelectLabel>

          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}