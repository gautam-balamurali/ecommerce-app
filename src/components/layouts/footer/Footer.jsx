import {
  FaGithub,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const getCopyrightText = `© ${new Date().getFullYear()} | All Rights Reserved`;

  return (
    <footer className="footer">
      <div className="footer-text-container">
        <div className="company-info">
          <div className="contact-info">
            <h4>Contact Us</h4>
            <p>321, Random Place</p>
            <p>123456, India</p>
            <p>+91 1234567890</p>
            <p>customer@sochenge.com</p>
          </div>
          <div className="website-info">
            <h4>Sochenge</h4>
            <p>
              An e-commerce website that provides high quality services to its
              customers at affordable prices.
            </p>
          </div>
          <div className="resources-info">
            <h4>Resources</h4>
            <div className="resources-content">
              <div className="resources-contents-half">
                <p>Products</p>
                <p>About Us</p>
              </div>
              <div className="resources-contents-half">
                <p>Articles</p>
                <p>Documentation</p>
              </div>
            </div>
          </div>
        </div>
        <div className="developer-txt">
          <p>
            Developed with{" "}
            <span>
              <FaHeart size={12} />
            </span>{" "}
            by Gautam Balamurali
          </p>
        </div>
        <div className="copyrt-txt">
          <p>{getCopyrightText}</p>
        </div>
      </div>
      <ul className="social-media-icons unordered list-inline">
        <li>
          <a
            className="link"
            target="_blank"
            href="https://github.com/gautam-balamurali"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            className="link"
            target="_blank"
            href="https://www.linkedin.com/in/gautam-balamurali"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            className="link"
            target="_blank"
            href="https://twitter.com/codewithash"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        </li>
        <li>
          <a
            className="link"
            target="_blank"
            href="https://www.instagram.com/gautam.bm/"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
