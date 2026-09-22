import { FlaskConical, Loader2, WifiOff } from "lucide-react";
import { STATE_CONFIGS, type OrderStateKey } from "../data/orderData";

interface StateSwitcherProps {
  value: OrderStateKey;
  onChange: (key: OrderStateKey) => void;
  onPreviewLoading: () => void;
  onPreviewError: () => void;
}

const ORDER: OrderStateKey[] = ["delayed", "not-received", "unavailable", "out-for-delivery"];

export default function StateSwitcher({
  value,
  onChange,
  onPreviewLoading,
  onPreviewError,
}: StateSwitcherProps) {
  return (
    <section className="demo-bar" aria-label="Preview order state">
      <div className="demo-bar-head">
        <span className="demo-dot" aria-hidden="true" />
        <strong>Preview state</strong>
        <span>Demo control</span>
      </div>
      <div className="seg" role="group" aria-label="Order states">
        {ORDER.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={value === key}
            onClick={() => onChange(key)}
          >
            {STATE_CONFIGS[key].switchLabel}
          </button>
        ))}
      </div>
      <div className="demo-tools">
        <button type="button" className="chip-btn" onClick={onPreviewLoading}>
          <Loader2 size={14} aria-hidden="true" />
          Preview loading
        </button>
        <button type="button" className="chip-btn" onClick={onPreviewError}>
          <WifiOff size={14} aria-hidden="true" />
          Preview error
        </button>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "var(--faint)",
          }}
        >
          <FlaskConical size={14} aria-hidden="true" />
          Same screen, adaptive content
        </span>
      </div>
    </section>
  );
}
