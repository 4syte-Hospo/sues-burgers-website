let lockCount = 0;
let savedScrollY = 0;

function isInsideMenuSheet(target: EventTarget | null): boolean {
  return target instanceof Node && Boolean(document.querySelector(".menu-item-sheet")?.contains(target));
}

function preventBackgroundTouchMove(event: TouchEvent) {
  if (isInsideMenuSheet(event.target)) return;
  event.preventDefault();
}

function holdScrollPosition() {
  window.scrollTo(0, savedScrollY);
}

export function lockMenuSheetScroll(): void {
  lockCount += 1;

  if (lockCount > 1) return;

  savedScrollY = window.scrollY;
  document.documentElement.classList.add("menu-sheet-open");
  window.addEventListener("scroll", holdScrollPosition, { passive: true });
  document.addEventListener("touchmove", preventBackgroundTouchMove, { passive: false });
}

export function unlockMenuSheetScroll(): void {
  if (lockCount === 0) return;

  lockCount -= 1;

  if (lockCount > 0) return;

  document.documentElement.classList.remove("menu-sheet-open");
  window.removeEventListener("scroll", holdScrollPosition);
  document.removeEventListener("touchmove", preventBackgroundTouchMove);
}

export function isMenuSheetScrollLocked(): boolean {
  return lockCount > 0;
}
