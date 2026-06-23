let lockCount = 0;

export function lockMenuSheetScroll(): void {
  lockCount += 1;

  if (lockCount > 1) return;

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
}

export function unlockMenuSheetScroll(): void {
  if (lockCount === 0) return;

  lockCount -= 1;

  if (lockCount > 0) return;

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
}

export function isMenuSheetScrollLocked(): boolean {
  return lockCount > 0;
}
