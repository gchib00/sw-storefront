import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckmarkSVG from '../../../static/checkmark.svg';

const MainContainer = styled.div`
  height: 40px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
const Input = styled.input`
  display: none;
`;
const CheckboxEl = styled.label`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;
  transition: 180ms;
`;
const CheckmarkEl = styled.img`
  width: 100%;
  height: 100%;
`;
export default class Checkbox extends PureComponent {
  state = {
    checked: false,
  };

  handleChange = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
  };

  render() {
    const { item } = this.props;
    return (
      <MainContainer>
        {item.name}
        <CheckboxEl
          id="checkbox-el"
          htmlFor={item.name}
          style={this.state.checked ? { background: '#5ECE7B' } : { background: '#FFFFFF' }}
        >
          <Input type="checkbox" id={item.name} onChange={() => this.handleChange()} />
          <CheckmarkEl src={CheckmarkSVG} />
        </CheckboxEl>
      </MainContainer>
    );
  }
}
Checkbox.propTypes = {
  item: PropTypes.object.isRequired,
};
