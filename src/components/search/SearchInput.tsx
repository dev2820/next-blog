"use client";

import { useMount } from "@/hooks/use-mount";
import { cx } from "@/utils/cx";
import { delayFn } from "@/utils/delay";
import { SearchIcon, XIcon } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  forwardRef,
  useState,
} from "react";

export type SearchInputProps = ComponentPropsWithoutRef<"label"> & {
  onChangeSearch?: (keyword: string) => void;
  onClearSearch?: () => void;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
};
export const SearchInput = forwardRef<HTMLLabelElement, SearchInputProps>(
  (props, ref) => {
    const {
      onChangeSearch,
      onClearSearch,
      value,
      placeholder,
      defaultValue,
      className,
      ...rest
    } = props;

    const handleTypingSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const newKeyword = e.currentTarget.value;

      onChangeSearch?.(newKeyword);
    };

    const handleClearSearch = () => {
      onChangeSearch?.("");
    };

    return (
      <>
        <label className={cx("relative ", className)} {...rest} ref={ref}>
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="search"
            placeholder={placeholder}
            className={cx(
              "peer",
              "h-full w-full rounded-lg text-md bg-white caret-primary pl-11 pr-11 shadow-xl",
              "duration-200",
              "border-2 focus:outline-none border-transparent focus:border-primary",
              "focus-visible:outline-none focus-visible:border-primary"
            )}
            value={value}
            onChange={handleTypingSearch}
          />
          <button
            id="search-cancel-btn"
            className="peer-placeholder-shown:hidden absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex justify-center place-items-center"
            type="button"
            onClick={handleClearSearch}
          >
            <XIcon size={20} />
          </button>
        </label>
      </>
    );
  }
);

SearchInput.displayName = "SearchInput";
