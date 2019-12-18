import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import BodyClassName from 'react-body-classname';
import { TimelineMax } from 'gsap';
import {Alert} from 'reactstrap';

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import ContactForm from '../components/Contact/Form';
import { Config } from '../config';
import stylesheet from '../src/styles/pages/contact.scss';

import Cross from '../public/static/images/CROSS.svg';
import Triangle from '../public/static/images/TRIANGLE.svg';
import Circle from '../public/static/images/CIRCLE.svg';

import 'isomorphic-fetch';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      submitted: false,
      message: '',
      showForm: true,
      hideForm: false,
      validate: {
        emailState: '',
      },
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

  submitForm(e) {
    e.preventDefault();

    const data = new FormData(e.target);

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

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }
    this.setState({ validate });
  }

  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`,
    );
    const post = await res.json();
    return { post };
  }

  componentDidMount() {
    // TweenLite.to("#circle", 1, {morphSVG:"#cv_logo_nieuw"});

    const tl = new TimelineMax({ repeat: 0, yoyo: false });
    tl.to('#SVGID_1_CVLOGO stop', 1, { attr: {}, stopColor: 'rgb(0,0,0)' }, 0)
      .to('#SVGID_2_CVLOGO stop', 1, { attr: {}, stopColor: 'rgb(0,0,0)' }, 0)
      .to('#SVGID_3_CVLOGO stop', 1, { attr: {}, stopColor: 'rgb(0,0,0)' }, 0)
      .to('#cv_logo_nieuw .st4', 1, { attr: {}, fill: 'rgb(0,0,0)' }, 0);
  }


  render(props, state) {
    const self = this;
    const { email, name, message, validate } = this.state;
    let {showForm, hideForm} = this.state;
    const { post, headerMenu } = this.props;

    if (!post.title) return <Error statusCode={404} />;

    let showMessage;

    if (message === 'success') {
      showForm = false;
      showMessage = (
        <div>
          <Alert color="success">
              Your message has been sent. I will contact you shortly.
          </Alert>
        </div>
      );
    } else if (message === 'error') {
      hideForm = true;
      showMessage = (
        <div>
          <Alert color="error">
              There are some errors in your form. Please check them before submitting again.
          </Alert>
        </div>
      );
    } else {
      hideForm = true;
      showMessage = '';
    }

    return (

      <BodyClassName className="blue-bg">

        <Layout>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

          <Menu menu={headerMenu} />

          <div className="contact-heading container-fluid">
            <h1 className="contact-heading__title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div
              className="text-dark lead contact-heading__subtitle"
              dangerouslySetInnerHTML={{
                __html: post.content.rendered,
              }}
            />
          </div>

          <ContactForm />

        </Layout>

      </BodyClassName>

    );
  }
}

export default PageWrapper(Contact);
