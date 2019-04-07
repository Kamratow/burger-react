import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


// this component is not a HOC, it should be placed in components

const Layout = ({ isAuthenticated, children }) => {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

// why not one liner?
	const sideDrawerClosedHandler = () => setSideDrawerIsVisible(false);

	const sideDrawerToggleHandler = () => setSideDrawerIsVisible(!sideDrawerIsVisible);

	return (
		// aux not needed -> React.Fragment -> <> </>
		<Aux>
			<Toolbar
				isAuth={isAuthenticated}
				drawerToggleClicked={sideDrawerToggleHandler} />
			<SideDrawer
				isAuth={isAuthenticated}
				open={sideDrawerIsVisible}
				closed={sideDrawerClosedHandler} />
			<main className={classes.Content}>
				{children}
			</main>
		</Aux>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);