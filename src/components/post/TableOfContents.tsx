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
    targetQuery: "div#content h2,h3",
    onVisible: (entry) => {
      console.log(entry.target);
      const id = entry.target.id;

      const targetEl = itemsRef.current.find(
        ($el) => $el?.dataset["id"] === `#${id}`
      );

      if (targetEl) {
        const prevActiveEl = document.querySelector(
          '[data-toc-item=true][data-active="true"]'
        );
        if (prevActiveEl) {
          (prevActiveEl as HTMLElement).dataset["active"] = "false";
        }
        targetEl.dataset["active"] = "true";
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
                data-toc-item
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
        'text-sm font-light py-0.5 text-neutral-400 last:data-[active="true"]:text-primary duration-200 hover:text-primary',
        item.level === 1 && "pl-2",
        item.level === 2 && "pl-4",
        item.level === 3 && "pl-10",
        item.level === 4 && "pl-16",
        className
      )}
      {...rest}
      ref={ref}
    >
      {item.content}
    </div>
  );
});
