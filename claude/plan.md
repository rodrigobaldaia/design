# Portfolio Website — Full UX/UI Refactor

I want you to refactor my existing portfolio website into a more polished, visual, modern portfolio focused primarily on **UX/Product Design work**.

Before making any changes, **inspect the existing application thoroughly**. Understand the current architecture, pages, components, styling system, project data structure, available media assets, and existing functionality. Reuse existing components, content, and assets where appropriate rather than rebuilding things unnecessarily.

## First: ask questions

Before modifying any code, review the existing application and then ask me any questions you need answered.

Do **not** start implementing until I answer those questions.

If something is ambiguous but does not materially affect the implementation, make a sensible design decision and document it rather than blocking on clarification.

---

# Primary UX goal

The portfolio should communicate my work effectively within the first **10–20 seconds** of someone visiting the site.

The primary audience is **recruiters, hiring managers, and design professionals**, many of whom will access the portfolio from a mobile device.

The experience should therefore prioritize:

1. Quickly understanding who I am
2. Seeing the quality and breadth of my work
3. Recognizing the types of products/problems I work on
4. Quickly browsing projects without reading large amounts of text
5. Being able to inspect a project in more detail without leaving the main page
6. Easily continuing to browse after viewing a project

The website should feel like a **curated visual portfolio rather than a case-study index**.

---

# New landing page structure

Keep the main experience **scroll-based**.

The user should be able to understand and browse most of the portfolio simply by scrolling, without having to navigate through multiple pages.

Suggested information architecture:

### 1. Floating navigation/header

Use the current minimal floating header that remains accessible while scrolling.

Add Light/dark mode toggle and make adjustments as needed.

The header should feel lightweight and unobtrusive rather than like a traditional large navigation bar.

It should work particularly well on mobile.

---

### 2. Hero section

Create a visually distinctive hero section introducing me.

The hero should be minimal and contain very little text.

The typography/lettering should have a personal, expressive quality while still feeling sophisticated and restrained.

I want a visual language inspired by **Apple's product/marketing websites**:

* Large typography
* Strong hierarchy
* Generous whitespace
* Minimal UI
* High-quality imagery
* Smooth transitions
* Strong attention to spacing and composition

However, **do not simply copy Apple's visual identity**. The result should have a distinct personal character.

---

### 3. Project preview video

Before introducing the individual projects, add a **full-width visual project montage/video**.

This is an important part of the new experience.

The video should:

* Automatically play
* Be muted
* Loop continuously
* Work reliably on mobile
* Not require user interaction to start
* Show a rapid visual overview of the portfolio
* Cycle through images, videos, UI screens, animations, and other available project media
* Give each project/media asset only a brief moment on screen
* Feel like a polished visual montage rather than a conventional demo reel

The purpose is to give visitors an immediate visual understanding of the breadth and quality of my work before asking them to explore individual projects.

Use the existing media assets where possible.

If appropriate media is missing, create clearly identifiable placeholders rather than inventing misleading project content.

Consider:

* Responsive aspect ratios
* `object-fit`
* Mobile-specific cropping
* Lazy loading where appropriate
* Poster/fallback images
* Reduced-motion behavior
* Performance implications of autoplay video

---

# 4. Projects section

Redesign the project section to be **primarily visual**.

Do not show all project information upfront.

Each project should have a strong visual representation containing only the minimum necessary information, for example:

* Project name
* Product/company
* One strong visual/media element

Avoid large paragraphs, long descriptions, technology lists, or detailed case-study information in the main scrolling experience.

The projects should feel like individual visual compositions rather than conventional cards.

Explore layouts such as:

* Large editorial project blocks
* Full-width media
* Alternating image/text compositions
* Asymmetric layouts
* Large typography
* Different media scales
* Subtle transitions between projects

The overall composition should remain **minimal, balanced, and coherent**.

Do not make every project visually identical if variation can improve the editorial quality.

---

# 5. Project details via modal

Clicking/tapping a project should open a **modal/overlay containing the extended project information**.

The modal should contain the information that currently exists on the project:

* Project description
* My role
* Context
* Contributions
* Relevant details
* Images/videos
* External links
* Other useful project information already present in the current application

The modal should be:

* Easy to open
* Easy to close
* Fast
* Scrollable independently from the page
* Fully responsive
* Mobile-friendly
* Accessible
* Keyboard accessible on desktop
* Dismissible using Escape
* Dismissible by clicking/tapping outside where appropriate
* Equipped with a clearly visible close control

Most importantly:

**Closing a project modal should return the user to the same position in the portfolio.**

The visitor should be able to:

> Scroll → open project → explore details → close → immediately continue scrolling.

Do not force users to navigate back to another page.

If there are multiple projects, consider whether previous/next navigation inside the modal would improve the experience, but avoid adding unnecessary UI complexity.

---

# 6. About section

Leave as is.

---

# Visual direction

The overall visual design should be:

* Minimal
* Clean
* Monochromatic
* Sophisticated
* Editorial
* Spacious
* Mostly visual
* Typography-driven
* High contrast
* Calm rather than flashy

