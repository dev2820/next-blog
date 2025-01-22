"use client";

import { useDarkMode } from "@/hooks/use-dark-mode";
import { cx } from "@/utils/cx";
import { MoonIcon, SunIcon } from "lucide-react";
import { FormEvent } from "react";
import { Switch, SwitchProps } from "terra-design-system/react";

export type DarkModeToggleProps = Omit<SwitchProps["Root"], "onChange">;
export function DarkModeToggle(props: DarkModeToggleProps) {
  const { size = "md", ...rest } = props;
  const { isDark, on, off } = useDarkMode();
  const handleChangeMode = (event: FormEvent<HTMLLabelElement>) => {
    const isOn = (event.target as HTMLInputElement).checked;

    isOn ? on() : off();
  };

  return (
    <Switch.Root
      size={size}
      onChange={handleChangeMode}
      checked={isDark}
      {...rest}
    >
      <Switch.Label>
        <div className="relative w-6">
          <MoonIcon
            className={cx(
              "absolute top-1/2 -translate-y-1/2 text-yellow-500 fill-current transition-opacity",
              isDark ? "opacity-1" : "opacity-0"
            )}
          />
          <SunIcon
            className={cx(
              "absolute top-1/2 -translate-y-1/2 text-yellow-500 fill-current transition-opacity",
              isDark ? "opacity-0" : "opacity-1"
            )}
          />
        </div>
      </Switch.Label>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.HiddenInput />
    </Switch.Root>
  );
}
