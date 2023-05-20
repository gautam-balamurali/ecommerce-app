import logo from "../../../assets/mockbee-logo.png";

const MockbeeDocumentation = () => {
  return (
    <header className="App-header">
      <img src={logo} alt="mockBee logo" width="180" height="180" />
      <h1 className="brand-title">
        Welcome to <span>mockBee!</span>
      </h1>
      <p className="brand-description">
        Fake Backend APIs for you to build awesome Frontend Projects!
      </p>
      <div className="links">
        <a href="https://mockbee.netlify.app/" target="_blank" rel="noreferrer">
          Explore mockBee
        </a>
        <a
          href="https://mockbee.netlify.app/docs/api/introduction"
          target="_blank"
          rel="noreferrer"
        >
          API Documentation
        </a>
        <a
          href="https://github.com/neogcamp/mockBee"
          target="_blank"
          rel="noreferrer"
        >
          Contribute
        </a>
      </div>
    </header>
  );
};

export default MockbeeDocumentation;
