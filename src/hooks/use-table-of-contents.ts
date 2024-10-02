import { useEffect, useRef } from "react";

export type UseTableOfContentsProps = {
  onVisible?: (entry: IntersectionObserverEntry) => void;
  onInvisible?: (entry: IntersectionObserverEntry) => void;
};
export const useTableOfContents = (props: UseTableOfContentsProps) => {
  const { onVisible, onInvisible } = props;
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
        rootMargin: "-20% 0px",
        threshold: 0,
      }
    );

    const contentSections = document.querySelectorAll(
      'section[data-content="true"]'
    );
    contentSections.forEach(($el) => {
      observerRef.current?.observe($el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null;
};
