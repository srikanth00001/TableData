import React, { useState } from "react";
import { FaSearch, FaSort, FaDownload, FaTrash, FaPencilAlt } from "react-icons/fa";

// Define styles based on the TableView template
const styles = {
  container: "p-4 bg-white shadow-sm",
  titleSection: "mb-4",
  titleFlex: "flex justify-between",
  title: "text-lg font-semibold text-gray-700",
  breadcrumb: "text-sm text-gray-500",
  breadcrumbLink: "text-black ml-2",
  tableContainer: "border border-gray-200 rounded-lg shadow-sm p-4",
  datatableTitle: "mb-7",
  controlsSection: "border border-gray-200 rounded-lg shadow-sm p-4",
  controlsFlex: "flex flex-col md:flex-row justify-between mb-4 items-start md:items-center",
  entriesFlex: "flex items-center mb-2 md:mb-0",
  entriesLabel: "text-sm text-gray-600 mr-2",
  entriesSelect: "border border-gray-300 rounded px-2 py-1 text-sm",
  entriesLabelAfter: "text-sm text-gray-600 ml-2",
  searchContainer: "relative md:w-64 w-full",
  searchIcon: "absolute inset-y-0 left-0 flex items-center pl-3",
  searchIconInner: "h-4 w-4 text-gray-400",
  searchInput: "border border-gray-300 rounded px-4 py-2 pl-10 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
  downloadButton: "border border-gray-300 rounded flex items-center text-sm p-2 w-full md:w-auto justify-center md:justify-start text-black-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mt-0 mt-2 sm:ml-2 sm:px-6",
  downloadIcon: "ml-1",
  hr: "border-t border-gray-200 my-4",
  tableWrapper: "overflow-x-auto",
  table: "min-w-full table-auto border-collapse",
  theadRow: "",
  th: "px-4 py-2 text-left text-sm font-medium text-gray-700",
  sortIcon: "text-gray-400 inline ml-1",
  tbodyRow: "border-t border-gray-200",
  td: "px-4 py-2 text-sm text-gray-700",
  userFlex: "flex flex-col",
  userName: "text-black font-medium",
  userEmail: "text-gray-500 text-xs",
  statusHired: "inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800",
  statusInProgress: "inline-block px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800",
  statusPending: "inline-block px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800",
  actionButtons: "flex space-x-2",
  deleteButton: "text-gray-500 hover:text-red-600",
  editButton: "text-gray-500 hover:text-blue-600",
  modal: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
  modalContent: "bg-white p-6 rounded-lg shadow-lg w-full max-w-md",
  modalHeader: "text-lg font-semibold mb-4",
  modalInput: "border border-gray-300 rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500",
  modalButton: "px-4 py-2 rounded text-white font-medium",
  modalSaveButton: "bg-blue-600 hover:bg-blue-700 mr-2",
  modalCancelButton: "bg-gray-600 hover:bg-gray-700",
};

// Sample Data matching the image
const initialTableData = [
  {
    user: { name: "Lindsey Curtis", email: "demoemail@gmail.com" },
    position: "Sales Assistant",
    salary: "$168,500",
    office: "New York",
    status: "Hired",
  },
  {
    user: { name: "Kaiya George", email: "demoemail@gmail.com" },
    position: "Chief Executive Officer",
    salary: "$23,500",
    office: "San Francisco",
    status: "In Progress",
  },
  {
    user: { name: "Zain Geidt", email: "demoemail@gmail.com" },
    position: "Junior Technical Author",
    salary: "$12,500",
    office: "Tokyo",
    status: "In Progress",
  },
  {
    user: { name: "Abram Schleifer", email: "demoemail@gmail.com" },
    position: "Software Engineer",
    salary: "$89,500",
    office: "Edinburgh",
    status: "Hired",
  },
  {
    user: { name: "Carla George", email: "demoemail@gmail.com" },
    position: "Integration Specialist",
    salary: "$15,500",
    office: "London",
    status: "Pending",
  },
  {
    user: { name: "Emery Culhane", email: "demoemail@gmail.com" },
    position: "Pre-Sales Support",
    salary: "$23,500",
    office: "New York",
    status: "Hired",
  },
];

