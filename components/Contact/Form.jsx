import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';

import FormValidators from '../../functions/formValidators';

import {
  Alert, Button, Form, Input, FormGroup, Label, FormFeedback, Row, Col
} from 'reactstrap';

import 'isomorphic-fetch';
import AnimatedButton from "../AnimatedButton";


class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: '',
        email: '',
        reason: '',
        description: '',
      },
      submitted: false,
      message: '',
      showForm: true,
      buttonClicked: false,
    };

    // Set of validators for signin form
    this.validators = FormValidators;

    // This resets our form when navigating between views
    this.resetValidators();

    // Correctly Bind class methods to reacts class instance
    this.handleInputChange = this.handleInputChange.bind(this);
    this.displayValidationErrors = this.displayValidationErrors.bind(this);
    this.updateValidators = this.updateValidators.bind(this);
    this.resetValidators = this.resetValidators.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.resetForm = this.resetForm.bind(this);

    // this.handleChange = this.handleChange.bind(this);
    // this.resetForm = this.resetForm.bind(this);
  }


  /**
   * This function is called whenever a form input is changed
   * Which in turn updates the state of this component and validators
   */
  handleInputChange(event, inputPropName) {
    const self = this;
    const value = event.target.value;

    let newState = Object.assign({}, this.state);

    newState.userInfo[inputPropName] = value;

    this.setState(newState);

    self.updateValidators(inputPropName, value);
  }

  /**
   * This function handles the logic when submiting the form.
   * @TODO make an API request to authenticate the user
   */
  handleSubmit(e) {
    e.preventDefault();

    if(!this.isFormValid()){
      Object.keys(this.state.userInfo).forEach((fieldName) => {
        if(!this.validators[fieldName].valid){
          console.log('Error found, please fix the following field: ' + fieldName);
        }
      });
      this.setState({submitted: true, message: 'error'});
    }else {
      const data = this.state.userInfo;

      fetch('/api/contact', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => {
        res.status === 200 ? this.setState({ submitted: true, message: 'success' }) : '';
      });
    }
  }

  /**
   * This function updates the state of the validator for the specified validator
   */
  updateValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors = [rule.message];
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          this.validators[fieldName].errors = [rule.message];
          this.validators[fieldName].valid = false;
        }
      }
    });
  }

  // This function resets all validators for this form to the default state
  resetValidators() {
    Object.keys(this.validators).forEach((fieldName) => {
      this.validators[fieldName].errors = [];
      this.validators[fieldName].state = '';
      this.validators[fieldName].valid = false;
    });
  }

  // This function displays the validation errors for a given input field
  displayValidationErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = '';
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return <span className="form__element__error" key={index}>* {info}</span>;
      });

      return (
        <div className="form__element__errors">
          {errors}
        </div>
      );
    }
    return result;
  }

  // This method checks to see if the validity of all validators are true
  isFormValid() {
    let status = true;
    Object.keys(this.validators).forEach((field) => {
      if (!this.validators[field].valid) {
        status = false;
      }
    });
    return status;
  }

  resetForm() {
    let userInfo = {};
    Object.keys(this.validators).forEach((fieldName) => {
      Object.assign(userInfo,{[fieldName]: ''});
    });

    let state = this.setState({
      showForm: true,
      message: '',
      userInfo: userInfo
    });

    this.resetValidators();
  }

  render(props, state) {
    const { userInfo, message, formIsValid, buttonClicked } = this.state;
    let {showForm} = this.state;
    let showMessage;

    if(message === 'success') {
      showForm = false;
      showMessage = (
        <p className="lead text-center">
          Your message has been sent. I will contact you shortly.
        </p>
      );
    } else if(message === 'error') {
      // Do an extra live check to hide this message once fields are ready again
      if(!this.isFormValid()){
        showMessage = (
          <div className="text-center">
            There are some errors in your form. Please check them before submitting again.
          </div>
        );
      }

    }else {
      showMessage = '';
    }

    return (
      <div className="container">
        { showForm
          ? (
            <Form className="form form--contact form--animated" onSubmit={(e) => { this.handleSubmit(e); }} noValidate>
              <FormGroup row>
                <Col md={6} className="form__element--overflow">
                  <div className="form__element--slide-from-bottom">
                    <Label for="name" className="form__label">Name</Label>
                    <Input
                      value={this.state.name}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="What's your name?"
                      required
                      onChange={e => this.handleInputChange(e, 'name')}
                    />
                    { this.displayValidationErrors('name') }
                  </div>
                </Col>
                <Col md={6} className="form__element--overflow">
                  <div className="form__element--slide-from-bottom form__element--delay-1">
                    <Label for="email" className="form__label">Email</Label>
                    <Input
                      value={this.state.email}
                      type="email"
                      name="email"
                      id="name"
                      placeholder="What's your email address?"
                      required
                      onChange={event => this.handleInputChange(event, 'email')}
                    />
                    { this.displayValidationErrors('email') }
                    <FormFeedback valid>
                      That's a tasty looking email you've got there.
                    </FormFeedback>
                    <FormFeedback>
                      Uh oh! Looks like there is an issue with your email. Please input a correct email.
                    </FormFeedback>
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row tag="fieldset" className="form-group-radios form__element--overflow">
                <Col md={12}>
                  <div className="form__element--slide-from-bottom form__element--delay-2">
                    <legend className="form__legend">Clarke, I need you for</legend>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="reason"
                          value="React"
                          onClick={(e) => {
                            this.handleInputChange(e, 'reason');
                          }}
                          required />{' '}
                        <span>React</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="reason"
                          value="Magento"
                          onClick={(e) => {
                            this.handleInputChange(e, 'reason');
                          }}
                          required />{' '}
                        <span>Magento</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="reason"
                          value="Wordpress"
                          onClick={(e) => {
                            this.handleInputChange(e, 'reason');
                          }}
                          required />{' '}
                        <span>Wordpress</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="reason"
                          value="Consultancy"
                          onClick={(e) => {
                            this.handleInputChange(e,  'reason');
                          }}
                          required />{' '}
                        <span>Consultancy</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="reason"
                          value="Emergency Support"
                          onClick={(e) => {
                            this.handleInputChange(e,  'reason');
                          }}
                          required />{' '}
                        <span>Emergency Support</span>
                      </Label>
                    </FormGroup>

                    { this.displayValidationErrors('reason') }
                  </div>
                </Col>
              </FormGroup>

              <FormGroup row className="form-group-radios form__element--overflow">
                <Col md={12}>
                  <div className="form__element--slide-from-bottom form__element--delay-3">
                    <Label for="description" className="form__label">Description</Label>
                    <Input type="textarea"
                           name="description"
                           rows="6"
                           placeholder="Place your questions here and I'll get back to you shortly"
                           onChange={e => this.handleInputChange(e, 'description')}
                           required
                    />
                    { this.displayValidationErrors('description') }
                  </div>
                </Col>
              </FormGroup>

              {showMessage}

              <AnimatedButton className="form__button" color="blue" text="Send message" />
            </Form>
          )
          : <div style={{padding: '5vw 0'}} className='text-center'>
              {showMessage}
              <Button color="dark" onClick={this.resetForm}>Send another mail</Button>
            </div>}
      </div>

    );
  }
}

export default ContactForm;
