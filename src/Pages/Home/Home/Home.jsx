import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import DiscountSlider from "../DiscountSlider/DiscountSlider";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>HealthBox</title>
      </Helmet>
      {/* body  */}
      <div>
        <Banner></Banner>
        <Category></Category>
        <DiscountSlider></DiscountSlider>
      </div>
    </div>
  );
};

export default Home;
