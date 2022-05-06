import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkIfMobile = (e: UIEvent) => {
    setIsMobile(() => window.innerWidth <= 768);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkIfMobile);
    }

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
