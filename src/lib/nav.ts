export function scrollToSection(selector: string, offset: number = 74) {
  if (selector === '#' || selector === '#hero' || selector === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.querySelector(selector);
  if (!el) return;
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = Math.max(0, elementPosition - offset);
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}
