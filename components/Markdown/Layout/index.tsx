import useIsMobile from 'hooks/useIsMobile';
import DesktopMarkdownLayout from './Desktop';
import MobileMarkdownLayout from './Mobile';

const MarkdownLayout = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileMarkdownLayout></MobileMarkdownLayout>;
  }

  return <DesktopMarkdownLayout></DesktopMarkdownLayout>;
};

export default MarkdownLayout;
