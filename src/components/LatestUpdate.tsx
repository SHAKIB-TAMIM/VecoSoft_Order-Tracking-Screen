import { BellRing, MapPin } from "lucide-react";

interface LatestUpdateProps {
  title: string;
  detail: string;
}

export default function LatestUpdate({ title, detail }: LatestUpdateProps) {
  return (
    <section className="card" aria-label="Latest update">
      <p className="section-label">Latest update</p>
      <div className="update-row">
        <span className="update-ic" aria-hidden="true">
          <BellRing size={19} />
        </span>
        <div style={{ minWidth: 0 }}>
          <strong>{title}</strong>
          <p>{detail}</p>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <dl style={{ margin: 0 }}>
          <div className="kv">
            <dt>Carrier</dt>
            <dd>Pathao Courier · PT-88410293</dd>
          </div>
          <div className="kv">
            <dt>Destination</dt>
            <dd>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <MapPin size={13} aria-hidden="true" />
                Dhanmondi, Dhaka
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
