# Viva Voce React header

Built from the five supplied JSX exports and Figma references. Uses the supplied local photographs, Sharp Earth and GT Alpina fonts, and original Figma logo/icons.

## Run

```sh
npm install
npm run dev
```

`npm run build` generates `dist/`. `npm run preview` previews the production build.

## Components

- `src/VivaVoceHeader.jsx`: standalone responsive header with five mega menus, hover/click disclosure, Escape/outside-click dismissal, arrow-key navigation, search, and small-screen accordion navigation.
- `src/menuData.js`: menu labels, cards, stories, and default route generation.
- `src/header.css`: plain CSS and local font declarations.
- `src/main.jsx`: minimal preview. Clothing is initially expanded to match the reference. Same-origin links show a destination placeholder; replace this preview with your store app.

Use `<VivaVoceHeader />` for an initially closed header, or pass `initialMenu="Clothing"`. Use `getHref(label, section)` to map menu links to your real routes, and `onNavigate(label)` for optional integration. Utility links use conventional store paths; the search form submits `q` to `/search`. Commerce, account, and search-result pages are outside this header component.

Breakpoints: large desktop >=1280px, compact desktop 1024–1279px, small <1024px. The supplied exports describe desktop layouts; the small accordion layout is an adaptation. At 1280–1399px desktop spacing tightens to retain the full menu without overflow.

Source wording is preserved, including the dresses size label “6X - 6X” and accessories card caption “Linen Looks”. Change these in `menuData.js` if desired.
