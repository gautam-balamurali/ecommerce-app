import { Link } from "react-router-dom";

import "./Home.css";
import CategoriesListing from "./categories-listing/CategoriesListing";

const Home = () => {
  return (
    <>
      <h2>Home Page</h2>
      <Link to={"/products"}>
        <button>Go to store</button>
      </Link>
      <h3>Filter by Categories</h3>
      <CategoriesListing />
    </>
  );
};

export default Home;
