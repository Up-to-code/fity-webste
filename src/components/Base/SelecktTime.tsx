import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectTime() {
  return (
    <Select >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time</SelectLabel>
          <SelectItem value="25min">25 min</SelectItem>
          <SelectItem value="50min">50 min</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
