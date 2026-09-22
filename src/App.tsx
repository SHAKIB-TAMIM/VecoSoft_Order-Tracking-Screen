import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import StateSwitcher from "./components/StateSwitcher";
import OrderSummary from "./components/OrderSummary";
import StatusHero from "./components/StatusHero";
import DeliveryTimeline, { WaitingTimeline } from "./components/DeliveryTimeline";
import LatestUpdate from "./components/LatestUpdate";
import HelpActions from "./components/HelpActions";
import OrderDetailsSheet from "./components/OrderDetailsSheet";
import SupportSheet from "./components/SupportSheet";
import IssueDialog from "./components/IssueDialog";
import Toast from "./components/Toast";
import { ErrorState, LoadingState } from "./components/FeedbackStates";
import { STATE_CONFIGS, type OrderStateKey } from "./data/orderData";

type Overlay = "details" | "support" | "issue" | null;

let toastId = 0;

export default function App() {
  const [orderState, setOrderState] = useState<OrderStateKey>("delayed");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const timers = useRef<number[]>([]);

  const pushToast = useCallback((text: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev.slice(-2), { id, text }]);
    const t = window.setTimeout(() => {
      setToasts((prev) => prev.filter((m) => m.id !== id));
    }, 3400);
    timers.current.push(t);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 1100);
    timers.current.push(t);
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
    };
  }, []);

  const simulateFetch = (next?: OrderStateKey) => {
    setError(false);
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 900);
    timers.current.push(t);
    if (next) setOrderState(next);
  };

  const handleStateChange = (next: OrderStateKey) => {
    if (next === orderState && !loading && !error) return;
    simulateFetch(next);
  };

  const handleRetry = () => {
    simulateFetch();
    pushToast("Refreshing tracking…");
  };

  const config = STATE_CONFIGS[orderState];

  return (
    <div className="app">
      <div className="shell">
        <Header
          onBack={() => pushToast("Back to your orders (demo).")}
          onMenu={() => pushToast("Order options — invoice, return, cancel (demo).")}
        />

        <StateSwitcher
          value={orderState}
          onChange={handleStateChange}
          onPreviewLoading={() => {
            setError(false);
            setLoading(true);
            const t = window.setTimeout(() => setLoading(false), 2200);
            timers.current.push(t);
          }}
          onPreviewError={() => {
            setLoading(false);
            setError(true);
          }}
        />

        {loading ? (
          <div key="loading" className="fade-swap">
            <LoadingState />
          </div>
        ) : error ? (
          <div key="error" className="fade-swap">
            <ErrorState onRetry={handleRetry} onSupport={() => setOverlay("support")} />
          </div>
        ) : (
          <div key={orderState} className="fade-swap">
            <div className="layout-grid">
              <div className="col">
                <StatusHero config={config} />
                {config.showWaitingVisual ? (
                  <WaitingTimeline />
                ) : (
                  <DeliveryTimeline stages={config.timeline} caption={config.timelineCaption} />
                )}
                {config.latestUpdate ? (
                  <LatestUpdate
                    title={config.latestUpdate.title}
                    detail={config.latestUpdate.detail}
                  />
                ) : (
                  <section className="card" aria-label="What happens next">
                    <p className="section-label">What happens next</p>
                    <div className="update-row">
                      <div style={{ minWidth: 0 }}>
                        <strong>We'll notify you at each step</strong>
                        <p>
                          Pickup scan → in-transit scans → out-for-delivery. Estimated
                          delivery Thursday, Sep 24. Full receipt and address details are
                          available below.
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              <div className="col">
                <OrderSummary />
                <HelpActions
                  stateKey={orderState}
                  onSupport={() => setOverlay("support")}
                  onReport={() => setOverlay("issue")}
                  onDetails={() => setOverlay("details")}
                />
              </div>
            </div>

            <p className="foot">
              ShopLane Buyer Protection · Free returns within 7 days · {config.key} demo state
            </p>
          </div>
        )}
      </div>

      <OrderDetailsSheet open={overlay === "details"} onClose={() => setOverlay(null)} />
      <SupportSheet
        open={overlay === "support"}
        onClose={() => setOverlay(null)}
        onAction={pushToast}
      />
      <IssueDialog
        open={overlay === "issue"}
        stateKey={orderState}
        onClose={() => setOverlay(null)}
        onSubmitted={pushToast}
      />
      <Toast messages={toasts} />
    </div>
  );
}
