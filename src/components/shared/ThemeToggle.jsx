"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { Switch } from "@heroui/react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const handleThemeChange = (isSelected) => {
    setTheme(isSelected ? "dark" : "light");
  };

  return (
    <div className="flex gap-3">
      <Switch
        aria-label="Toggle theme"
        size="lg"
        isSelected={isDark}
        onChange={handleThemeChange}>

        <Switch.Content>

          <Switch.Control>
            <Switch.Thumb>
              <Switch.Icon>
                {isDark ? (
                  <Sun className="size-3 text-inherit" />
                ) : (
                  <Moon className="size-3 text-inherit" />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </Switch.Content>
      </Switch>
    </div>
  );
}