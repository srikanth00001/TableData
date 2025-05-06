import React, { useState } from "react";
import { FaSearch, FaSort, FaDownload, FaTrash, FaPencilAlt } from "react-icons/fa";

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
  }
];

const DataTable = () => {
  const headers = ["User", "Position", "Salary", "Office", "Status", "Action"];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [tableData, setTableData] = useState(initialTableData);
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const filteredData = tableData.filter((row) =>
    [
      row.user.name,
      row.position,
      row.office,
      row.status,
    ].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleEntriesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEntriesPerPage = parseInt(e.target.value);
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1);
    setSelectedRows([]);
    setSelectAll(false);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedRows([]);
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
    setSelectAll(paginatedData.length === selectedRows.length + 1);
  };

  const handleDownload = () => {
    if (filteredData.length === 0) {
      alert("No data available to download.");
      return;
    }

    const csvHeaders = ["Name", "Email", "Position", "Salary", "Office", "Status"];
    const csvRows = filteredData.map((row) => {
      return [
        `"${row.user.name}"`,
        `"${row.user.email}"`,
        `"${row.position}"`,
        `"${row.salary}"`,
        `"${row.office}"`,
        `"${row.status}"`,
      ].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "filtered_data.csv");
    link.style.visibility = "hidden"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const actualIndex = tableData.indexOf(paginatedData[index]);
      const newData = tableData.filter((_, i) => i !== actualIndex);
      setTableData(newData);
      setSelectedRows(
        selectedRows
          .filter((i) => i !== index)
          .map((i) => (i > index ? i - 1 : i))
      );
      setSelectAll(false);

      const newTotalPages = Math.ceil(newData.length / entriesPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleEdit = (index: number) => {
    const row = paginatedData[index];
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

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    const actualIndex = tableData.indexOf(paginatedData[editRowIndex!]);
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

  const handleEditClose = () => {
    setEditRowIndex(null);
    setEditForm(null);
  };

  return (
    <div className="bg-card text-card-foreground shadow-sm">
      {/* Title and Breadcrumb */}
      <div className="mb-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-foreground">Data Tables</h2>
          <p className="text-sm text-muted-foreground">
            Home &gt; <span className="text-foreground ml-2">Data Tables</span>
          </p>
        </div>
      </div>

      <div className="border border-border rounded-lg shadow-sm p-4">
        {/* Datatable Title */}
        <div className="mb-7">
          <h4 className="text-foreground">Datatable 3</h4>
        </div>

        {/* Controls Section */}
        <div className="border border-border rounded-lg shadow-sm p-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 items-start md:items-center">
            <div className="flex items-center mb-2 md:mb-0">
              <span className="text-sm text-muted-foreground mr-2">Show</span>
              <select
                className="border border-input rounded px-2 py-1 text-sm bg-background text-foreground"
                value={entriesPerPage}
                onChange={handleEntriesPerPageChange}
              >
                <option value="5">5</option>
                <option value="8">8</option>
                <option value="10">10</option>
              </select>
              <span className="text-sm text-muted-foreground ml-2">entries</span>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto">
              <div className="relative md:w-64 w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaSearch className="h-4 w-4 text-muted-foreground" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-input rounded px-4 py-2 pl-10 text-sm w-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="border border-input rounded flex items-center text-sm p-2 w-full md:w-auto justify-center md:justify-start text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring sm:mt-0 mt-2 sm:ml-2 sm:px-6"
                onClick={handleDownload}
              >
                Download
                <FaDownload className="ml-1" />
              </button>
            </div>
          </div>
          <hr className="border-t border-border my-4" />

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-2 md:px-1 py-2 text-left text-sm font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-7 md:px-1 py-2 text-left text-sm font-medium text-foreground"
                    >
                      {header}
                      <FaSort className="text-muted-foreground inline ml-1" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="px-2 md:px-1 py-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleRowSelect(index)}
                      />
                    </td>
                    <td className="px-7 md:px-1 py-2 text-sm text-foreground">
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium">{row.user.name}</span>
                        <span className="text-muted-foreground text-xs">{row.user.email}</span>
                      </div>
                    </td>
                    <td className="px-7 md:px-1 py-2 text-sm text-foreground">{row.position}</td>
                    <td className="px-7 md:px-1 py-2 text-sm text-foreground">{row.salary}</td>
                    <td className="px-7 md:px-1 py-2 text-sm text-foreground">{row.office}</td>
                    <td className="px-7 md:px-1 py-2 text-sm text-foreground">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${row.status === "Hired"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : row.status === "In Progress"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-7 md:px-1 py-2 text-sm text-foreground">
                      <div className="flex space-x-2">
                        <button
                          className="text-muted-foreground hover:text-destructive cursor-pointer mr-3"
                          aria-label="Delete"
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="text-muted-foreground hover:text-primary cursor-pointer"
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
          <hr className="border-t border-border my-4" />
          {/* Pagination Section */}
          <div className="flex flex-col md:flex-row md:justify-between items-center mt-6 text-sm">
            <span className="text-muted-foreground mb-2 md:mb-0">
              Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
            </span>
            <div className="flex items-center space-x-2 justify-center">
              <button
                className={`border border-input rounded px-3 py-1 ${currentPage === 1 ? "text-muted-foreground cursor-not-allowed" : "text-foreground"
                  }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {totalPages <= 3
                ? Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`border border-input rounded px-2 py-1 ${currentPage === page ? "bg-primary text-primary-foreground" : "text-foreground"
                      }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))
                : [
                  ...Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`border border-input rounded px-3 py-1 ${currentPage === page ? "bg-primary text-primary-foreground" : "text-foreground"
                        }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )),
                  totalPages > 3 && (
                    <span key="ellipsis" className="px-2 text-muted-foreground">
                      ...
                    </span>
                  ),
                ]}
              <button
                className={`border border-input rounded px-2 py-1 ${currentPage === totalPages ? "text-muted-foreground cursor-not-allowed" : "text-foreground"
                  }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-foreground mb-4">Edit Row</h2>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditFormChange}
              className="border border-input rounded px-3 py-2 w-full mb-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditFormChange}
              className="border border-input rounded px-3 py-2 w-full mb-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Email"
            />
            <input
              type="text"
              name="position"
              value={editForm.position}
              onChange={handleEditFormChange}
              className="border border-input rounded px-3 py-2 w-full mb-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Position"
            />
            <input
              type="text"
              name="salary"
              value={editForm.salary}
              onChange={handleEditFormChange}
              className="border border-input rounded px-3 py-2 w-full mb-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Salary"
            />
            <input
              type="text"
              name="office"
              value={editForm.office}
              onChange={handleEditFormChange}
              className="border border-input rounded px-3 py-2 w-full mb-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Office"
            />
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditFormChange}
              className="border border-input rounded px-3 py-2 w-full mb-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Hired">Hired</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 rounded text-white dark:text-black font-medium bg-primary hover:bg-primary/80 mr-2"
                onClick={handleEditSubmit}
              >
                Save
              </button>
              <button
                className="px-4 py-2 rounded dark:text-white text-black  font-medium bg-secondary hover:bg-secondary/80 border border-black dark:border-white"
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