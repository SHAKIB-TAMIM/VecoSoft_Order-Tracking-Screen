export type OrderStateKey =
  | "delayed"
  | "not-received"
  | "unavailable"
  | "out-for-delivery";

export type HeroTone = "active" | "delayed" | "issue" | "waiting";

export interface TimelineEvent {
  text: string;
  time: string;
}

export interface TimelineStage {
  id: string;
  label: string;
  /** completed | current | upcoming — resolved per state */
  state: "completed" | "current" | "upcoming";
  /** visual emphasis: normal | delayed | attention */
  emphasis?: "normal" | "delayed" | "attention";
  timestamp?: string;
  description?: string;
  events?: TimelineEvent[];
}

export interface EtaRow {
  label: string;
  value: string;
  sub?: string;
  tone: "struck" | "fresh" | "neutral";
}

export interface OrderStateConfig {
  key: OrderStateKey;
  switchLabel: string;
  badgeText: string;
  badgeTone: "brand" | "warning" | "danger" | "neutral" | "success";
  heroTone: HeroTone;
  heroTitle: string;
  heroDescription: string;
  etaRows: EtaRow[];
  alert?: {
    tone: "warning" | "danger" | "info" | "neutral";
    title: string;
    body: string;
  };
  timeline: TimelineStage[];
  timelineCaption?: string;
  latestUpdate?: { title: string; detail: string };
  showWaitingVisual?: boolean;
}

export const ORDER = {
  id: "#ORD-48291",
  date: "Sep 20, 2026",
  productName: "Everyday Essential Sneakers",
  variant: "Black / Size 42",
  qty: 1,
  price: "৳4,990",
  subtotal: "৳4,990",
  shipping: "Free",
  total: "৳4,990",
  address: "House 12, Road 5, Dhanmondi, Dhaka 1205",
  recipient: "Tanvir Hasan · 01XXXXXXXXX",
  payment: "bKash · •••• 4521",
  deliveryMethod: "Standard delivery · Pathao Courier",
};

