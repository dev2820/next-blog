"use client";

import { useTableOfContents } from "@/hooks/use-table-of-contents";
import type { TableOfContentsItem } from "@/types/post";
import { cx } from "@/utils/cx";
import Link from "next/link";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useRef,
} from "react";

export type TableOfContentProps = ComponentProps<"nav"> & {
  toc: TableOfContentsItem[];
};
export function TableOfContents(props: TableOfContentProps) {
  const { toc, ...rest } = props;
  const itemsRef = useRef<(ElementRef<typeof Item> | null)[]>([]);

  useTableOfContents({
    onVisible: (entry) => {
      /**
       * TODO: 더 좋은 ToC 알고리즘
       */
      const id = entry.target.getAttribute("id");
      const targetEl = itemsRef.current.find(
        ($el) => $el?.dataset["id"] === `#${id}`
      );

      if (targetEl) {
        targetEl.dataset["active"] = "true";
      }
    },
    onInvisible: (entry) => {
      const id = entry.target.getAttribute("id");
      const targetEl = itemsRef.current.find(
        ($el) => $el?.dataset["id"] === `#${id}`
      );
      if (targetEl) {
        targetEl.dataset["active"] = "false";
      }
    },
  });

  return (
    <nav {...rest}>
      <ol>
        {toc.map((item, idx) => (
          <li key={item.slug}>
            <Link href={item.slug}>
              <Item
                item={item}
                data-id={item.slug}
                ref={(el) => {
                  itemsRef.current[idx] = el;
                }}
              ></Item>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

type ItemProps = ComponentPropsWithoutRef<"div"> & {
  item: TableOfContentsItem;
};
const Item = forwardRef<HTMLDivElement, ItemProps>(function Item(props, ref) {
  const { item, className, ...rest } = props;

  return (
    <div
      className={cx(
        'font-light py-1 text-neutral-400 data-[active="true"]:text-primary data-[active="true"]:font-bold duration-300',
        item.level === 1 && "pl-2",
        item.level === 2 && "pl-4",
        item.level === 3 && "pl-8",
        item.level === 4 && "pl-12",
        className
      )}
      {...rest}
      ref={ref}
    >
      {item.content}
    </div>
  );
});
