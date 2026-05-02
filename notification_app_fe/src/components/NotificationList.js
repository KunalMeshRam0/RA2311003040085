import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../api";

export default function NotificationList() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const getColor = (type) => {
    if (type === "Placement") return "#22c55e";
    if (type === "Result") return "#3b82f6";
    if (type === "Event") return "#f59e0b";
    return "#888";
  };

  useEffect(() => {
    fetchNotifications("", page, 20).then((res) => {
      let notifications = res.notifications || res;

      if (type) {
        notifications = notifications.filter(
          (n) =>
            n.Type &&
            n.Type.toLowerCase() === type.toLowerCase()
        );
      }

      notifications.sort(
        (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
      );

      setData(notifications);
    });
  }, [type, page]);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      
      <h1 style={{ marginBottom: "20px", fontWeight: "600" }}>
        Notifications
      </h1>

      {/* FILTERS */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {["", "Event", "Result", "Placement"].map((t) => (
          <button
            key={t || "all"}
            onClick={() => {
              setType(t);
              setPage(1); 
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: type === t ? "#2563eb" : "#1f2937",
              color: "#fff",
              transition: "0.2s",
            }}
          >
            {t || "All"}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {data.length === 0 && (
          <p style={{ color: "#888" }}>No notifications found</p>
        )}

        {data.map((n) => (
          <div
            key={n.ID}
            style={{
              background: "#1a1d23",
              borderRadius: "12px",
              padding: "16px",
              borderLeft: `4px solid ${getColor(n.Type)}`,
              transition: "0.2s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: "12px",
                  color: getColor(n.Type),
                  fontWeight: "600",
                }}
              >
                {n.Type}
              </span>

              <span style={{ fontSize: "12px", color: "#888" }}>
                {new Date(n.Timestamp).toLocaleString()}
              </span>
            </div>

            <p style={{ marginTop: "8px", lineHeight: "1.5" }}>
              {n.Message}
            </p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{
            padding: "8px 16px",
            background: "#1f2937",
            border: "none",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
            opacity: page === 1 ? 0.5 : 1,
          }}
        >
          Prev
        </button>

        <button
          onClick={() => setPage(page + 1)}
          style={{
            padding: "8px 16px",
            background: "#2563eb",
            border: "none",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}