import "./Home.css";
import CategoriesListing from "./categories-listing/CategoriesListing";
import CollectionsListing from "./collections-listing/CollectionsListing";
import SlideshowImages from "./slideshow-images-component/SlideshowImages";

const Home = () => {
  const images = [
    "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796157/cricify/ipl/csk-shop-banner_oudtqo.jpg",
    "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796159/cricify/ipl/kkr-shop-banner_ic2g3b.jpg",
    "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796160/cricify/ipl/punjab-shop-banner_egrquu.jpg",
  ];

  return (
    <div className="home-page">
      <div className="slideshow-images-section">
        <div className="slideshow-images-content">
          <SlideshowImages images={images} />
        </div>
      </div>
      <div className="collections-categories-section">
        <CollectionsListing />
        <CategoriesListing />
      </div>
    </div>
  );
};

export default Home;
