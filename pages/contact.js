import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import Menu from "../components/Menu.js";
import BodyClassName from 'react-body-classname';
import { Config } from "../config.js";

import 'isomorphic-fetch';
import { Alert, Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

class Contact extends Component {

    constructor (props) {
      super(props);
        this.state = {
        'email': '',
        'name': '',
        'submitted': false,
        'message': '',
        'showForm': true,
        validate: {
          emailState: '',
        },
      }
      this.handleChange = this.handleChange.bind(this);
    }

    validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }


    submitForm(e) {
      e.preventDefault();
      // console.log(`Name: ${ this.state.name }`);
      // console.log(`Email: ${ this.state.email }`);

      const data = new FormData(e.target);

      fetch('/api/contact', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        res.status === 200 ? this.setState({ submitted: true, message: 'success' }) : ''
      });

    }

    handleChange = async (event) => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;
      await this.setState({
        [ name ]: value,
      });
    }

    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const res = await fetch(
            `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`
        );
        const post = await res.json();
        return { post };
    }

    componentDidMount(){
      //TweenLite.to("#circle", 1, {morphSVG:"#cv_logo_nieuw"});

      var tl = new TimelineMax({repeat:0,yoyo:false})
      tl.to("#SVGID_1_CVLOGO stop",1, {attr: {}, stopColor: 'rgb(0,0,0)'}, 0)
        .to("#SVGID_2_CVLOGO stop",1, {attr: {}, stopColor: 'rgb(0,0,0)'}, 0)
        .to("#SVGID_3_CVLOGO stop",1, {attr: {}, stopColor: 'rgb(0,0,0)'}, 0)
        .to("#cv_logo_nieuw .st4",1, {attr: {}, fill: 'rgb(0,0,0)'}, 0)
    }


    render() {

        const { email, name, message } = this.state;

        if (!this.props.post.title) return <Error statusCode={404} />;

        let showMessage;

        if(message == 'success'){
          this.state.showForm = false;
          showMessage =
            <div>
              <Alert color="success">
                Your message has been sent. I will contact you shortly.
              </Alert>
            </div>
          ;
        }else if(message == 'error') {
          this.state.hideForm = true;
          showMessage =
            <div>
              <Alert color="error">
                There are some errors in your form. Please check them before submitting again.
              </Alert>
            </div>
          ;

        }else {
          this.state.hideForm = true;
          showMessage = '';
        }

        return (

            <BodyClassName className="blue-bg">

              <Layout>

                <Menu menu={this.props.headerMenu} />

                <div className="container">
                  <h1 dangerouslySetInnerHTML={{__html: this.props.post.title.rendered }}></h1>
                  <div className="text-dark lead"
                      dangerouslySetInnerHTML={{
                          __html: this.props.post.content.rendered
                      }}
                  />

                  {showMessage}

                  { this.state.showForm ?
                  <Form className="form" onSubmit={ (e) => { this.submitForm(e) }}>

                    <FormGroup>
                      <Label for="name">Email</Label>
                      <Input type="text" name="name" id="name" placeholder="Naam" required
                      onChange={ (e) => {
                        this.handleChange(e)
                      } }
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="name" placeholder="E-mailadres" required
                      valid={ this.state.validate.emailState === 'has-success' }
                      invalid={ this.state.validate.emailState === 'has-danger' }
                      onChange={ (e) => {
                            this.validateEmail(e)
                            this.handleChange(e)
                          } }
                       />
                      <FormFeedback valid>
                        That's a tasty looking email you've got there.
                      </FormFeedback>
                      <FormFeedback>
                        Uh oh! Looks like there is an issue with your email. Please input a correct email.
                      </FormFeedback>
                    </FormGroup>

                    <Button color="dark">Submit</Button>
                  </Form> :

                  <div><Button color="dark">Send another mail</Button></div>
                  }

                </div>

              </Layout>

            </BodyClassName>

        );
    }
}

export default PageWrapper(Contact);
