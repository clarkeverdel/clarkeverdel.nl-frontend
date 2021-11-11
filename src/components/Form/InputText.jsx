import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  };

  render() {
    const {label, name, placeholder, type} = this.props;

    return (

      <div className="form-group">
        <label for={name}>{label}</label>
        <input
          type={(!type && "text")}
          name={name}
          id={name}
          placeholder={placeholder}
          required
          onChange={(e) => {
            this.handleChange(e);
          }}
        />
      </div>

    );
  }
}

InputText.propTypes = {
  inputType: PropTypes.oneOf(['text', 'email', 'phone', 'number']).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
};

export default InputText;
