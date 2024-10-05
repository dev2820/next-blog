import { useMediaQuery } from "./use-media-query";

export const useScreen = () => {
  const isLargerThanTablet = useMediaQuery("(min-width: 1023px)");
  const isLargerThanMobile = useMediaQuery("(min-width: 601px)");
  const isMobile = !isLargerThanMobile;
  const isTablet = isLargerThanMobile && !isLargerThanTablet;
  const isDesktop = isLargerThanTablet;
  const isSmallerThanDesktop = !isDesktop;
  const isSmallerThanTablet = isMobile;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargerThanTablet,
    isLargerThanMobile,
    isSmallerThanDesktop,
    isSmallerThanTablet,
  };
};
