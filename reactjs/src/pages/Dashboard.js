import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import shoppingLogo from "../components/shopping-logo.png";
// import backgroundPic1 from "../components/avocado.png";
// import backgroundPic2 from "../components/bread3.jpg";
// import backgroundPic3 from "../components/egg-pic.webp";
// import backgroundPic4 from "../components/strawberry.jpeg";
// import backgroundPic4 from "../components/strawberry.jpeg";
import backgroundPic from "../components/food-removebg.png";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: "",
    class: "",
  });

  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getItems();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const getItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/items`);
      const data = await response.json();
      console.log(data);
      setItems(data);
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const createItem = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => getItems());
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createItem();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="dashboard">
      <header className="header-2">
        <div className="logo">
          <img className="logoImg" src={shoppingLogo} alt="shopping-logo" />
          <h3>Shopping Buddy</h3>
        </div>
        <div className="header-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard" className="home-link">
            Dashboard
          </Link>
        </div>
      </header>
      <main className="main-dash">
        <div className="pic-container">
          <img
            src={backgroundPic}
            alt="food-falling"
            className="backgroundPic"
          />
        </div>
        <h1 className="main-h1"> Shopping List Items</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <ul className="item-list">
          {items.map((item) => (
            <li key={item._id}>
              <Link style={{ color: "#551a8b" }} to={`/items/${item._id}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <form onSubmit={(event) => handleSubmit(event)} className="item-form">
          <div className="form-row">
            <div className="form-group">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleInputChanges}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleInputChanges}
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>
                Store:
                <input
                  type="text"
                  name="store"
                  value={values.store}
                  onChange={handleInputChanges}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleInputChanges}
                />
              </label>
            </div>
          </div>
          <input type="submit" value="Submit" className="submit-button" />
        </form>
      </main>
      <footer>@ 2024 Shopping Buddy</footer>
    </div>
  );
}

export default Dashboard;
