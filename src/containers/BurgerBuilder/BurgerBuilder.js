import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const burgerBuilder = ({
	onInitIngredients,
  isAuthenticated,
  ings,
  onSetAuthRedirectPath,
  history,
  onInitPurchase,
  error,
  onIngredientAdded,
  onIngredientRemoved,
  price
}) => {
	//constructor(props) {
	//   super(props);
	//   this.state = {...};
	// }
	const  [purchasing, setPurchasing] = useState(false);

	useEffect(() => {
		onInitIngredients();
	}, []);

	// strange name for this function use
	const updatePurchaseState = (ingredients) => {
		const sum = Object.values(ingredients).reduce((a, b) => a + b)
		// const sum = Object.keys(ingredients)
		// 	.map(igKey => {
		// 		return ingredients[igKey];
		// 	})
		// 	.reduce((sum, el) => {
		// 		return sum + el;
		// 	}, 0);
		return sum > 0;
	}

	const purchaseHandler = () => {
		if (isAuthenticated) {
			setPurchasing(true);
		} else {
			onSetAuthRedirectPath('/checkout');
			history.push('/auth');
		}
	}

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	}

	const purchaseContinueHandler = () => {
		onInitPurchase();
		history.push('/checkout');
	}

	const disabledInfo = {
		...ings
	};
	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0
	}

	return (
		<>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				<OrderSummary
					ingredients={ings}
					price={price}
					purchaseCanceled={purchaseCancelHandler}
					purchaseContinued={purchaseContinueHandler}
				/>;
			</Modal>
			{ings ? (
				<>
					<Burger ingredients={ings} />
					<BuildControls
						ingredientAdded={onIngredientAdded}
						ingredientRemoved={onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={updatePurchaseState(ings)}
						ordered={purchaseHandler}
						isAuth={isAuthenticated}
						price={price}
					/>
				</>
			) : (
				<Spinner />
			)}
			{error && <p>Ingredients can't be loaded!</p>}
		</>
	);
};

const mapStateToProps = state => ({
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));