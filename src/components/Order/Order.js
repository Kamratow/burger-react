import React from "react";

import classes from "./Order.css";

const Order = ({ ingredients, price }) => (
  <div className={classes.Order}>
    <p>
      Ingredients:
      {Object.keys(ingredients).map(ingKey => (
        <span
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid #ccc",
            padding: "5px"
          }}
          key={ingKey}
        >
          {ingKey} ({ingredients[ingKey]})
        </span>
      ))}
    </p>
    <p>
      price<strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
    </p>
  </div>
);

export default Order;
