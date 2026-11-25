# EdBytes Milestone 2 — Completion Report

## Required Check 1: About
The personal introduction for **Nijju** (`Full Stack Developer | Student Developer`, *EdBytes — Full Stack Development Internship*) appears immediately on initial load inside the visible `<section aria-labelledby="about-heading">` card within the fixed studio dock (`#edbytesDock`) on both desktop (`> 820px`) and mobile (`<= 820px`) without requiring document scrolling. It is also accessible from the `contacts` dialog in the fixed navigation bar. Fictional Haldoren branding is visually separated inside the hanging lanyard pass prop.

## Required Check 2: Project Card
The required featured project card is rendered inside `<section aria-labelledby="project-heading">` (`<article class="card">`) directly beneath the About section on both desktop and mobile Hero views (and inside the `discuss a project` dialog):
- **Title:** InternBoard — Internship Listing Platform
- **Description:** Responsive internship listing platform with search, filtering, details, and application submission demonstrating frontend development and backend API integration.
- **Technologies:** HTML, CSS, JavaScript, Node.js, Express.js, SQLite
- **GitHub Repository:** https://github.com/nijjukrr/EDVYRO--RESPONSIVE-Internship-
- **Live Static Frontend Demo:** https://nijjukrr.github.io/EDVYRO--RESPONSIVE-Internship-/
- **Backend Distinction:** Explicitly notes that GitHub Pages serves the static frontend demo while the Node.js/Express.js/SQLite backend runs locally from the repository.

## Required Check 3: Responsive Design
Tested in headless Google Chrome across 10 viewport sizes in both Hero and Case modes:
- `360×740` (Mobile boundary): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `375×812` (Mobile): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `390×844` (Mobile): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `430×932` (Large Mobile): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `768×1024` (Tablet Portrait): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `820×1180` (Breakpoint edge): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `1024×768` (Small Desktop): PASS — `overflowX: false`, unclipped nav/dock/ticket, laptop visible.
- `1280×720` (Laptop HD): PASS — `overflowX: false`, unclipped nav/dock/ticket, laptop visible.
- `1440×900` (Desktop): PASS — `overflowX: false`, unclipped nav/dock/ticket, laptop visible.
- `1920×1080` (Full HD): PASS — `overflowX: false`, unclipped nav/dock/ticket, laptop visible.

## Required Check 4: Publication and Evidence
- **Source Repository:** https://github.com/nijjukrr/EDBYTES.git (branch: `main`)
- **Starter Backup:** Original 8 starter files from `task-fsd-01-beginner-20261028.zip` preserved untouched in `starter-backup/`.
- **Live URL:** Pending GitHub Pages enablement/verification (not claimed until verified live).
- **Evidence Screenshots:**
  - `docs/evidence/portfolio-desktop.png`
  - `docs/evidence/portfolio-mobile.png`
  - `docs/evidence/hero-desktop.png`
  - `docs/evidence/case-desktop.png`
  - `docs/evidence/hero-mobile.png`
  - `docs/evidence/case-mobile.png`

## Ordinary Test
Opened `index.html` over local HTTP in headless Google Chrome at `1440×900`. Verified zero console/page errors, all supplied images loaded (`heroPlate`, `cutout`, `badge`, `casePlate`), entrance animations completed to full opacity, **About (Nijju)** and **InternBoard** cards were visible and readable with active links, and diving into the laptop transitioned cleanly through all 3 case videos (`01 / 03` -> `02 / 03` -> `03 / 03` -> wrap `01 / 03`) and back to the studio hero.

## Boundary Test
1. **Narrow viewport (`360×740`):** Verified zero horizontal overflow (`scrollWidth <= innerWidth`), zero clipped navigation buttons, unclipped mobile ticket card, and accessible `Live Demo` / `GitHub Repo` links.
2. **Blocked external media (`images.higgs.ai` and `.mp4` aborted):** Verified `.stage.hero-img-failed` fallback kept the studio gradient and About/InternBoard cards readable (`navOpacity: 1`), transitioning to case mode displayed `.case-video-fallback` without locking `busy`, and returning to hero worked normally.
3. **Reduced motion (`prefers-reduced-motion: reduce`):** Verified immediate reveal (`navOpacity: 1`, `wordmarkOpacity: 1`) and fast case transition (`65ms`).

## Learning Observation
*(Draft prepared from implementation observations — review and personalize if desired before final submission.)*

Combining a fixed-viewport `1440 × 810` photographic motion composition with real portfolio requirements taught me that decorative transitions must never trap or hide core content. Visual screenshot inspection caught subtle issues (such as a scroll hint remaining visible in case mode and badge/script overlap) that DOM bounds checks alone missed, reinforcing why inspecting actual rendered screenshots across mobile and desktop widths is essential.
