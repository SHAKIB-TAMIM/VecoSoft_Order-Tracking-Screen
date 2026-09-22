# Order Tracking Screen

A polished, mobile-first e-commerce order tracking experience built with React, TypeScript, and Vite. One reusable tracking screen adapts its status messaging, timeline, ETA, alerts, and actions across delayed, delivered-but-not-received, and tracking-unavailable order states.

## Features

- Responsive mobile-first order tracking (360–430px primary, graceful desktop layout)
- Visual delivery timeline (Processing → Shipped → Out for Delivery → Delivered)
- Delayed order state with original vs. updated estimate
- Delivered-but-not-received state with troubleshooting and report flow
- Tracking-unavailable waiting state (no fabricated events)
- Skeleton loading state and retryable error state
- Expandable order details bottom sheet
- Support sheet (chat / call / help centre)
- Delivery issue reporting with confirmation feedback
- Realistic mock/static data — no backend required

## Tech Stack

- React 19
- TypeScript
- Vite
- Lucide React (icons)
- Plain CSS (mobile-first design system, no UI framework)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Assessment Notes

The app uses mock/static data (`src/data/orderData.ts`) because backend integration is not required for this assessment. Support, reporting, and retry interactions are fully interactive at the UI level with realistic confirmation states. Use the "Preview state" control at the top of the screen to inspect each required order state.