// DataTable Component
const DataTable = () => {
  const headers = ["User", "Position", "Salary", "Office", "Status", "Action"];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [tableData, setTableData] = useState(initialTableData);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // Filter data based on search query
  const filteredData = tableData.filter((row) =>
    [
      row.user.name,
      row.position,
      row.office,
      row.status
    ].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Handle header checkbox toggle
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  // Handle individual row checkbox toggle
  const handleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
    setSelectAll(filteredData.length === selectedRows.length + 1);
  };

  // Handle download button click
  const handleDownload = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one row to download.");
      return;
    }

    const csvHeaders = ["Name", "Email", "Position", "Salary", "Office", "Status"];
    const csvRows = selectedRows.map((index) => {
      const row = filteredData[index];
      return [
        `"${row.user.name}"`,
        `"${row.user.email}"`,
        `"${row.position}"`,
        `"${row.salary}"`,
        `"${row.office}"`,
        `"${row.status}"`
      ].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "selected_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle delete button click
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const actualIndex = tableData.indexOf(filteredData[index]);
      const newData = tableData.filter((_, i) => i !== actualIndex);
      setTableData(newData);
      setSelectedRows(selectedRows.filter((i) => i !== index).map((i) => i > index ? i - 1 : i));
      setSelectAll(false);
    }
  };

  // Handle edit button click
  const handleEdit = (index) => {
    const row = filteredData[index];
    setEditRowIndex(index);
    setEditForm({
      name: row.user.name,
      email: row.user.email,
      position: row.position,
      salary: row.salary,
      office: row.office,
      status: row.status,
    });
  };

  // Handle edit form change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit form submit
  const handleEditSubmit = () => {
    const actualIndex = tableData.indexOf(filteredData[editRowIndex]);
    const newData = [...tableData];
    newData[actualIndex] = {
      user: { name: editForm.name, email: editForm.email },
      position: editForm.position,
      salary: editForm.salary,
      office: editForm.office,
      status: editForm.status,
    };
    setTableData(newData);
    setEditRowIndex(null);
    setEditForm(null);
  };

  // Handle edit modal close
  const handleEditClose = () => {
    setEditRowIndex(null);
    setEditForm(null);
  };

  return (
    <div className={styles.container}>
      {/* Title and Breadcrumb */}
      <div className={styles.titleSection}>
        <div className={styles.titleFlex}>
          <h2 className={styles.title}>Data Tables</h2>
          <p className={styles.breadcrumb}>
            Home ><span className={styles.breadcrumbLink}>Data Tables</span>
          </p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {/* Datatable Title */}
        <div className={styles.datatableTitle}>
          <h4>Datatable 3</h4>
        </div>

        {/* Controls Section */}
        <div className={styles.controlsSection}>
          <div className={styles.controlsFlex}>
            <div className={styles.entriesFlex}>
              <span className={styles.entriesLabel}>Show</span>
              <select className={styles.entriesSelect} defaultValue="10">
                <option>10</option>
                <option>8</option>
                <option>5</option>
              </select>
              <span className={styles.entriesLabelAfter}>entries</span>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto">
            <div className={styles.searchContainer}>
                <span className={styles.searchIcon}>
                  <FaSearch className={styles.searchIconInner} />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className={styles.downloadButton} onClick={handleDownload}>
                Download
                <FaDownload className={styles.downloadIcon} />
              </button>
            </div>
          </div>
          <hr className={styles.hr} />

          {/* Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className={`${styles.th}`}
                    >
                      {header}
                      <FaSort className={styles.sortIcon} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index} className={styles.tbodyRow}>
                    <td className={styles.td}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleRowSelect(index)}
                      />
                    </td>
                    <td className={styles.td}>
                      <div className={styles.userFlex}>
                        <span className={styles.userName}>{row.user.name}</span>
                        <span className={styles.userEmail}>{row.user.email}</span>
                      </div>
                    </td>
                    <td className={styles.td}>{row.position}</td>
                    <td className={`${styles.td}`}>{row.salary}</td>
                    <td className={`${styles.td} `}>{row.office}</td>
                    <td className={`${styles.td}`}>
                      <span
                        className={
                          row.status === "Hired"
                            ? styles.statusHired
                            : row.status === "In Progress"
                            ? styles.statusInProgress
                            : styles.statusPending
                        }
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className={`${styles.td} `}>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.deleteButton}
                          aria-label="Delete"
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className={styles.editButton}
                          aria-label="Edit"
                          onClick={() => handleEdit(index)}
                        >
                          <FaPencilAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalHeader}>Edit Row</h2>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditFormChange}
              className={styles.modalInput}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditFormChange}
              className={styles.modalInput}
              placeholder="Email"
            />
            <input
              type="text"
              name="position"
              value={editForm.position}
              onChange={handleEditFormChange}
              className={styles.modalInput}
              placeholder="Position"
            />
            <input
              type="text"
              name="salary"
              value={editForm.salary}
              onChange={handleEditFormChange}
              className={styles.modalInput}
              placeholder="Salary"
            />
            <input
              type="text"
              name="office"
              value={editForm.office}
              onChange={handleEditFormChange}
              className={styles.modalInput}
              placeholder="Office"
            />
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditFormChange}
              className={styles.modalInput}
            >
              <option value="Hired">Hired</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                className={`${styles.modalButton} ${styles.modalSaveButton}`}
                onClick={handleEditSubmit}
              >
                Save
              </button>
              <button
                className={`${styles.modalButton} ${styles.modalCancelButton}`}
                onClick={handleEditClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;