import { useEffect } from "react";

export type UseTableOfContentsProps = {
  onVisible?: (entry: IntersectionObserverEntry) => void;
  onInvisible?: (entry: IntersectionObserverEntry) => void;
};
export const useTableOfContents = (props: UseTableOfContentsProps) => {
  const { onVisible, onInvisible } = props;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.intersectionRatio > 0) {
          // 진입시
          onVisible && onVisible(entry);
        } else {
          // 진출시
          onInvisible && onInvisible(entry);
        }
      });
    });

    document
      .querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]")
      .forEach(($el) => {
        observer.observe($el);
      });
  }, []);
  return null;
};
