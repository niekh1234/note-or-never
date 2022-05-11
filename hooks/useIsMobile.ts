import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true);

  const checkIfMobile = () => {
    setIsMobile(() => window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', checkIfMobile);

    setIsMobile(() => window.innerWidth <= 768);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
