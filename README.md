# 3D Workspace Builder

Design a home office in 3D. Pick a desk and chair, add accessories (monitor, laptop, lamp, plant, coffee machine…), preview each option live before choosing it, and see the running weekly rental price.

Built with Next.js 16 (App Router), React 19, [react-three-fiber](https://r3f.docs.pmnd.rs/) + [drei](https://drei.docs.pmnd.rs/), three.js, Zustand and Tailwind CSS 4.

## Getting started

This project uses [bun](https://bun.sh).

```bash
bun install
bun dev          # http://localhost:3000
```

| Script           | What it does                           |
| ---------------- | -------------------------------------- |
| `bun dev`        | Start the dev server                   |
| `bun run build`  | Production build                       |
| `bun start`      | Serve the production build             |
| `bun run lint`   | ESLint                                 |
| `bun run format` | Prettier (with Tailwind class sorting) |

## How it works

- **Scene:** `components/builder/Workspace3D.jsx` sets up the canvas, lights, `OrbitControls` and `CameraController`. The camera tweens to a view whenever the store's `camera.requestId` changes.
- **Interaction:** hovering a piece of furniture shows **Replace** and **Remove** buttons (`FurnitureControl`). An empty slot shows a `+` marker (`EmptyFurnitureSlot`). Either one opens the side panel (`FurniturePanel`). Hovering or focusing an item in the panel previews it in the scene.
- **Checkout:** a small cart button in the top-right corner (with an item count) opens the checkout drawer (`CheckoutSidebar`; full screen on phones), which lists the setup by area with Change/Remove, every empty spot (keyboard access to the in-scene "+" markers), a rental-length stepper (1–52 weeks), the estimated total, and a button that copies a plain-text order summary (there is no backend; the order is placed with monis.rent directly). The marketplace panel (`FurniturePanel`) opens over the scene from the left.
- **State:** `store/useWorkspaceStore.js` holds `selections[category]`, the panel state, the preview item and camera requests.

### Data

Everything is modelled at real size: the room is 3 m wide, so 1 scene unit = 37.5 cm (`cm()` in `data/units.js`). Prices were taken from monis.rent (Bali) on 2026-09-28 and won't update automatically. Product photos (`image`) are loaded from monis.rent's image server (`strapi.monis.rent`, allowed in `next.config.mjs`) through `next/image`; they belong to monis.rent.

| File                                    | Contents                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `data/furniture.js`                     | The catalogue: real monis.rent products (id = monis.rent slug), weekly USD prices, `surfaceHeight` for desks. |
| `data/categories.js`                    | Every category: label, zone, world position/rotation, button and `+` marker positions, camera view.           |
| `components/builder/furniture/index.js` | Maps each catalogue id to its 3D model component.                                                             |

Categories in the `"desk"` zone keep the camera where it is. Categories in any other zone (`"back"`, `"floor"`) fly the camera to their view while the panel is open. Each key in `CATEGORIES` is a slot. Every slot on the desktop (`onDesk: true`) offers the desk accessories (laptop, keyboard, mouse, lamp, speaker, computer); monitors can only go in the three `monitorSlot` slots along the back; other slots offer their own category, or the list in `itemCategories`. `itemRotations` overrides a slot's rotation for one category, such as the lamp in the left corner. Replace/remove button positions depend on the model, so they live in `BUTTON_POSITIONS`, keyed by catalogue category. Categories with `onDesk: true` sit on the selected desk's surface and are hidden (and removed) when there's no desk.

## Adding furniture

**A new option in an existing category** (e.g. a second monitor):

1. Add an entry to `data/furniture.js`.
2. Create the model in `components/builder/furniture/` and register it in `furniture/index.js` under the same id.

**A new category:** also add an entry to `data/categories.js`. The store, scene, `+` markers and summary all pick it up automatically.
