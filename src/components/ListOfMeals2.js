import React, { useState } from "react";
import "../style/Cards.css";
import { Link } from "react-router-dom";
import axios from "axios";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const ListOfMeals2 = () => {
  let count = 0;
  const [meals, setMeals] = useState([]);
  React.useEffect(() => {
    getMeals();
  }, [count]);

  const getMeals = () => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      // Extract the DATA from the received response
      .then((response) => response.data.meals)
      // Use this data to update the state
      .then((data) => {
        setMeals(data);
      });
  };
  console.log(meals);
  /*const [products] = useState([
     {
      name: "epic sword",
      image: "../images/weapon1.png",
      cost: "684",
      etat: "./images/denier.png",
    },
    {
      name: " old sword",
      image: "../images/weapon2.png",
      cost: "899",
      etat: "./images/denier.png",
    },
    {
      name: "Axe",
      image: "../images/weapon3.png",
      cost: "899",
      etat: "./images/denier.png",
    },
    {
      name: "war hammer",
      image: "../images/weapon4.png",
      cost: "714",
      etat: "./images/denier.png",
    },
    {
      name: "Classic bow",
      image: "../images/weapon5.png",
      cost: "689",
      etat: "./images/denier.png",
    },
    {
      name: "Dagger",
      image: "../images/weapon6.png",
      cost: "915",
      etat: "./images/denier.png",
    },
    {
      name: "bow",
      image: "../images/weapon7.png",
      cost: "842",
      etat: "./images/denier.png",
    },
    {
      name: "germanic spear",
      image: "../images/weapon8.png",
      cost: "1024",
      etat: "./images/denier.png",
    }, 
  ]);*/
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const addToCart = (product) => {
    setCart([...cart, { ...product }]);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const renderProducts = () => (
    <>
      {meals.map((product, index) => (
        <div className="product" key={index}>
          <h3>{product.strMeal}</h3>
          <img
            style={{ width: "100px", height: "100px" }}
            src={product.strMealThumb}
            alt={product.strMeal}
          />
          <h4>{product.cost}</h4>

          <button className="btn-card" onClick={() => addToCart(product)}>
            Ajoutez au panier
          </button>
        </div>
      ))}
    </>
  );

  const renderCart = () => (
    <div className="renderCartContainer">
      <>
        <Link to="/order">
          <button className="btn btn-default">Achat</button>
        </Link>
        <div className="products">
          {cart.map((product, index) => (
            <div className="product" key={index}>
              <h3>{product.strMeal}</h3>
              <img
                style={{ width: "100px", height: "100px" }}
                src={product.strMealThumb}
                alt={product.strMeal}
              />
              <button
                className="btn-card"
                onClick={() => removeFromCart(product)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </>
    </div>
  );

  return (
    <div>
      <header>
        <div className="container-header">
          <div className="panier">
            <img
              style={{ width: "50px", height: "50px" }}
              className="panier-img"
              src="../images/panier2.png"
              alt="panier"
              onClick={() => navigateTo(PAGE_CART)}
            />
            ({cart.length})
          </div>
        </div>
      </header>
      <div className="products">
        {page === PAGE_PRODUCTS && renderProducts()}
        {page === PAGE_CART && renderCart()}
      </div>
    </div>
  );
};

export default ListOfMeals2;
