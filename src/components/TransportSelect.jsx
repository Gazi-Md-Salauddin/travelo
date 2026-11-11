
"use client";

import { Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";

export default function TransportSelect({ transportType }) {
  const [selected, setSelected] = useState(transportType || "All");

  return (
    <>
      <Select
        className="w-full"
        value={selected}
        onChange={setSelected}
      >
        <Label>Transport Type</Label>

        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="All">
              All Transport
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Bus">
              Bus
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Train">
              Train
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Flight">
              Flight
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <input
        type="hidden"
        name="transportType"
        value={selected === "All" ? "" : selected}
      />
    </>
  );
}
