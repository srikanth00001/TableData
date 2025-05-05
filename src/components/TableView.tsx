import React from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import DataTable from "./db3";

// Define styles as constants for easy modification
const styles = {
  container: "p-4 bg-white  shadow-sm",
  titleSection: "mb-4",
  titleFlex: "flex justify-between",
  title: "text-lg font-semibold text-gray-700",
  breadcrumb: "text-sm text-gray-500",
  breadcrumbLink: "text-black ml-2",
  tableContainer: "border border-gray-200 rounded-lg shadow-sm p-4",
  datatableTitle: "mb-7",
  controlsSection: "border border-gray-200 rounded-lg shadow-sm p-4",
  controlsFlex: "md:flex justify-between mb-4 items-center ",
  entriesFlex: "flex items-center",
  entriesLabel: "text-sm text-gray-600 mr-2",
  entriesSelect: "border border-gray-300 rounded px-2 py-1 text-sm",
  entriesLabelAfter: "text-sm text-gray-600 ml-2",
  searchContainer: "relative md:w-64 mt-2 w-full ",
  searchIcon: "absolute inset-y-0 left-0 flex items-center pl-3",
  searchIconInner: "h-4 w-4 text-gray-400",
  searchInput: "border border-gray-300 rounded px-4 py-2 pl-10 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
  hr: "border-t border-gray-200 my-4",
  tableWrapper: "overflow-x-auto",
  table: "min-w-full table-auto border-collapse",
  theadRow: "",
  th: "px-4 py-2 text-left text-sm font-medium text-gray-700",
  sortIcon: "text-gray-400 inline ml-1",
  tbodyRow: "border-t border-gray-200",
  td: "px-4 py-2 text-sm text-gray-700",
  userFlex: "flex items-center",
  userImage: "w-8 h-8 rounded-full mr-2",
  userName: "text-black font-medium",
};

type TableViewProps = {
  data: Array<{
    User: { name: string; image: string };
    Position: string;
    Office: string;
    Age: string;
    "Start date": string;
    Salary: string;
  }>;
};


const TableView: React.FC<TableViewProps> = ({ data }) => {
  const headers = ["User", "Position", "Office", "Age", "Start date", "Salary"];

  return (
    <div className={styles.container}>
      {/* Title and Breadcrumb */}
      <div className={styles.titleSection}>
        <div className={styles.titleFlex}>
          <h2 className={styles.title}>Data Tables</h2>
          <p className={styles.breadcrumb}>
            Home &gt;<span className={styles.breadcrumbLink}>Data Tables</span>
          </p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {/* Entries and Search Section */}
        <div className={styles.datatableTitle}>
          <h4>Datatable 1</h4>
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.controlsFlex}>
            <div className={styles.entriesFlex}>
              <span className={styles.entriesLabel}>Show</span>
              <select className={styles.entriesSelect}>
                <option>10</option>
                <option>8</option>
                <option>5</option>
              </select>
              <span className={styles.entriesLabelAfter}>entries</span>
            </div>
            <div className={styles.searchContainer}>
              <span className={styles.searchIcon}>
                <FaSearch className={styles.searchIconInner} />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
            </div>
          </div>
          <hr className={styles.hr} />

          {/* Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  {headers.map((header) => (
                    <th  key={header} className={`${styles.th} ${
                      header !== "User" && header !== "Position" 
                        ? "hidden md:table-cell"
                        : ""
                    }`}>
                      {header}
                      <FaSort className={styles.sortIcon} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className={styles.tbodyRow}>
                    {headers.map((header) => (
                      <td key={header} className={`${styles.td} ${
                        header !== "User" && header !== "Position"
                          ? "hidden md:table-cell"
                          : ""
                      }`}>
                        {header === "User" ? (
                          <div className={styles.userFlex}>
                            <img
                              src={row.User.image}
                              alt={row.User.name}
                              className={styles.userImage}
                            />
                            <span className={styles.userName}>{row.User.name}</span>
                          </div>
                        ) : (
                          row[header]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <DataTable />
      </div>
    </div>
  );
};

// Example usage with the exact data from the image
const sampleImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCme_fbcxAjZU4K7sro6MjgjBp_Rl9OW0zu35EqajDYzoRHXW4ycfIPP8&s";
const sampleData = [
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
const TableViewWithData = () => <TableView data={sampleData} />;
export default TableViewWithData;