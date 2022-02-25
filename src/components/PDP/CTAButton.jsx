import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addItemToCart } from '../../store/actions';

const Button = styled.button`
  padding: 16px 32px;
  width: 338px;
  height: 52px;
  background: #5ECE7B;
  color: white;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  border: none;
  margin: auto;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover { 
      transition: 300ms;
      opacity: 0.7;
  }
`;
class CTAButton extends PureComponent {
  componentDidUpdate(prevProps) { // save new state to localStorage
    if (prevProps.cartItems !== this.props.cartItems) {
      const updatedState = JSON.stringify(this.props.cartItems);
      localStorage.setItem('cartItems', updatedState);
    }
  }

  saveToCart = (productID, available, selectedAttributes) => {
    const uniqueItemID = productID + JSON.stringify(selectedAttributes.toString);
    const item = {
      productID,
      uniqueItemID,
      selectedAttributes,
    };
    this.props.addItemToCart(item);
    // this.saveToLocalStorage();
    return alert('item added to state');
  };
    // this.saveToLocalStorage();

  // saveToLocalStorage = () => {
  //   // console.log('this.props.cartITems=', this.props.cartItems);
  //   const updatedState = JSON.stringify(this.props.cartItems);
  //   return localStorage.setItem('cartItems', updatedState);
  // };

  render() {
    const { productID, available, selectedAttributes } = this.props;
    if (!available) {
      return null; // don't show CTAButton if product is out of stock
    }
    return (
      <Button
        onClick={() => this.saveToCart(productID, available, selectedAttributes)}
      >ADD TO CART
      </Button>
    );
  }
}
CTAButton.propTypes = {
  available: PropTypes.bool.isRequired,
  productID: PropTypes.string.isRequired,
  selectedAttributes: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
const mapDispatchToProps = () => ({
  addItemToCart,
});
export default connect(mapStateToProps, mapDispatchToProps())(CTAButton);
