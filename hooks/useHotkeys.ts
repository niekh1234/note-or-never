import { useEffect, useState } from 'react';

const useHotkeys = () => {
  const [keysPressed, setKeysPressed] = useState<{ [key: string]: boolean }>({});

  const downHandler = (e: KeyboardEvent) => {
    setKeysPressed((old) => ({ [e.key]: true, ...old }));
  };

  const upHandler = (e: KeyboardEvent) => {
    setKeysPressed((old) => {
      const sCopyOld = { ...old };
      delete sCopyOld[e.key];
      return sCopyOld;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);

      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }
  }, []);

  return keysPressed;
};

export default useHotkeys;
