import { useState } from "react";
import {
  Check,
  ChevronDown,
  CircleDashed,
  Hourglass,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";
import type { TimelineStage } from "../data/orderData";

const STAGE_ICON = [Package, PackageCheck, Truck, PackageCheck] as const;

function tagFor(stage: TimelineStage): { text: string; cls: string } {
  if (stage.state === "completed")
    return stage.emphasis === "attention"
      ? { text: "Flagged", cls: "flagged" }
      : { text: "Done", cls: "done" };
  if (stage.state === "current")
    return stage.emphasis === "delayed"
      ? { text: "Delayed", cls: "late" }
      : { text: "Current", cls: "now" };
  return { text: "Next", cls: "todo" };
}

export default function DeliveryTimeline({
  stages,
  caption,
}: {
  stages: TimelineStage[];
  caption?: string;
}) {
  const [expanded, setExpanded] = useState<string | null>("shipped");

  return (
    <section className="card" aria-label="Delivery progress">
      <h2 className="card-title">Delivery progress</h2>
      {caption ? (
        <p className="tl-caption">{caption}</p>
      ) : null}
      <ol className="timeline">
        {stages.map((stage, i) => {
          const Icon = STAGE_ICON[i % STAGE_ICON.length];
          const tag = tagFor(stage);
          const itemClass =
            stage.emphasis === "attention"
              ? "is-attention"
              : stage.state === "completed"
                ? "is-done"
                : stage.state === "current"
                  ? stage.emphasis === "delayed"
                    ? "is-delayed"
                    : "is-current"
                  : "is-todo";
          const hasEvents = !!stage.events?.length;
          const isOpen = expanded === stage.id;

          return (
            <li key={stage.id} className={`tl-item ${itemClass}`}>
              <div className="tl-rail" aria-hidden="true">
                <span className="tl-dot">
                  {stage.state === "completed" && stage.emphasis !== "attention" ? (
                    <Check size={18} strokeWidth={3} />
                  ) : stage.emphasis === "attention" ? (
                    <Icon size={18} />
                  ) : stage.state === "upcoming" ? (
                    <CircleDashed size={18} />
                  ) : (
                    <Icon size={18} />
                  )}
                </span>
                <span className="tl-line" />
              </div>
              <div className="tl-body">
                <div className="tl-title-row">
                  <h3>{stage.label}</h3>
                  <span className={`mini-tag ${tag.cls}`}>{tag.text}</span>
                </div>
                {stage.timestamp ? <p className="tl-time">{stage.timestamp}</p> : null}
                {stage.description ? <p className="tl-desc">{stage.description}</p> : null}
                {hasEvents ? (
                  <>
                    <button
                      type="button"
                      className="expand-btn"
                      aria-expanded={isOpen}
                      aria-controls={`events-${stage.id}`}
                      onClick={() => setExpanded(isOpen ? null : stage.id)}
                    >
                      {isOpen ? "Hide tracking events" : "View tracking events"}
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>
                    {isOpen ? (
                      <div className="tl-events" id={`events-${stage.id}`}>
                        {stage.events!.map((ev) => (
                          <div className="tl-event" key={ev.text}>
                            <span style={{ minWidth: 0 }}>{ev.text}</span>
                            <time>{ev.time}</time>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function WaitingTimeline() {
  return (
    <section className="card" aria-label="Delivery progress">
      <h2 className="card-title">Delivery progress</h2>
      <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--muted)" }}>
        Tracking activates after the carrier pickup — nothing to catch up on yet.
      </p>
      <div className="wait-visual">
        <div className="wait-visual-icon" aria-hidden="true">
          <Hourglass size={22} />
        </div>
        <div style={{ minWidth: 0 }}>
          <strong style={{ fontSize: 14 }}>Waiting for carrier pickup</strong>
          <p>
            Your package is packed and labelled. The courier scan will create the first
            timeline event here.
          </p>
          <div className="wait-steps" aria-hidden="true">
            <span className="wait-step fill" />
            <span className="wait-step" />
            <span className="wait-step" />
            <span className="wait-step" />
          </div>
        </div>
      </div>
    </section>
  );
}
