import { useState, useEffect } from 'react';

const useBreakpoint = (breakpoint) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint})`);
    const handleResize = () => setIsMatch(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [breakpoint]);

  return isMatch;
};

export default useBreakpoint;