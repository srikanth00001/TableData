import React, { useState } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import DataTable from "./db3";

interface TableRow {
  User: { name: string; image: string };
  Position: string;
  Office: string;
  Age: string;
  "Start date": string;
  Salary: string;
}

interface TableViewProps {
  data: TableRow[];
}

const TableView: React.FC<TableViewProps> = ({ data }) => {
  const headers = ["User", "Position", "Office", "Age", "Start date", "Salary"];
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search query
  const filteredData = data.filter((row) =>
    [
      row.User.name,
      row.Position,
      row.Office,
      row.Age,
      row["Start date"],
      row.Salary,
    ].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination calculations based on filtered data
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Handle entries per page change
  const handleEntriesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEntriesPerPage = parseInt(e.target.value);
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
<div className="p-4 bg-card text-card-foreground shadow-sm max-w-full box-border">
      {/* Title and Breadcrumb */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <h2 className="text-lg font-semibold text-foreground">Data Tables</h2>
          <p className="text-sm text-muted-foreground">
            Home &gt; <span className="text-foreground ml-1">Data Tables</span>
          </p>
        </div>
      </div>

      <div className="border border-border rounded-lg shadow-sm p-4 max-w-full">
        {/* Datatable Title */}
        <div className="mb-6">
          <h4 className="text-foreground text-base font-medium">Datatable 1</h4>
        </div>

        <div className="border border-border rounded-lg shadow-sm p-4 max-w-full">
          {/* Entries and Search Section */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <select
                className="border border-input rounded px-2 py-1 text-sm bg-background text-foreground focus:ring-2 focus:ring-ring"
                value={entriesPerPage}
                onChange={handleEntriesPerPageChange}
              >
                <option value="10">10</option>
                <option value="8">8</option>
                <option value="5">5</option>
              </select>
              <span className="text-sm text-muted-foreground">entries</span>
            </div>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="h-4 w-4 text-muted-foreground" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="border border-input rounded px-4 py-2 pl-10 text-sm w-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <hr className="border-t border-border my-4" />

          {/* Table */}
          <div className="overflow-x-auto max-w-full">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-9 py-2 text-left text-sm font-medium text-foreground whitespace-nowrap"
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
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="px-9 py-3 text-sm text-foreground whitespace-nowrap"
                      >
                        {header === "User" ? (
                          <div className="flex items-center">
                            <img
                              src={row.User.image}
                              alt={row.User.name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-foreground font-medium">{row.User.name}</span>
                          </div>
                        ) : (
                          row[header as keyof TableRow]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="border-t border-border my-4" />

          {/* Pagination Section */}
          <div className="flex flex-col items-center mt-6 text-sm gap-4">
            <span className="text-muted-foreground">
              Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
            </span>
            <div className="flex items-center space-x-2 justify-center flex-wrap">
              <button
                className={`border border-input rounded px-2 py-1 ${
                  currentPage === 1 ? "text-muted-foreground cursor-not-allowed" : "text-foreground"
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
                      className={`border border-input rounded px-3 py-1 ${
                        currentPage === page ? "bg-primary text-primary-foreground" : "text-foreground"
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
                        className={`border border-input rounded px-3 py-1 ${
                          currentPage === page ? "bg-primary text-primary-foreground" : "text-foreground"
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
                className={`border border-input rounded px-2 py-1 ${
                  currentPage === totalPages ? "text-muted-foreground cursor-not-allowed" : "text-foreground"
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
      <div className="mt-6">
        <DataTable />
      </div>
    </div>
  );
};
// Example usage with the exact data from the image
const sampleImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCme_fbcxAjZU4K7sro6MjgjBp_Rl9OW0zu35EqajDYzoRHXW4ycfIPP8&s";
const tableData: TableRow[] = [
  {
    User: { name: "Abram Schleifer", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "Edinbgh",
    Age: "57",
    "Start date": "25 Apr, 2027",
    Salary: "$89,500",
  },
  {
    User: { name: "Abram Schleifer", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "Edinbgh",
    Age: "57",
    "Start date": "25 Apr, 2027",
    Salary: "$89,500",
  },
  {
    User: { name: "Abram Schleifer", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "Edinbgh",
    Age: "57",
    "Start date": "25 Apr, 2027",
    Salary: "$89,500",
  },
  {
    User: { name: "Carla George", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "London",
    Age: "45",
    "Start date": "11 May, 2027",
    Salary: "$15,500",
  },
  {
    User: { name: "Carla George", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "London",
    Age: "45",
    "Start date": "11 May, 2027",
    Salary: "$15,500",
  },
  {
    User: { name: "Ekstrom Bothman", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "San Franco",
    Age: "53",
    "Start date": "15 Nov, 2027",
    Salary: "$19,200",
  },
  {
    User: { name: "Ekstrom Bothman", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "San Franco",
    Age: "53",
    "Start date": "15 Nov, 2027",
    Salary: "$19,200",
  },
  {
    User: { name: "Ekstrom Bothman", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "San Franco",
    Age: "53",
    "Start date": "15 Nov, 2027",
    Salary: "$19,200",
  },
  {
    User: { name: "Ekstrom Bothman", image: `${sampleImage}` },
    Position: "Sales Assistant",
    Office: "San Franco",
    Age: "53",
    "Start date": "15 Nov, 2027",
    Salary: "$19,200",
  },
];

// Export the component with sample data for testing
const TableViewWithData = () => <TableView data={tableData} />;
export default TableViewWithData;