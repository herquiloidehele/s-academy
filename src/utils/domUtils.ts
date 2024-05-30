export function getPageScrollPosition() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

export function scrollPosition(contentRef: HTMLElement) {
  const containerHeight = contentRef.clientHeight;
  const scrollHeight = contentRef.scrollHeight;
  const scrollTop = contentRef.scrollTop;
  const hasScroll = scrollHeight > containerHeight;

  return {
    isTop: hasScroll && scrollTop <= 0,
    isBetween: hasScroll && scrollTop > 0 && containerHeight < scrollHeight - scrollTop,
    isBottom: hasScroll && containerHeight >= scrollHeight - scrollTop,
  };
}
