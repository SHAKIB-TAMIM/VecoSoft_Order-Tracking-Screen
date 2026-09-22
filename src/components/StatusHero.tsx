import {
  AlertTriangle,
  CalendarClock,
  CircleAlert,
  Clock3,
  PackageSearch,
  Truck,
} from "lucide-react";
import type { OrderStateConfig } from "../data/orderData";

const HERO_ICON = {
  active: Truck,
  delayed: Clock3,
  issue: CircleAlert,
  waiting: PackageSearch,
} as const;

const ALERT_ICON = {
  warning: AlertTriangle,
  danger: CircleAlert,
  info: Truck,
  neutral: PackageSearch,
} as const;

export default function StatusHero({ config }: { config: OrderStateConfig }) {
  const HeroIcon = HERO_ICON[config.heroTone];
  const AlertIcon = config.alert ? ALERT_ICON[config.alert.tone] : null;

  return (
    <div>
      <section
        className={`hero hero--${config.heroTone}`}
        aria-live="polite"
        aria-label={`Current status: ${config.heroTitle}`}
      >
        <div className="hero-top">
          <div className="hero-icon" aria-hidden="true">
            <HeroIcon size={24} />
          </div>
          <div className="hero-copy">
            <span className={`badge badge--${config.badgeTone}`}>
              <span className="pulse" aria-hidden="true" />
              {config.badgeText}
            </span>
            <h2>{config.heroTitle}</h2>
            <p>{config.heroDescription}</p>
          </div>
        </div>

        <div className="eta-split" aria-label="Delivery estimates">
          {config.etaRows.map((row) => (
            <div key={row.label} className={`eta-row ${row.tone}`}>
              <div className="hero-eta-icon" aria-hidden="true">
                <CalendarClock size={18} />
              </div>
              <div style={{ minWidth: 0 }}>
                <small>{row.label}</small>
                <strong>{row.value}</strong>
                {row.sub ? (
                  <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{row.sub}</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {config.alert && AlertIcon ? (
        <div className={`alert alert--${config.alert.tone}`} role="status">
          <AlertIcon size={18} aria-hidden="true" />
          <div style={{ minWidth: 0 }}>
            <strong>{config.alert.title}</strong>
            <p>{config.alert.body}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
