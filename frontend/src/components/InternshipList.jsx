function InternshipList({ data, onDelete, onEdit }) {

  // ✅ Status styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "status applied";
      case "Interview":
        return "status interview";
      case "Offer":
        return "status offer";
      case "Rejected":
        return "status rejected";
      default:
        return "status";
    }
  };

  return (
    <div>
      {data.map((item) => {
        // ✅ Skip empty/bad data
        if (!item || !item.companyName) return null;

        return (
          <div className="card" key={item.id}>

            {/* LEFT SIDE */}
            <div>
              <h3>{item.companyName}</h3>
              <p>{item.role}</p>

              <span className={getStatusClass(item.status)}>
                {item.status}
              </span>
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <div className="actions">
              <button
                className="edit-btn"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default InternshipList;