export const STATE_CONFIGS: Record<OrderStateKey, OrderStateConfig> = {
  delayed: {
    key: "delayed",
    switchLabel: "Delayed",
    badgeText: "Delayed",
    badgeTone: "warning",
    heroTone: "delayed",
    heroTitle: "Delivery delayed",
    heroDescription:
      "Your order is taking a little longer than expected — but it's still on its way and being actively handled.",
    etaRows: [
      {
        label: "Originally expected",
        value: "Tuesday, Sep 22",
        sub: "by 8:00 PM",
        tone: "struck",
      },
      {
        label: "Updated estimate",
        value: "Wednesday, Sep 24",
        sub: "Expected by 8:00 PM",
        tone: "fresh",
      },
    ],
    alert: {
      tone: "warning",
      title: "Still in transit — no action needed yet",
      body: "The courier flagged heavy load at the Dhaka hub. If it hasn't arrived by Sep 24, report it and we'll prioritise your case.",
    },
    timeline: [
      {
        id: "processing",
        label: "Processing",
        state: "completed",
        timestamp: "Sep 20 · 2:14 PM",
        description: "Order confirmed and packed at the fulfilment centre.",
      },
      {
        id: "shipped",
        label: "Shipped",
        state: "completed",
        timestamp: "Sep 21 · 9:05 AM",
        description: "Handed to Pathao Courier · Tracking PT-88410293",
        events: [
          { text: "Arrived at Dhaka sorting facility", time: "Sep 21 · 6:40 PM" },
          { text: "Departed from Dhaka sorting facility", time: "Today · 10:42 AM" },
        ],
      },
      {
        id: "out",
        label: "Out for delivery",
        state: "current",
        emphasis: "delayed",
        timestamp: "Delayed · last scan Today, 10:42 AM",
        description:
          "The van left the hub later than planned. Your package is next in the Dhanmondi queue.",
      },
      {
        id: "delivered",
        label: "Delivered",
        state: "upcoming",
        description: "You'll sign or confirm on arrival.",
      },
    ],
    latestUpdate: {
      title: "Departed from Dhaka sorting facility",
      detail: "Today, 10:42 AM · Package is still in transit to Dhanmondi",
    },
    timelineCaption: "2 of 4 steps complete · held at out for delivery",
  },

  "not-received": {
    key: "not-received",
    switchLabel: "Not received",
    badgeText: "Delivery issue",
    badgeTone: "danger",
    heroTone: "issue",
    heroTitle: "Marked as delivered",
    heroDescription:
      "Our records show this order was delivered — but you reported you haven't received it. Let's get this sorted quickly.",
    etaRows: [
      {
        label: "Marked delivered",
        value: "Tuesday, Sep 22 · 2:15 PM",
        sub: "Left at front door · Dhanmondi",
        tone: "fresh",
      },
      {
        label: "You reported",
        value: "Not received",
        sub: "Report filed Today · 9:20 AM",
        tone: "neutral",
      },
    ],
    alert: {
      tone: "danger",
      title: "We hear you — this doesn't look right",
      body: "Your report is logged. Most missing packages turn up within 24 hours after checking the usual spots below.",
    },
    timeline: [
      {
        id: "processing",
        label: "Processing",
        state: "completed",
        timestamp: "Sep 20 · 2:14 PM",
        description: "Order confirmed and packed.",
      },
      {
        id: "shipped",
        label: "Shipped",
        state: "completed",
        timestamp: "Sep 21 · 9:05 AM",
        description: "Handed to Pathao Courier · Tracking PT-88410293",
      },
      {
        id: "out",
        label: "Out for delivery",
        state: "completed",
        timestamp: "Sep 22 · 11:48 AM",
        description: "Courier reached Dhanmondi with your package.",
      },
      {
        id: "delivered",
        label: "Delivered",
        state: "completed",
        emphasis: "attention",
        timestamp: "Sep 22 · 2:15 PM",
        description: "Marked delivered · Left at front door. You flagged this as not received.",
      },
    ],
    latestUpdate: {
      title: "Delivery photo & note: “Left at front door”",
      detail: "Sep 22, 2:15 PM · Reported missing Today, 9:20 AM",
    },
    timelineCaption: "All steps complete · delivery under review",
  },

  unavailable: {
    key: "unavailable",
    switchLabel: "No tracking",
    badgeText: "Awaiting carrier",
    badgeTone: "neutral",
    heroTone: "waiting",
    heroTitle: "Tracking isn't available yet",
    heroDescription:
      "Your order is confirmed and being prepared. Tracking will appear here as soon as the carrier picks up your package.",
    etaRows: [
      {
        label: "Tracking expected",
        value: "Within 24 hours",
        sub: "Usually appears the evening after packing",
        tone: "neutral",
      },
      {
        label: "Estimated delivery",
        value: "Thursday, Sep 24",
        sub: "Standard delivery · 3–4 days",
        tone: "neutral",
      },
    ],
    alert: {
      tone: "neutral",
      title: "Nothing is wrong with your order",
      body: "Sellers typically hand packages to the courier within a day. We'll notify you the moment tracking goes live.",
    },
    timeline: [],
    showWaitingVisual: true,
  },

  "out-for-delivery": {
    key: "out-for-delivery",
    switchLabel: "On the way",
    badgeText: "Out for delivery",
    badgeTone: "brand",
    heroTone: "active",
    heroTitle: "Out for delivery",
    heroDescription:
      "Your package is on its way and should arrive today. Keep your phone nearby — the courier may call.",
    etaRows: [
      {
        label: "Estimated delivery",
        value: "Today, Sep 22",
        sub: "Expected by 8:00 PM",
        tone: "neutral",
      },
    ],
    alert: {
      tone: "info",
      title: "Courier is in your area",
      body: "Stop 4 of 9 · Dhanmondi route. Make sure someone is available to receive the package.",
    },
    timeline: [
      {
        id: "processing",
        label: "Processing",
        state: "completed",
        timestamp: "Sep 20 · 2:14 PM",
        description: "Order confirmed and packed.",
      },
      {
        id: "shipped",
        label: "Shipped",
        state: "completed",
        timestamp: "Sep 21 · 9:05 AM",
        description: "Handed to Pathao Courier · Tracking PT-88410293",
        events: [
          { text: "Arrived at Dhaka sorting facility", time: "Sep 21 · 6:40 PM" },
          { text: "Loaded onto delivery van", time: "Today · 8:15 AM" },
        ],
      },
      {
        id: "out",
        label: "Out for delivery",
        state: "current",
        timestamp: "Today · 8:15 AM",
        description: "Courier is on the Dhanmondi route with your package.",
      },
      {
        id: "delivered",
        label: "Delivered",
        state: "upcoming",
        description: "You'll sign or confirm on arrival.",
      },
    ],
    latestUpdate: {
      title: "Loaded onto delivery van · Dhanmondi route",
      detail: "Today, 8:15 AM · Stop 4 of 9",
    },
    timelineCaption: "3 of 4 steps complete · arriving today",
  },
};

export const ISSUE_OPTIONS = [
  {
    id: "not-received",
    title: "Package not received",
    hint: "Marked delivered but nothing arrived",
  },
  {
    id: "damaged",
    title: "Package arrived damaged",
    hint: "Box, seal or product is broken",
  },
  {
    id: "wrong-item",
    title: "Wrong item received",
    hint: "Size, colour or product mismatch",
  },
  {
    id: "info-wrong",
    title: "Delivery information is incorrect",
    hint: "Address, time or tracking looks wrong",
  },
];

export const TROUBLESHOOT_STEPS = [
  "Check around your door, gate and with the building guard",
  "Ask household members or neighbours if they accepted it",
  "Look for a courier slip, SMS or delivery photo",
];
