import { ChevronRight, MessageCircle, Phone, BookOpenText } from "lucide-react";
import Sheet from "./Sheet";

interface Props {
  open: boolean;
  onClose: () => void;
  onAction: (msg: string) => void;
}

const OPTIONS = [
  {
    id: "chat",
    icon: MessageCircle,
    title: "Chat with support",
    hint: "Replies in ~2 min · 9 AM – 11 PM",
    msg: "Support chat started — an agent will join shortly.",
  },
  {
    id: "call",
    icon: Phone,
    title: "Call the courier",
    hint: "Pathao helpline · 09612-000000",
    msg: "Dialling courier helpline (demo) — 09612-000000.",
  },
  {
    id: "help",
    icon: BookOpenText,
    title: "Delivery help centre",
    hint: "Delays, missing parcels & returns",
    msg: "Help centre opened (demo) — guides for delays & missing parcels.",
  },
];

export default function SupportSheet({ open, onClose, onAction }: Props) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="How can we help?"
      subtitle="Real humans, 9 AM – 11 PM every day."
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className="support-opt"
          onClick={() => {
            onClose();
            onAction(opt.msg);
          }}
        >
          <span className="support-opt-ic" aria-hidden="true">
            <opt.icon size={20} />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <strong>{opt.title}</strong>
            <span>{opt.hint}</span>
          </span>
          <ChevronRight size={18} aria-hidden="true" color="var(--faint)" />
        </button>
      ))}
      <div className="btn-stack">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </Sheet>
  );
}
