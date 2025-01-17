"use client";

import { changeMode, isDarkMode } from "@/utils/darkmode";
import { FormEvent } from "react";
import { Switch, SwitchProps } from "terra-design-system/react";

export type DarkModeToggleProps = Omit<SwitchProps["Root"], "onChange">;
export function DarkModeToggle(props: DarkModeToggleProps) {
  const { size = "md", ...rest } = props;

  const handleChangeMode = (event: FormEvent<HTMLLabelElement>) => {
    const isOn = (event.target as HTMLInputElement).checked;

    changeMode(isOn);
  };

  return (
    <Switch.Root
      size={size}
      onChange={handleChangeMode}
      defaultChecked={isDarkMode()}
      {...rest}
    >
      <Switch.Label>다크모드</Switch.Label>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.HiddenInput />
    </Switch.Root>
  );
}
