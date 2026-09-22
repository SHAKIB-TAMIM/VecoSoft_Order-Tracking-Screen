import { CheckCircle2 } from "lucide-react";

export default function Toast({ messages }: { messages: { id: number; text: string }[] }) {
  if (!messages.length) return null;
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      {messages.map((m) => (
        <div className="toast" key={m.id}>
          <CheckCircle2 size={17} aria-hidden="true" />
          <span>{m.text}</span>
        </div>
      ))}
    </div>
  );
}
