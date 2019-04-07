import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
// why tabs instead of spaces?
// use a code formatter like prettier so you wont have to think about code formatting

// why not one liners ?
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

const Orders = React.lazy(() => {
	return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
	return import('./containers/Auth/Auth');
});


// component names should be capitalized!
// destructure props
const App = ({ onTryAutoSignup, isAuthenticated }) => {
	useEffect(() => {
		onTryAutoSignup();
	}, []);

	return (
		<div>
			<Layout>
				<Suspense fallback={<p>Loading...</p>}>
					<Switch>
						{isAuthenticated && (
							<>
								<Route path="/checkout" render={(props) => <Checkout {...props} />} />
								<Route path="/orders" render={(props) => <Orders {...props} />} />
								<Route path="/logout" component={Logout} />
							</>
						)}
						<Route path="/auth" render={(props) => <Auth {...props} />} />
						<Route path="/" exact component={BurgerBuilder} />
						<Redirect to="/" />
					</Switch>
				</Suspense>
			</Layout>
		</div>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
});

// https://react-redux.js.org/using-react-redux/connect-mapdispatch#two-forms-of-mapdispatchtoprops

const mapDispatchToProps = {
	onTryAutoSignup: actions.authCheckState
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
