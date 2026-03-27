function InternshipForm({ form, handleChange, handleSubmit, editId }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="companyName"
        placeholder="Company Name"
        value={form.companyName}
        onChange={handleChange}
        required
      />

      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button type="submit">
        {editId ? "Update Internship" : "Add Internship"}
      </button>
    </form>
  );
}

export default InternshipForm;