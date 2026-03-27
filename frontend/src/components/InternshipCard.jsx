function InternshipCard({ item, onDelete, onEdit }) {

  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return { background: "#fff3cd", color: "#856404" };
      case "Interview":
        return { background: "#d1ecf1", color: "#0c5460" };
      case "Offer":
        return { background: "#d4edda", color: "#155724" };
      case "Rejected":
        return { background: "#f8d7da", color: "#721c24" };
      default:
        return { background: "#eee", color: "#333" };
    }
  };

  return (
  <div className="card">
    <div>
      <h3 style={{ margin: "0 0 5px 0" }}>{item.companyName}</h3>
      <p style={{ margin: 0, color: "#94a3b8" }}>{item.role}</p>

      <span
        className="badge"
        style={{
          background:
            item.status === "Applied"
              ? "#1e40af"
              : item.status === "Interview"
              ? "#065f46"
              : "#7f1d1d",
          marginTop: "6px",
          display: "inline-block"
        }}
      >
        {item.status}
      </span>
    </div>

    <div style={{ display: "flex", gap: "8px" }}>
      <button onClick={() => onEdit(item)}>✏️</button>
      <button onClick={() => onDelete(item.id)}>🗑️</button>
    </div>
  </div>
);

      
}

export default InternshipCard;