Use a restrained visual system.

Prioritize:

* White space
* Typography
* Scale
* Composition
* Image quality
* Subtle motion
* Strong visual hierarchy

Avoid:

* Excessive cards
* Excessive borders
* Unnecessary gradients
* Excessive shadows
* Too many colors
* Information-heavy layouts
* Generic SaaS dashboard aesthetics
* Excessive animations
* Visual clutter

The design should feel closer to a **high-end product/design portfolio or website** than a template-based portfolio.

---

# Light and dark mode

Add a light/dark mode toggle accessible from the main navigation.

Both themes should be intentionally designed rather than simply inverted.

The toggle should:

* Work across the entire site
* Persist the user's preference
* Transition smoothly without causing distracting flashes
* Work correctly inside modals

The monochromatic aesthetic should work particularly well in both modes.

---

# Motion and interaction

Use motion to improve the experience, not simply to demonstrate animation.

Potential interactions include:

* Subtle hero animations
* Project media transitions
* Scroll-based reveals
* Image scaling
* Typography transitions
* Modal entrance/exit animations
* Header behavior while scrolling
* Subtle hover states on desktop

Animations should feel **smooth, restrained, and intentional**.

Respect:

`prefers-reduced-motion`

Users who request reduced motion should receive an appropriate static/minimally animated experience.

Avoid scroll-jacking or animations that interfere with normal scrolling.

---

# Mobile-first requirements

Treat mobile as a **first-class design target**, not simply a responsive version of desktop.

The primary audience is likely to browse the portfolio on a phone.

Pay particular attention to:

* Navigation
* Typography scale
* Touch targets
* Modal behavior
* Video playback
* Image cropping
* Vertical spacing
* Scroll performance
* Loading performance
* Header size
* Project composition

Avoid relying on hover interactions.

Every important interaction must work naturally with touch.

The portfolio should feel intentionally designed for mobile rather than compressed from a desktop layout.

---

# Performance

Because this is a highly visual portfolio, performance is important.

Optimize:

* Images
* Videos
* Fonts
* Lazy loading
* Above-the-fold content
* Modal content
* Animation performance

Do not unnecessarily load every large project asset immediately.

The project montage/video should not make the initial page load excessively heavy.

Use appropriate responsive image sizes and modern formats where supported.

Avoid unnecessary JavaScript for interactions that can be implemented efficiently with CSS or lightweight React behavior.

---

# Accessibility

The refactor should maintain strong accessibility fundamentals.

Include:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Appropriate contrast
* Accessible buttons
* Accessible modal behavior
* Correct heading hierarchy
* Meaningful image alt text
* Reduced-motion support
* Touch-friendly controls

Do not sacrifice accessibility for visual effects.

---

# Technical requirements

Before implementation:

1. Inspect the existing project structure.
2. Identify the current framework and dependencies.
3. Identify how projects/content are currently represented.
4. Identify all existing image/video/media assets.
5. Identify reusable components.
6. Identify any existing responsive/design-system infrastructure.
7. Identify potential technical debt that could interfere with the redesign.

Then propose the implementation approach before making major architectural changes.

Prefer **incremental refactoring over unnecessary rewrites**.

Preserve existing functionality unless it conflicts with the new design.

Do not remove project information simply because it is not displayed on the landing page. Move it into the project modal where appropriate.

---

# Final experience

The ideal interaction should feel approximately like:

**Hero → visual project montage → project showcase → project modal → continue scrolling → About/contact**

The user should be able to browse the entire portfolio with minimal friction.

The experience should feel:

**visual first → curiosity → exploration → detail**


# Deliverables

After implementation:

1. Refactor the application.
2. Implement the new landing page.
3. Implement the floating navigation.
4. Implement light/dark mode.
5. Implement the project montage.
6. Redesign the project showcase.
7. Implement project detail modals.
9. Optimize the entire experience for mobile.
10. Ensure existing project content and media remain accessible.
11. Remove obsolete components/styles/routes only when they are genuinely no longer needed.
12. Test desktop and mobile layouts.
13. Test keyboard navigation and modal behavior.
14. Test light and dark modes.
17. Check for console errors and broken links.
18. Provide a concise summary of what was changed and any assumptions made.

## Acceptance criteria

The refactor is successful if:

* The landing page is significantly more visual and less information-dense.
* A visitor can understand who I am quickly.
* Projects can be browsed primarily by scrolling.
* Project details are hidden until requested.
* Opening and closing a project modal feels effortless.
* The user returns to the same scroll position after closing a modal.
* The project montage works automatically and reliably on mobile.
* Light/dark mode works consistently.
* The design feels minimal, monochromatic, spacious, and premium.
* The website feels personal rather than like a generic portfolio template.
* The experience works particularly well on mobile.
* Existing project content and important links are preserved.
* The site remains performant despite being highly visual.
* Accessibility is not compromised by the visual redesign.

**Important:** Before coding, inspect the existing implementation and ask me any questions necessary to make the redesign accurately reflect my existing content, assets, and technical setup.
