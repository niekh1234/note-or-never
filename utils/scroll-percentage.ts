export const calculateScrollPercentage = (e: Event) => {
  const target = e.target as HTMLDivElement;
  const scrollTop = target.scrollTop;
  const containerHeight = target.scrollHeight - target.clientHeight;

  const scrollPercentage = scrollTop / containerHeight;

  return scrollPercentage;
};
