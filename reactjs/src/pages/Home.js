import "../App.css";
import { Link } from "react-router-dom";
import background from "../components/shopping1.webp";
import shoppingLogo from "../components/shopping-logo.png";

function Home() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img className="logoImg" src={shoppingLogo} alt="shopping-logo" />
          <h3>Shopping Buddy</h3>
        </div>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/dashboard" className="home-link">
            Dashboard
          </Link>
        </div>
      </header>
      <div className="background-container">
        <img src={background} alt="food-background" className="backgroundImg" />
        <div className="overlay"></div>
        <div className="home-text">
          <h1 className="home-heading">Your Digital Shopping List</h1>
          <img
            src={shoppingLogo}
            alt="shopping-cart-logo"
            className="largeLogo"
          />
          <p className="home-p">
            Welcome to Shopping Buddy! With our help you'll always have your
            shopping list handy, no matter what. Planning done right!
          </p>
        </div>
      </div>

      <footer>@ 2024 Shopping Buddy</footer>
    </div>
  );
}

export default Home;
