import { CheckCircle2, Flag, Headset } from "lucide-react";
import { TROUBLESHOOT_STEPS, type OrderStateKey } from "../data/orderData";

interface HelpActionsProps {
  stateKey: OrderStateKey;
  onSupport: () => void;
  onReport: () => void;
  onDetails: () => void;
}

export default function HelpActions({ stateKey, onSupport, onReport, onDetails }: HelpActionsProps) {
  const showTroubleshoot = stateKey === "not-received";

  return (
    <div>
      {showTroubleshoot ? (
        <section className="card" aria-label="What to check first">
          <h2 className="card-title">What to check first</h2>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--muted)" }}>
            These resolve most “marked delivered” cases:
          </p>
          <ul className="check-list">
            {TROUBLESHOOT_STEPS.map((step) => (
              <li key={step}>
                <CheckCircle2 size={17} aria-hidden="true" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <div className="btn-stack">
            <button type="button" className="btn btn-danger" onClick={onReport}>
              <Flag size={17} aria-hidden="true" />
              Report missing package
            </button>
            <button type="button" className="btn btn-ghost" onClick={onSupport}>
              <Headset size={17} aria-hidden="true" />
              Contact support
            </button>
          </div>
        </section>
      ) : (
        <section className="card" aria-label="Need help">
          <h2 className="card-title">Need help with this order?</h2>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--muted)" }}>
            {stateKey === "delayed"
              ? "Our team can check the van status or escalate if Sep 24 passes."
              : stateKey === "unavailable"
                ? "Questions about packing or when tracking appears? We're here."
                : "Live help from 9 AM – 11 PM, 7 days a week."}
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-ghost" onClick={onSupport}>
              <Headset size={17} aria-hidden="true" />
              Get help
            </button>
            <button type="button" className="btn btn-soft" onClick={onReport}>
              <Flag size={17} aria-hidden="true" />
              Report issue
            </button>
          </div>
        </section>
      )}

      <button type="button" className="link-btn" onClick={onDetails} aria-label="View full order details">
        View order details →
      </button>
    </div>
  );
}
