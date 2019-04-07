import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = ({ history, ings, purchased, match }) => {
  const onCheckoutCancelledHandler = () => history.goBack();

  const onCheckoutContinuedHandler = () =>
    history.replace("/checkout/contact-data");

  // I'd try to put as much conditional rendering as possible (and readable) in return statement / render class methods
  return !ings || purchased ? (
    <Redirect to="/" />
  ) : (
    <>
      <CheckoutSummary
        ingredients={ings}
        // checkoutCancelled and checkoutContinued doesnt sound like handler props, rename them
        checkoutCancelled={onCheckoutCancelledHandler}
        checkoutContinued={onCheckoutContinuedHandler}
      />
      <Route path={match.path + "/contact-data"} component={ContactData} />
    </>
  );
};

// const Checkout = ({history, ings, purchased, match}) => {

//     const onCheckoutCancelledHandler = () => {
//         history.goBack();
//     }

//     const onCheckoutContinuedHandler = () => {
//         history.replace('/checkout/contact-data');
//     }

//     let summary = <Redirect to="/" />

//     // I'd rename ings to ingredients
//     if (ings) {
//         const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
//         summary = (
//             <div>
//                 {purchasedRedirect}
//                 <CheckoutSummary
//                     ingredients={ings}
//                     // checkoutCancelled and checkoutContinued doesnt sound like handler props, rename them
//                     checkoutCancelled={onCheckoutCancelledHandler}
//                     checkoutContinued={onCheckoutContinuedHandler} />
//                 <Route
//                     path={match.path + '/contact-data'}
//                     component={ContactData} />
//             </div>
//         );
//     }

//     return summary;
// };

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
