import { ORDER } from "../data/orderData";

function SneakerArt() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      role="img"
      aria-label="Everyday Essential Sneakers"
    >
      <ellipse cx="26" cy="42" rx="18" ry="4" fill="#C7D0FD" opacity="0.7" />
      <path
        d="M8 32c4-1 7-3 9-7l4-7c1.2-2 3.4-2.6 5.2-1.4l3 2c2.6 1.7 5.6 2.7 8.7 2.9l4.1.3c1.8.1 3 1.9 2.5 3.6L43 31c-.4 1.4-1.7 2.3-3.1 2.3H11c-2 0-3.4-1.9-3-3.3v2Z"
        fill="#0F172A"
      />
      <path
        d="M8 32.5h32.5c1 0 1.9-.7 2.2-1.6"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 19.5 24 24M23.5 17.8l3.6 4"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="15" cy="14" r="2.4" fill="#4F46E5" opacity="0.25" />
      <circle cx="40" cy="12" r="1.6" fill="#F59E0B" opacity="0.5" />
    </svg>
  );
}

export default function OrderSummary() {
  return (
    <section className="card" aria-label="Order summary">
      <p className="section-label">Order summary</p>
      <div className="product-row">
        <div className="thumb" aria-hidden="true">
          <SneakerArt />
        </div>
        <div className="product-meta">
          <h2>{ORDER.productName}</h2>
          <p className="variant">
            {ORDER.variant} · Qty {ORDER.qty}
          </p>
          <div className="qty-price">
            <span className="qty">Qty {ORDER.qty}</span>
            <span className="price">{ORDER.price}</span>
          </div>
        </div>
      </div>
      <dl className="meta-grid">
        <div className="meta-cell">
          <dt>Order ID</dt>
          <dd>{ORDER.id}</dd>
        </div>
        <div className="meta-cell">
          <dt>Order date</dt>
          <dd>{ORDER.date}</dd>
        </div>
      </dl>
    </section>
  );
}
