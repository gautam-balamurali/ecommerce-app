import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h2>Home Page</h2>
      <Link to={"/products"}>
        <button>Go to store</button>
      </Link>
    </>
  );
};

export default Home;
