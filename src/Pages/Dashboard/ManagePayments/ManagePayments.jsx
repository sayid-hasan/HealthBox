import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import { useState } from "react";
import BtnWithICon from "../../../components/NormalBtns/BtnWithIcon";
import { FcPaid } from "react-icons/fc";

const ManagePayments = () => {
  const [status, setStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/payments`);
      return res?.data;
    },
  });
  // handle role
  const handleChange = (event, payment) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        setStatus(event.target.value);
        const updateStatus = { status: status };
        console.log(result.isConfirmed);
        axiosSecure
          .put(`/payments/${payment._id}`, updateStatus)
          .then((res) => {
            console.log(res?.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Success",
                text: `Succesfully changed ${event.target.value}`,
                icon: "success",
              });
            }
          });
      }
    });
  };
  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilterStatus(event.target.value);
    refetch();
  };
  console.log("Payments", payments);
  return (
    <div className="bg-[#F6F6F6] pt-5 px-4 min-h-screen">
      <Helmet>
        <title>Admin | Manage Payments</title>
      </Helmet>
      <div className="max-w-7xl rounded-lg    ">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-xs md:text-3xl  md:leading-[43px] text-SecondaryColor">
            Total Payments: {payments.length}
          </h2>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{`payment`}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  defaultValue={""}
                  value={filterStatus}
                  onChange={(event) => handleFilter(event)}
                >
                  <MenuItem value="">payment status</MenuItem>
                  <MenuItem value={"pending"}>Pending</MenuItem>
                  <MenuItem value={"paid"}>Paid</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        {/* table */}

        <div>
          <div className="overflow-scroll md:overflow-y-auto md:overflow-x-auto max-w-[350px]  md:max-w-full rounded-t-lg mt-3 ">
            <table className="table space-y-3 font-Inter rounded-t-lg">
              {/* head */}
              <thead className="bg-gradient-to-tr from-SecondaryColor to-PrimaryColor text-white-auto  py-3 md:py-6">
                <tr className="text-white h-auto rounded-t-2xl py-3 md:py-6 ">
                  <th className="py-4 md:py-6">#</th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Name
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Paid Amount
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    status
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <tr key={payment._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>{payment.name}</span>
                      </div>
                    </td>
                    <td className="text-[#737373] text-base py-3 md:py-6 ">
                      <span>{payment.amount}</span>
                    </td>
                    <td className="text-[#737373] text-base">
                      <span>{payment.status}</span>
                    </td>
                    <td className="text-[#737373] text-base flex justify-center items-center">
                      <button onClick={(event) => handleChange(event, payment)}>
                        <BtnWithICon
                          text={"aceept"}
                          icon={<FcPaid />}
                          classname={`bg-SecondaryColor hover:bg-PrimaryColor border hover:border-SecondaryColor hover:text-SecondaryColor mt-0`}
                        ></BtnWithICon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePayments;
