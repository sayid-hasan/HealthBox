import { useState, useEffect, useCallback } from "react";
import { CiExport, CiFileOff, CiFilter } from "react-icons/ci";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BtnWithICon from "../../../components/NormalBtns/BtnWithIcon";
import { Helmet } from "react-helmet-async";
import { CSVLink } from "react-csv";

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const axiosSecure = useAxiosSecure();
  // Fetch sales data
  const fetchSales = useCallback(async () => {
    try {
      const formattedStartDate = startDate
        ? new Date(startDate).toISOString()
        : null;
      const formattedEndDate = endDate ? new Date(endDate).toISOString() : null;
      const { data } = await axiosSecure.get("/sales", {
        params: { startDate: formattedStartDate, endDate: formattedEndDate },
      });
      setSales(data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  }, [startDate, endDate, axiosSecure]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);
  // console.log("sales", sales);
  // data provides access to your row data
  const ExpandedComponent = ({ data }) => (
    <pre>
      {JSON.stringify(
        data.purchasedItems.map((item) => item?.name),
        null,
        2
      )}
    </pre>
  );

  // Export data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sales);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SalesReport");
    XLSX.writeFile(wb, "SalesReport.xlsx");
  };

  // Columns for DataTable
  const columns = [
    {
      name: "Medicine Name",
      selector: (row) =>
        row.purchasedItems.map((item) => item?.name).join(", "),
      sortable: true,
    },
    { name: "Buyer Email", selector: (row) => row.email },
    {
      name: "Amount Paid",
      selector: (row) => `$${row.amount}`,
      sortable: true,
    },
    {
      name: "Transaction ID",
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];
  // column styles
  //  Internally, customStyles will deep merges your customStyles with the default styling.
  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // override the row height
      },
    },
    headCells: {
      style: {
        color: "#FFFF",
        fontWeight: "bold",
        fontSize: "22px",
        textAlign: "center",
        background: "linear-gradient(to right, #1364FF,#DEE9FF)",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  return (
    <div className="container  font-Nunito mx-auto p-4">
      <Helmet>Admin | Sales Report</Helmet>
      <h2 className="text-2xl font-bold text-SecondaryColor md:text-3xl  md:leading-[43px]">
        Sales Report
      </h2>

      {/* Date Range Filter */}
      <div className="grid grid-cols-2 mb-5 lg:grid-cols-6 gap-5">
        <input
          type="date"
          className="btn h-auto mt-4 border-transparent  bg-SecondaryColor text-white font-bold px-4  md:py-4 py-2 text-sm max-w-[180px]  hover:bg-PrimaryColor border hover:border-SecondaryColor hover:text-SecondaryColor   group transition duration-200"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="btn h-auto mt-4 border-transparent  bg-SecondaryColor text-white font-bold px-4  md:py-4 py-2 text-sm max-w-[180px]  hover:bg-PrimaryColor border hover:border-SecondaryColor hover:text-SecondaryColor   group transition duration-200"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={() => fetchSales()}>
          <BtnWithICon
            text={"filter"}
            icon={<CiFilter />}
            classname={`bg-SecondaryColor hover:bg-PrimaryColor border hover:border-SecondaryColor hover:text-SecondaryColor mt-0`}
          ></BtnWithICon>
        </button>
        {/* clear filter */}
        <button
          onClick={() => {
            setStartDate(""), setEndDate("");
          }}
        >
          <BtnWithICon
            text={"clear filter"}
            icon={<CiFileOff />}
            classname={`bg-SecondaryColor hover:bg-PrimaryColor border hover:border-SecondaryColor hover:text-SecondaryColor mt-0`}
          ></BtnWithICon>
        </button>
        {/* export excel */}
        <button onClick={exportToExcel}>
          <BtnWithICon
            text={" Export to Excel"}
            icon={<CiExport />}
            classname={`bg-SecondaryColor hover:bg-PrimaryColor border hover:border-SecondaryColor hover:text-SecondaryColor mt-0`}
          />
        </button>
        {/* export csv */}
        <button className="btn h-auto mt-4 border-transparent  bg-SecondaryColor text-white font-bold px-4  md:py-4 py-2 text-sm max-w-[180px]  hover:bg-PrimaryColor border hover:border-SecondaryColor hover:text-SecondaryColor   group transition duration-200">
          <CSVLink data={sales} filename="sales-report.csv">
            Export as CSV
          </CSVLink>
        </button>
      </div>

      {/* Sales Data Table */}
      <DataTable
        columns={columns}
        data={sales}
        pagination
        highlightOnHover
        responsive
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        fixedHeader
        fixedHeaderScrollHeight="300px"
        customStyles={customStyles}
      />
    </div>
  );
};

export default SalesReport;
// btns   <div style={{ marginTop: "1rem" }}>
//   <button>
//     <CSVLink data={filteredData} filename="sales-report.csv">
//       Export to CSV
//     </CSVLink>
//   </button>
//   <button onClick={exportToPDF}>Export to PDF</button>
//   <button onClick={exportToXLSX}>Export to XLSX</button>
// </div>
//
// <DataTable
//   columns={columns}
//   data={filteredData}
//   pagination
//   highlightOnHover
// />;
//   // Export to PDF
// const exportToPDF = () => {
//   const doc = new jsPDF();
//   doc.text("Sales Report", 20, 10);
//   doc.autoTable({
//     head: [
//       ["Medicine Name", "Seller Email", "Buyer Email", "Total Price", "Date"],
//     ],
//     body: filteredData.map((row) => [
//       row.medicineName,
//       row.sellerEmail,
//       row.buyerEmail,
//       row.totalPrice,
//       new Date(row.date).toLocaleDateString(),
//     ]),
//   });
//   doc.save("sales-report.pdf");
// };

// // Export to XLSX
// const exportToXLSX = () => {
//   const worksheet = XLSX.utils.json_to_sheet(filteredData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
//   XLSX.writeFile(workbook, "sales-report.xlsx");
// };
