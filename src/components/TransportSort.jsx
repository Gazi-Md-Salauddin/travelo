
"use client";

import { Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";

export default function TransportSort({ sort }) {
  const [selected, setSelected] = useState(sort || "default");

  return (
    <>
      <Select
        className="w-full"
        placeholder="Sort by price"
        value={selected}
        onChange={setSelected}
      >
        <Label>Sort By Price</Label>

        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="default">
              Default Price
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="low">
              Price: Low to High
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="high">
              Price: High to Low
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <input
        type="hidden"
        name="sort"
        value={selected === "default" ? "" : selected}
      />
    </>
  );
}
