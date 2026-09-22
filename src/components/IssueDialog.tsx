import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ISSUE_OPTIONS, type OrderStateKey } from "../data/orderData";
import Sheet from "./Sheet";

interface Props {
  open: boolean;
  stateKey: OrderStateKey;
  onClose: () => void;
  onSubmitted: (msg: string) => void;
}

export default function IssueDialog({ open, stateKey, onClose, onSubmitted }: Props) {
  const defaultId = stateKey === "not-received" ? "not-received" : "not-received";
  const [selected, setSelected] = useState(defaultId);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const close = () => {
    onClose();
    // reset confirmation after the sheet animates out
    window.setTimeout(() => {
      setDone(false);
      setNote("");
    }, 250);
  };

  const submit = () => {
    setDone(true);
    const label = ISSUE_OPTIONS.find((o) => o.id === selected)?.title ?? "Delivery issue";
    onSubmitted(`Report received: “${label}”. We'll update you within 24 hours.`);
  };

  return (
    <Sheet
      open={open}
      onClose={close}
      title={done ? "Report received" : "What's wrong with your delivery?"}
      subtitle={
        done
          ? "Thanks — we've logged your case."
          : "Pick what best matches. We'll prioritise from there."
      }
    >
      {done ? (
        <div className="success-pane">
          <span className="success-ring" aria-hidden="true">
            <CheckCircle2 size={30} />
          </span>
          <h3 style={{ margin: "14px 0 0", fontSize: 17 }}>We're on it</h3>
          <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "6px 0 0" }}>
            Case <strong>DLV-20914</strong> is assigned to the courier team. Expect an
            update by SMS and in this screen within 24 hours.
          </p>
          <div className="btn-stack">
            <button type="button" className="btn btn-primary" onClick={close}>
              Back to tracking
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="radio-list" role="radiogroup" aria-label="Issue type">
            {ISSUE_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                className="radio-opt"
                role="radio"
                aria-checked={selected === opt.id}
                tabIndex={0}
                onClick={() => setSelected(opt.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(opt.id);
                  }
                }}
              >
                <span className="radio-dot" aria-hidden="true" />
                <span style={{ minWidth: 0 }}>
                  <strong>{opt.title}</strong>
                  <span>{opt.hint}</span>
                </span>
              </div>
            ))}
          </div>
          <label
            htmlFor="issue-note"
            style={{ display: "block", marginTop: 12, fontSize: 13, fontWeight: 700 }}
          >
            Anything we should know? <span style={{ color: "var(--muted)" }}>(optional)</span>
          </label>
          <textarea
            id="issue-note"
            className="note"
            placeholder="e.g. Guard didn't receive anything, no call from courier…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
          />
          <div className="btn-stack split">
            <button type="button" className="btn btn-ghost" onClick={close}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              Submit report
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}
