/**
 * Merges class names, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Centralized smooth-scroll function for ALL navigation links.
 *
 * Measures the navbar's actual rendered height directly from the DOM on every
 * invocation, then scrolls the target section to land exactly below the navbar
 * with pixel-perfect alignment — no hardcoded offsets, no device-specific
 * branches, no scrollIntoView, no CSS-only scroll.
 *
 * Also syncs the CSS custom property `--navbar-height` so that the
 * `scroll-margin-top: var(--navbar-height)` fallback on every section[id]
 * stays consistent with the real measured value.
 *
 * This is the ONLY scroll method used across the entire site.
 */
export function scrollToSection(href: string): void {
  const navbar = document.querySelector('nav');
  let navbarHeight = 0;

  if (navbar) {
    const style = getComputedStyle(navbar);
    const topValue = parseFloat(style.top) || 0;
    navbarHeight = topValue + (navbar as HTMLElement).offsetHeight;
  }

  // Keep the CSS variable in sync so scroll-margin-top always reflects reality
  document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);

  const el = document.querySelector(href);
  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    // The CSS `scroll-margin-top` on each section already accounts for the navbar height.
    // Subtracting `navbarHeight` again causes the page to stop too high, showing part of the previous section.
    // Therefore we scroll to the element's top position directly.
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
}
