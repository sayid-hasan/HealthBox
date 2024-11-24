import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState("");
  const [filterRole, setFilterRole] = useState("");
  // filter

  const { data: users = [], refetch } = useQuery({
    queryKey: ["manageUsers", filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=${filterRole}`);
      return res?.data;
    },
  });
  // handle role
  const handleChange = (event, user) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make ${event.target.value}`,
    }).then((result) => {
      if (result.isConfirmed) {
        setRole(event.target.value);
        const updatedRole = { userRole: role };
        console.log(result.isConfirmed);
        axiosSecure.put(`/users/admin/${user.uid}`, updatedRole).then((res) => {
          console.log(res?.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Success",
              text: `Succesfully made ${event.target.value}`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilterRole(event.target.value);
    refetch();
  };
  // DELETE USER
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div className="bg-[#F6F6F6] pt-5 px-4">
      <Helmet>
        <title>Admin | Manage Users</title>
      </Helmet>
      <div className="max-w-7xl rounded-lg    ">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-xs md:text-3xl  md:leading-[43px] text-SecondaryColor">
            Total Users: {users.length}
          </h2>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{`user`}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  defaultValue={""}
                  value={filterRole}
                  onChange={(event) => handleFilter(event)}
                >
                  <MenuItem value="">user</MenuItem>
                  <MenuItem value={"seller"}>Seller</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
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
                    Email
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    role
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="text-[#737373] text-base py-3 md:py-6 ">
                      <span>{user.email}</span>
                    </td>
                    <td className="text-[#737373] text-base">
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            {user?.role ? user?.role : `user`}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            defaultValue={user?.role}
                            value={""}
                            onChange={(event) => handleChange(event, user)}
                          >
                            <MenuItem value="">user</MenuItem>
                            <MenuItem value={"seller"}>seller</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </td>
                    <th>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </th>
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

export default ManageUsers;
