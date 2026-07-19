import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("form");
  const [items, setItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [form, setForm] = useState({
    product: "",
    price: "",
    balance: "",
    note: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (showToast) setShowToast(false);
  };

  const canAdd = form.product.trim() !== "" && form.price !== "" && form.balance !== "";

  const handleAdd = () => {
    if (!canAdd) return;
    setItems((prev) => [
      {
        id: Date.now(),
        product: form.product.trim(),
        price: form.price,
        balance: form.balance,
        note: form.note.trim(),
      },
      ...prev,
    ]);
    setForm({ product: "", price: "", balance: "", note: "" });
    setShowToast(true);
  };

  const formatMoney = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return val;
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="pl-root">
      <nav className="pl-nav">
        <div className="pl-brand">
          <span className="pl-brand-mark" />
          <div>
            <div className="pl-brand-text">Ledger</div>
          </div>
        </div>
        <div className="pl-nav-buttons">
          <button
            className={`pl-nav-btn ${page === "form" ? "active" : ""}`}
            onClick={() => setPage("form")}
          >
            New Entry
          </button>
          <button
            className={`pl-nav-btn ${page === "products" ? "active" : ""}`}
            onClick={() => setPage("products")}
          >
            Products
          </button>
        </div>
      </nav>

      <main className="pl-main">
        <div className="pl-container">
          {page === "form" ? (
            <>
              <div className="pl-page-title">Log a purchase</div>
              <div className="pl-page-hint">// record what you bought and what's left</div>

              <div className="pl-form">
                <div className="pl-field">
                  <label className="pl-label">Product</label>
                  <input
                    className="pl-input"
                    type="text"
                    placeholder="e.g. Wireless mouse"
                    value={form.product}
                    onChange={handleChange("product")}
                  />
                </div>

                <div className="pl-row">
                  <div className="pl-field">
                    <label className="pl-label">Price</label>
                    <input
                      className="pl-input"
                      type="number"
                      placeholder="0.00"
                      value={form.price}
                      onChange={handleChange("price")}
                    />
                  </div>
                  <div className="pl-field">
                    <label className="pl-label">Remaining Balance</label>
                    <input
                      className="pl-input"
                      type="number"
                      placeholder="0.00"
                      value={form.balance}
                      onChange={handleChange("balance")}
                    />
                  </div>
                </div>

                <div className="pl-field">
                  <label className="pl-label">Note</label>
                  <textarea
                    className="pl-textarea"
                    placeholder="Optional details..."
                    value={form.note}
                    onChange={handleChange("note")}
                  />
                </div>

                <button className="pl-add-btn" onClick={handleAdd} disabled={!canAdd}>
                  Add
                </button>

                {showToast && (
                  <div className="pl-toast">
                    <span className="pl-toast-dot" />
                    Added — view it under Products
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="pl-page-title">Products</div>
              <div className="pl-page-hint">
                // {items.length} {items.length === 1 ? "entry" : "entries"} logged
              </div>

              {items.length === 0 ? (
                <div className="pl-empty">No purchases logged yet.</div>
              ) : (
                <div className="pl-list">
                  {items.map((item, i) => (
                    <div className="pl-entry" key={item.id}>
                      <div className="pl-entry-top">
                        <div className="pl-entry-name">{item.product}</div>
                        <div className="pl-entry-index">
                          #{String(items.length - i).padStart(3, "0")}
                        </div>
                      </div>
                      <div className="pl-entry-figures">
                        <div>
                          <div className="pl-figure-label">Price</div>
                          <div className="pl-figure-value price">${formatMoney(item.price)}</div>
                        </div>
                        <div>
                          <div className="pl-figure-label">Balance</div>
                          <div className="pl-figure-value">${formatMoney(item.balance)}</div>
                        </div>
                      </div>
                      {item.note && (
                        <div className="pl-entry-note">
                          <div className="pl-entry-note-label">Note</div>
                          {item.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
