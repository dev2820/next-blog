"use client";

import { cx } from "@/utils/cx";
import { SearchIcon, XIcon } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  forwardRef,
} from "react";

export type SearchInputProps = ComponentPropsWithoutRef<"input"> & {
  onChangeSearch?: (keyword: string) => void;
  onClearSearch?: () => void;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
};
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
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
        <label className="relative flex-1">
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="search"
            placeholder={placeholder}
            ref={ref}
            className={cx(
              "peer",
              "w-full h-full rounded-lg text-md bg-white caret-primary pl-10 pr-10",
              "duration-200",
              "border-2 focus:outline-none border-primary-500 focus:ring-4 focus:ring-primary-200",
              "focus-visible:outline-none focus-visible:border-primary",
              className
            )}
            value={value}
            onChange={handleTypingSearch}
            {...rest}
          />
          <button
            id="search-cancel-btn"
            className={cx(
              "peer-placeholder-shown:hidden absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex justify-center place-items-center"
            )}
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
