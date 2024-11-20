import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Helmet } from "react-helmet-async";
import TableWithAction from "../../shared/TableWithAction/TableWithAction";

const ShopPage = () => {
  const axiosNonSecure = useAxios();
  const getData = async () => {
    const { data } = await axiosNonSecure.get("/allMedicines");
    return data;
  };
  const { data: allMedicines = [] } = useQuery({
    queryKey: ["allMedicines"],
    queryFn: async () => getData(),
  });
  console.log("shop page", allMedicines);
  return (
    <div>
      <Helmet>
        {" "}
        <title>Shop</title>
      </Helmet>
      <div>
        <TableWithAction rows={allMedicines}></TableWithAction>
      </div>
    </div>
  );
};

export default ShopPage;
