import { Vortex } from "react-loader-spinner";

import "./CustomLoader.css";

const CustomLoader = () => {
  const handleOverlayClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className="loader-overlay" onClick={handleOverlayClick}>
      <div className="loader-container">
        <Vortex
          visible={true}
          height={80}
          width={80}
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={[
            "#50abf5",
            "#50abf5",
            "#50abf5",
            "#50abf5",
            "#50abf5",
            "#50abf5",
          ]}
        />
      </div>
    </div>
  );
};

export default CustomLoader;
