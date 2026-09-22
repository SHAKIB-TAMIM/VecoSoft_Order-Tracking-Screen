import { ORDER } from "../data/orderData";
import Sheet from "./Sheet";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailsSheet({ open, onClose }: Props) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Order details"
      subtitle={`${ORDER.id} · Placed ${ORDER.date}`}
    >
      <div className="card" style={{ marginTop: 10 }}>
        <p className="section-label">Items</p>
        <div className="update-row">
          <div style={{ minWidth: 0 }}>
            <strong>
              {ORDER.productName} × {ORDER.qty}
            </strong>
            <p>
              {ORDER.variant} · {ORDER.price}
            </p>
          </div>
        </div>
        <dl style={{ margin: "12px 0 0" }}>
          <div className="kv">
            <dt>Subtotal</dt>
            <dd>{ORDER.subtotal}</dd>
          </div>
          <div className="kv">
            <dt>Shipping</dt>
            <dd>{ORDER.shipping}</dd>
          </div>
          <div className="kv">
            <dt>Total</dt>
            <dd>{ORDER.total}</dd>
          </div>
        </dl>
      </div>

      <div className="card">
        <p className="section-label">Delivery</p>
        <dl style={{ margin: 0 }}>
          <div className="kv">
            <dt>Recipient</dt>
            <dd>{ORDER.recipient}</dd>
          </div>
          <div className="kv">
            <dt>Address</dt>
            <dd>{ORDER.address}</dd>
          </div>
          <div className="kv">
            <dt>Method</dt>
            <dd>{ORDER.deliveryMethod}</dd>
          </div>
          <div className="kv">
            <dt>Payment</dt>
            <dd>{ORDER.payment}</dd>
          </div>
        </dl>
      </div>

      <div className="btn-stack">
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Done
        </button>
      </div>
    </Sheet>
  );
}
