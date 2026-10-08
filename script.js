/* ==========================================================================
   Alex Goss | Site script
   Mobile menu and scroll-in reveal for the inner pages.
   Works with the rewritten pages and styles.css (.nav-links.open, .reveal).
   ========================================================================== */

(function () {
  'use strict';

  // ---------- Mobile menu ----------
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.getElementById('nav-links') || document.querySelector('.nav-links');
  var MOBILE_BREAKPOINT = 820;

  function setMenu(open) {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  function isMenuOpen() {
    return navLinks && navLinks.classList.contains('open');
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      setMenu(!isMenuOpen());
    });

    // Close the menu when a link is chosen
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    // Escape closes the menu and returns focus to the toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen()) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Reset the menu if the window grows past the mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > MOBILE_BREAKPOINT && isMenuOpen()) {
        setMenu(false);
      }
    });
  }

  // ---------- Scroll-in reveal ----------
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );

      revealEls.forEach(function (el) { observer.observe(el); });
    } else {
      // Older browsers: show everything straight away
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }
  }
})();