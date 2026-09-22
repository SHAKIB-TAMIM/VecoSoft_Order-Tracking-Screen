import { useEffect, useState } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { ORDER } from "../data/orderData";

interface HeaderProps {
  onBack: () => void;
  onMenu: () => void;
}

export default function Header({ onBack, onMenu }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topbar${scrolled ? " is-scrolled" : ""}`}>
      <div className="topbar-row">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Back to orders">
          <ArrowLeft size={19} aria-hidden="true" />
        </button>
        <div className="topbar-title">
          <h1>Track order</h1>
          <p>{ORDER.id} · Placed {ORDER.date}</p>
        </div>
        <button type="button" className="icon-btn" onClick={onMenu} aria-label="More options">
          <MoreVertical size={19} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
