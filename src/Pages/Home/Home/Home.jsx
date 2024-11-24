import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import DiscountSlider from "../DiscountSlider/DiscountSlider";
import ContactUs from "../ContactUs/ContactUs";
import Reviews from "../Reviews/Reviews";
import useSeller from "../../../Hooks/useSeller";

const Home = () => {
  const [isSeller] = useSeller();
  console.log(isSeller);
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
        <Reviews></Reviews>
        <ContactUs></ContactUs>
      </div>
    </div>
  );
};

export default Home;
