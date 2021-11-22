import React, { useState, useEffect } from 'react';
import FormValidators from '../../../functions/formValidators';

import {
  Button, Form, Input, FormGroup, Label, FormFeedback, Col
} from 'reactstrap';

import AnimatedButton from "../AnimatedButton";

import confetti from 'https://cdn.skypack.dev/canvas-confetti';


const ContactForm = () => {
    const initialState = {
      fields: {
        name: '',
        email: '',
        reason: '',
        description: ''
      },
      submitted: false,
      message: '',
      showForm: true,
      buttonClicked: false,
      loading: false
    };

    const [formState, setFormState] = useState(initialState)

    const validators = FormValidators;

    useEffect(() => {
        // This resets our form when navigating between views
        resetValidators();
    }, []);

  /**
   * This function is called whenever a form input is changed
   * Which in turn updates the state of this component and validators
   */
  const handleInputChange = (event, inputPropName) => {
    const { value }  = event.target;

    // Variable object
    setFormState({
      ...formState,
      fields: {
        [inputPropName]: value
      }
    });

    updateValidators(inputPropName, value);
  }

  /**
   * This function handles the logic when submiting the form.
   * @TODO make an API request to authenticate the user
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target.name.value, e.target.email.value, e.target.reason.value, e.target.description.value)

    if(!isFormValid()){
      Object.keys(formState.fields).forEach((fieldName) => {
        updateValidators(fieldName, formState.fields[fieldName])
      });
      setFormState({
        ...formState,
        submitted: true,
        message: 'error'
      });
    }else {

      setFormState({
        ...formState,
        loading: true
      });

      const fieldData = {
          name: e.target.name.value,
          email: e.target.email.value,
          reason: e.target.reason.value,
          description: e.target.description.value
      };

      setTimeout(() => {
        fetch(process.env.MAILER_ENDPOINT, {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fieldData),
        }).then((res) => {
          if(res.status === 200){
            setFormState({
              ...formState,
              fields: fieldData,
              submitted: true,
              message: 'success',
              showForm: false,
              loading: false
            })
            fireConfetti();
          }
        });
      }, 3000)

    }
  }

  /**
   * This function updates the state of the validator for the specified validator
   */
  const updateValidators = (fieldName, value) => {
    validators[fieldName].errors = [];
    validators[fieldName].state = value;
    validators[fieldName].valid = true;
    validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          validators[fieldName].errors = [rule.message];
          validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          validators[fieldName].errors = [rule.message];
          validators[fieldName].valid = false;
        }
      }
    });
  }

  // This function resets all validators for this form to the default state
  const resetValidators = () => {
    Object.keys(validators).forEach((fieldName) => {
      validators[fieldName].errors = [];
      validators[fieldName].state = '';
      validators[fieldName].valid = false;
    });
  }

  // This function displays the validation errors for a given input field
  const displayValidationErrors = (fieldName) => {
    const validator = validators[fieldName];
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

    return '';
  }

  // This method checks to see if the validity of all validators are true
  const isFormValid = () => {
    let status = true;
    Object.keys(validators).forEach((field) => {
      if (!validators[field].valid) {
        status = false;
      }
    });
    return status;
  }

  const resetForm = () => {
    setFormState(initialState);
    resetValidators();
  }

  const fireConfetti = () => {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };

    const fire = (particleRatio, opts) => {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }


  const showMessage = () => {
    const { message } = formState;

    if(message === 'success') {
      fireConfetti();

      return (
        <p className="lead text-center">
          Your message has been sent. I will contact you shortly.
        </p>
      );

    } else if(message === 'error') {
      // Do an extra live check to hide this message once fields are ready again
      if(!isFormValid()){
        return (
          <div className="text-center">
            There are some errors in your form. Please check them before submitting again.
          </div>
        );
      }

    }

    return '';
  }

  return (
    <div className="container">
      { formState.showForm && !formState.loading && (
          <Form className="form form--contact form--animated" onSubmit={handleSubmit} noValidate>
            <FormGroup row>
              <Col md={6} className="form__element form__element--overflow">
                <div className="form__element--slide-from-bottom">
                  <Label for="name" className="form__label">Name</Label>
                  <Input
                    value={formState.fields.name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="What's your name?"
                    required
                    onChange={e => handleInputChange(e, 'name')}
                  />
                  { displayValidationErrors('name') }
                </div>
              </Col>
              <Col md={6} className="form__element form__element--overflow">
                <div className="form__element--slide-from-bottom form__element--delay-1">
                  <Label for="email" className="form__label">Email</Label>
                  <Input
                    value={formState.fields.email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="What's your email address?"
                    required
                    onChange={e => handleInputChange(e, 'email')}
                  />
                  { displayValidationErrors('email') }
                  <FormFeedback valid>
                    That&apos;s a tasty looking email you&apos;ve got there.
                  </FormFeedback>
                  <FormFeedback>
                    Uh oh! Looks like there is an issue with your email. Please input a correct email.
                  </FormFeedback>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row tag="fieldset" className="form-group-radios form__element form__element--overflow">
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
                          handleInputChange(e, 'reason');
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
                          handleInputChange(e, 'reason');
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
                          handleInputChange(e, 'reason');
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
                          handleInputChange(e,  'reason');
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
                          handleInputChange(e,  'reason');
                        }}
                        required />{' '}
                      <span>Emergency Support</span>
                    </Label>
                  </FormGroup>

                  { displayValidationErrors('reason') }
                </div>
              </Col>
            </FormGroup>

            <FormGroup row className="form-group-radios form__element form__element--overflow">
              <Col md={12}>
                <div className="form__element--slide-from-bottom form__element--delay-3">
                  <Label for="description" className="form__label">Description</Label>
                  <Input type="textarea"
                          name="description"
                          rows="6"
                          placeholder="Place your questions here and I'll get back to you shortly"
                          onChange={e => handleInputChange(e, 'description')}
                          required
                  />
                  { displayValidationErrors('description') }
                </div>
              </Col>
            </FormGroup>

            {showMessage}

            <AnimatedButton className="form__button" color="blue" text="Send message" />
          </Form>
        )}

        {!formState.showForm && (
            <div className='form--result'>
              {showMessage}
              <Button color="dark" onClick={resetForm}>Send another mail</Button>
            </div>
        )}

        {formState.loading && (
          <div className='form--result'>
            <div className="loader-ripple"><div></div><div></div></div>
          </div>
        )}

    </div>
  );
}

export default ContactForm;
