/**
 * Theme Switcher for stoll.studio
 *
 * Reads ?theme=themeName from URL and applies the theme to the page.
 * Default theme is "default" if no parameter is present.
 *
 * Usage:
 * - ?theme=default (or no parameter) - Default theme
 * - ?theme=dark - Dark theme (when created)
 * - ?theme=yourtheme - Any custom theme you create
 */

(function() {
  'use strict';

  /**
   * Get the theme name from URL parameter
   * @returns {string|null} Theme name or null if not present
   */
  function getThemeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('theme');
  }

  /**
   * Apply theme to the document
   * @param {string} themeName - Name of the theme to apply
   */
  function applyTheme(themeName) {
    const html = document.documentElement;

    // Check if theme is already applied (by critical inline script)
    const currentTheme = html.getAttribute('data-theme');
    const targetTheme = (themeName && themeName !== 'default') ? themeName : null;

    // Only update if needed
    if (currentTheme !== targetTheme) {
      if (targetTheme) {
        html.setAttribute('data-theme', targetTheme);
        console.log('Theme applied:', targetTheme);
      } else {
        if (html.hasAttribute('data-theme')) {
          html.removeAttribute('data-theme');
        }
        console.log('Theme applied: default');
      }
    } else {
      console.log('Theme already applied:', targetTheme || 'default');
    }

    // Update theme-color meta tag if present
    updateThemeColorMeta(themeName);
  }

  /**
   * Update the theme-color meta tag based on the current theme
   * @param {string} themeName - Name of the current theme
   */
  function updateThemeColorMeta(themeName) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) return;

    // Get the computed style of the sticky bar to extract its background color
    // This ensures the browser chrome matches the theme
    const bar = document.querySelector('.bar');
    if (bar) {
      const computedStyle = window.getComputedStyle(bar);
      const bgColor = computedStyle.backgroundColor;

      // Convert rgb to hex for meta tag (optional, but cleaner)
      const hexColor = rgbToHex(bgColor);
      metaThemeColor.setAttribute('content', hexColor || '#ffff00');
    }
  }

  /**
   * Convert RGB color to hex
   * @param {string} rgb - RGB color string (e.g., "rgb(255, 255, 0)")
   * @returns {string|null} Hex color (e.g., "#ffff00") or null
   */
  function rgbToHex(rgb) {
    // Handle rgba or rgb format
    const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
    if (!match) return null;

    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);

    return '#' + [r, g, b]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Add theme parameter to all internal links
   */
  function updateLinksWithTheme() {
    const themeName = getThemeFromURL();
    if (!themeName || themeName === 'default') return;

    // Get all internal links (relative URLs and same-origin absolute URLs)
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
      const href = link.getAttribute('href');

      // Skip if:
      // - External link (starts with http/https and different origin)
      // - Anchor link (starts with #)
      // - Already has theme parameter
      // - Special protocols (mailto:, tel:, etc.)
      if (!href ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.includes('?theme=')) {
        return;
      }

      // Check if it's an external link
      try {
        const linkURL = new URL(href, window.location.origin);
        if (linkURL.origin !== window.location.origin) {
          return; // Skip external links
        }
      } catch (e) {
        // If URL parsing fails, assume it's a relative link (safe to add theme)
      }

      // Add theme parameter to the link
      const separator = href.includes('?') ? '&' : '?';
      link.setAttribute('href', href + separator + 'theme=' + themeName);
    });
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    const themeName = getThemeFromURL();
    applyTheme(themeName || 'default');

    // Update all links to include theme parameter
    updateLinksWithTheme();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    // DOM already loaded
    initTheme();
  }

  // Optional: Listen for URL changes (if using client-side routing)
  window.addEventListener('popstate', initTheme);

})();
