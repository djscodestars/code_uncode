## Next.js Parallax Effect With Gsap ScrollTrigger

Repository of the [YouTube video](https://youtu.be/alGnk3iMaYE) on how to make a parallax effect using Next.js and Gsap ScrollTrigger.

## Stack used

- Next.js
- Gsap ScrollTrigger
- CSS

PrizesSection.module.css → .podium — Still defined in CSS but the div is now removed. Safe to delete the class.
Footer.tsx → .snorlax CSS class — Footer.module.css still has a separate .snorlax class; the image element already inherits from the container.
AboutPokedex.module.css → Mobile modal styles (.mobileModalOverlay, .mobileModal, .modalHeader, .closeButton, .modalStats, etc.) — the mobile modal was removed from the TSX but these ~80 lines of CSS remain.
LiveRegi.module.css → Commented-out @keyframes titleGlow and section::before block — dead code left in comments (~20 lines).
Parallax.module.css — Several commented-out blocks from previous iterations that are no longer used.
ProfessorOakIntro.tsx — Worth checking if it's still used after the intro flow was finalized; if not, can be removed.
Timeline.tsx — getThemeColors() returns a rgb string that's set as a CSS variable --theme-rgb but is never used in the CSS (only --theme-color is used).