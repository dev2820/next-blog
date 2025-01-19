import { useEffect, useRef } from "react";

export type UseTableOfContentsProps = {
  targetQuery: string;
  onVisible?: (entry: IntersectionObserverEntry) => void;
  onInvisible?: (entry: IntersectionObserverEntry) => void;
};
export const useTableOfContents = (props: UseTableOfContentsProps) => {
  const { targetQuery, onVisible, onInvisible } = props;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 진입시
            onVisible && onVisible(entry);
          } else {
            // 진출시
            onInvisible && onInvisible(entry);
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px",
        threshold: 0,
      }
    );

    const contentSections = document.querySelectorAll(targetQuery);
    contentSections.forEach(($el) => {
      observerRef.current?.observe($el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onVisible, onInvisible, targetQuery]);

  return null;
};
