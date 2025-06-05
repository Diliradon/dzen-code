import { useMediaQuery } from 'usehooks-ts';

import { screens } from '../../../tailwind.config';

export const useResponsive = () => {
  const isMobile = useMediaQuery(`(max-width: ${screens.sm})`);
  const isTablet = useMediaQuery(
    `(min-width: ${screens.sm}) and (max-width: ${screens.md})`,
  );
  const isDesktop = useMediaQuery(`(min-width: ${screens.md})`);

  const isTouchDevice = isMobile || isTablet;

  return { isMobile, isTablet, isDesktop, isTouchDevice };
};
