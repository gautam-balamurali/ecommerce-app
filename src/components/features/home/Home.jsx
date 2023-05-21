import { Link } from "react-router-dom";
import CategoriesListing from "./categories-listing/CategoriesListing";

const Home = () => {
  return (
    <>
      <h2>Home Page</h2>
      <Link to={"/products"}>
        <button>Go to store</button>
      </Link>
      <CategoriesListing />
    </>
  );
};

export default Home;
