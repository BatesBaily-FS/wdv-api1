import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import shoppingLogo from "../components/shopping-logo.png";
import "../App.css";

function Item() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    class: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getItem();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const getItem = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/items/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log({ data });
      setValues({
        name: data.name,
        quantity: data.quantity,
        store: data.store,
        price: data.price,
      });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateItem();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="itemPage">
      <header className="header-2">
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
      <main className="Item-main">
        <h1 className="item-heading">Items To Buy</h1>
        <div className="itemInfo">
          <h5 className="itemName">{values && values.name}</h5>
          <h6 className="label">Quantity:</h6>
          <p>{values && values.quantity}</p>
          <h6 className="label">Store:</h6>
          <p>{values && values.store}</p>
          <h6 className="label">Price:</h6>
          <p>{values && values.price}</p>
          <button onClick={() => deleteItem()} className="delete-button">
            Delete Item
          </button>
        </div>
        <form onSubmit={(event) => handleSubmit(event)} className="item-form2">
          <div className="form-row2">
            <div className="form-group2">
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
            <div className="form-group2">
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
          <div className="form-row2">
            <div className="form-group2">
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
            <div className="form-group2">
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
        </form>
      </main>
      <footer>@ 2024 Shopping Buddy</footer>
    </div>
  );
}

export default Item;
