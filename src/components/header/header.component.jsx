import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
//import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/FGlogo.svg';
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionDiv,
    OptionLink,
    TitleContainer,
} from './header.styles';

const LogoStyle = {
    width: '70px',
    height: '70px',
    position: 'absolute',
};
const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo style={LogoStyle} />
        </LogoContainer>
        <TitleContainer>Fortson Clothing Co.</TitleContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            {/** 
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            */}
            {currentUser ? (
                <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
            ) : (
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            )}
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
    </HeaderContainer>
);
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});
export default connect(mapStateToProps)(Header);
