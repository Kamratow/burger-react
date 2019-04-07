import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';

const SideDrawer = ({ open, closed, isAuth }) => {
    // let attachedClasses = [classes.SideDrawer, classes.Close];
    // if (props.open) {
    //     attachedClasses = [classes.SideDrawer, classes.Open];
    // }
    const attachedClasses = [classes.SideDrawer, open ? classes.Open : classes.Close];
    return(
        <>
            <Backdrop show={open} clicked={closed} />
            <div className={attachedClasses.join(' ')} onClick={closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={isAuth} />
                </nav>
            </div>
        </>
    );
};

export default SideDrawer;