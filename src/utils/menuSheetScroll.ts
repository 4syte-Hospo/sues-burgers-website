let lockedScrollY = 0;

export function lockMenuSheetScroll(): number {
  lockedScrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  return lockedScrollY;
}

export function unlockMenuSheetScroll(scrollY: number = lockedScrollY) {
  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  html.scrollTop = scrollY;
  document.body.scrollTop = scrollY;
  window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });

  html.style.scrollBehavior = previousBehavior;
}

export function isMenuSheetScrollLocked(): boolean {
  return document.body.style.position === "fixed";
}
