import { WifiOff } from "lucide-react";

export function LoadingState() {
  return (
    <div aria-label="Loading tracking information" aria-busy="true">
      <div className="card" aria-hidden="true">
        <div className="skel" style={{ width: 130, height: 14 }} />
        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          <div className="skel" style={{ width: 76, height: 76, borderRadius: 18 }} />
          <div style={{ flex: 1 }}>
            <div className="skel" style={{ height: 16, width: "80%" }} />
            <div className="skel" style={{ height: 12, width: "55%", marginTop: 8 }} />
            <div className="skel" style={{ height: 12, width: "40%", marginTop: 8 }} />
          </div>
        </div>
      </div>
      <div className="card" aria-hidden="true">
        <div className="skel" style={{ width: 90, height: 24, borderRadius: 999 }} />
        <div className="skel" style={{ height: 24, width: "70%", marginTop: 12 }} />
        <div className="skel" style={{ height: 14, width: "95%", marginTop: 10 }} />
        <div className="skel" style={{ height: 14, width: "80%", marginTop: 8 }} />
        <div className="skel" style={{ height: 56, width: "100%", marginTop: 14, borderRadius: 14 }} />
      </div>
      <div className="card" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginTop: i === 0 ? 0 : 16 }}>
            <div className="skel" style={{ width: 40, height: 40, borderRadius: "50%" }} />
            <div style={{ flex: 1 }}>
              <div className="skel" style={{ height: 14, width: "45%" }} />
              <div className="skel" style={{ height: 12, width: "75%", marginTop: 8 }} />
            </div>
          </div>
        ))}
      </div>
      <p className="center" style={{ color: "var(--muted)", fontSize: 13, marginTop: 14 }}>
        Fetching the latest tracking…
      </p>
    </div>
  );
}

interface ErrorProps {
  onRetry: () => void;
  onSupport: () => void;
}

export function ErrorState({ onRetry, onSupport }: ErrorProps) {
  return (
    <div className="card center" role="alert" style={{ padding: "28px 20px" }}>
      <span className="state-art" aria-hidden="true">
        <WifiOff size={30} />
      </span>
      <h2>Something went wrong</h2>
      <p>We couldn't load the latest tracking information. Check your connection and try again.</p>
      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
        <button type="button" className="btn btn-ghost" onClick={onSupport}>
          Contact support
        </button>
      </div>
    </div>
  );
}
