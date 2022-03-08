import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import CategoryTitle from './CategoryTitle';
import FilterButton from './FilterButton';
import FilterSiderbar from './FilterSidebar';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  grid-template-rows: 1fr;
  font-family: 'Raleway', sans-serif;
`;
const FETCH_PRODUCTS = gql`
  query($selectedCategory: String!){ 
    category(input: {title: $selectedCategory}){
      products{
        id,
        inStock,
        name,
        prices{
          amount,
          currency {
            label,
            symbol
          }
        }
        gallery,
        description,
        category,
        attributes {
          name,
          type,
          items {
            displayValue,
            value,
            id
          }
        }
      }
    }
  }
`;
class PLP extends PureComponent {
  state = {
    showFilterSidebar: true,
  };

  setFilterSlidebar = (bool) => {
    this.setState((prevState) => ({
      ...prevState,
      showFilterSidebar: bool,
    }));
  };

  renderProducts = (data) => {
    return (
      data.category.products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })
    );
  };

  render() {
    let { selectedCategory } = this.props;
    selectedCategory = selectedCategory.toLowerCase();
    return (
      <Query query={FETCH_PRODUCTS} variables={{ selectedCategory }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <>
              <CategoryTitle />
              <FilterButton />
              <FilterSiderbar
                showFilterSidebar={this.state.showFilterSidebar}
                setFilterSlidebar={this.setFilterSlidebar}
              />
              <ProductsGrid>
                {this.renderProducts(data)}
              </ProductsGrid>
            </>
          );
        }}
      </Query>
    );
  }
}
PLP.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCategory: state.selectedCategory,
});
export default connect(mapStateToProps)(PLP);
