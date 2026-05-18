import { useEffect, useState } from "react";
import "./App.css";

import StatsChart from "./components/StatsChart";
import InternshipForm from "./components/InternshipForm";
import InternshipList from "./components/InternshipList";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState("dashboard");

  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    status: "Applied"
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // FETCH DATA
  const fetchData = () => {
  fetch("https://internship-tracker-559m.onrender.com/api/internships")
    .then((res) => res.json())
    .then((data) => setData(data));
};

  useEffect(() => {
    fetchData();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ADD / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ VALIDATION HERE
  if (!form.companyName || !form.role || !form.status) {
    alert("Please fill all fields");
    return;
  }

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:8080/api/internships/${editId}`
      : "http://localhost:8080/api/internships";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    }).then(() => {
      fetchData();
      setForm({ companyName: "", role: "", status: "Applied" });
      setEditId(null);
      setShowModal(false);

      toast.success(editId ? "Updated successfully!" : "Added successfully!");
    });
  };

  // DELETE
  const deleteInternship = (id) => {
    fetch(`http://localhost:8080/api/internships/${id}`, {
      method: "DELETE"
    }).then(() => {
      fetchData();
      toast.error("Deleted successfully!");
    });
  };

  // EDIT
  const handleEdit = (item) => {
    setForm({
      companyName: item.companyName,
      role: item.role,
      status: item.status
    });
    setEditId(item.id);
    setShowModal(true);
  };

  // FILTER
  const filteredData = data
  .filter(
    (item) =>
      item &&
      item.companyName &&
      item.role &&
      item.status
  )
  .filter((item) =>
    item.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={darkMode ? "layout dark" : "layout"}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>📌 Tracker</h2>

        <p
          className={`menu ${page === "dashboard" ? "active" : ""}`}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </p>

        <p
          className={`menu ${page === "charts" ? "active" : ""}`}
          onClick={() => setPage("charts")}
        >
          Charts
        </p>

        {/* 🌙 DARK MODE */}
        <button
          className="toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* DASHBOARD PAGE */}
        {page === "dashboard" && (
          <>
            <div className="header">
              <h1>🚀 Internship Tracker</h1>
              <p>Track. Apply. Get hired.</p>
            </div>

            {/* STATS */}
            <div className="stats">
              <div className="stat-card">
                <p>Total</p>
                <h2>{data.length}</h2>
              </div>

              <div className="stat-card">
                <p>Applied</p>
                <h2>{data.filter(i => i.status === "Applied").length}</h2>
              </div>

              <div className="stat-card">
                <p>Interview</p>
                <h2>{data.filter(i => i.status === "Interview").length}</h2>
              </div>

              <div className="stat-card">
                <p>Offer</p>
                <h2>{data.filter(i => i.status === "Offer").length}</h2>
              </div>
            </div>

            {/* ADD BUTTON */}
            <button className="add-btn" onClick={() => setShowModal(true)}>
              + Add Internship
            </button>

            {/* SEARCH */}
            <input
              className="search"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* LIST */}
            {filteredData.length === 0 ? (
              <div className="empty">
                <h3>No internships found</h3>
              </div>
            ) : (
              <InternshipList
                data={filteredData}
                onDelete={deleteInternship}
                onEdit={handleEdit}
              />
            )}
          </>
        )}

        {/* CHART PAGE */}
        {page === "charts" && (
          <>
            <h1>📊 Analytics Dashboard</h1>

            <div className="chart-box">
              <StatsChart data={data} />
            </div>
          </>
        )}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>{editId ? "Edit Internship" : "Add Internship"}</h2>

            <InternshipForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              editId={editId}
            />

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* TOAST */}
      <ToastContainer />

    </div>
  );
}

export default App;