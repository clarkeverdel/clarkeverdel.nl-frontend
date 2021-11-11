import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import BodyClassName from 'react-body-classname';
import { gsap, Power4, Power3 } from 'gsap';

import Layout from '../src/components/Layout';
import PageWrapper from '../src/components/PageWrapper';
import Menu from '../src/components/Menu';
import ContactForm from '../src/components/Contact/Form';
import { Config } from '../config';

import Cross from '../public/static/images/CROSS_DARK.svg';
import Triangle from '../public/static/images/TRIANGLE_DARK.svg';
import Circle from '../public/static/images/CIRCLE_DARK.svg';

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

    this.circleRef = React.createRef('circle');
    this.crossRef = React.createRef('cross');
    this.triangleRef = React.createRef('triangle');

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

  onMouseMove(e) {
    // Forced to pick elements via findDOMNode
    // because the SVG element objects to no pass any DOM Data.
    const x = e.pageX - (screen.width / 2);
    const y = e.pageY - (screen.height / 2);
    let rotation = (x / 30);
    const cross = this.crossRef.current;
    const triangle = this.triangleRef.current;
    const circle = this.circleRef.current;

    // TODO: Use a QuickSetter from Gsap Docs to boost performance
    gsap.to(circle,{duration: 2.5, x: (x / 20), y: (y / 5), ease: Power4.easeOut });
    gsap.to(triangle,{duration: 2.5, x: (x / 30), y: (y / 10), rotation, ease: Power3.easeOut });
    gsap.to(cross,{duration: 2.5, x: (x / 30), y: (y / 10), rotation, ease: Power4.easeOut });
  }

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

  componentDidMount() {
    const tl = gsap.timeline({ repeat: 0});
    const darkIconColor = 'rgb(23,18,32)';

    // Change mail icon color
    tl.to('.MAIL_BTN_svg__mail_btn .MAIL_BTN_svg__st0', { fill: darkIconColor, duration: 1}, 0);

    // Change hamburger icon color
    tl.to('#HAMBURGER_svg__Group_7 path', { fill: darkIconColor, duration: 1}, 0);

  }


  render() {
    const { post } = this.props;

    if (!post.title) return <Error statusCode={404} />;

    return (

      <BodyClassName className="page-contact blue-bg">
        <PageWrapper>
          <Layout onMouseMove={this.onMouseMove.bind(this)} title={post.title.rendered}>

            <div className="contact-heading container-fluid">
              <h1 className="contact-heading__title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div
                className="text-dark lead contact-heading__subtitle"
                dangerouslySetInnerHTML={{
                  __html: post.content.rendered,
                }}
              />
            </div>
            <div className="container-fluid floating-elements-container">
              <Cross className="cross" ref={this.crossRef} />
              <Triangle className="triangle" ref={this.triangleRef} />
              <Circle className="circle" ref={this.circleRef} />
            </div>

            <ContactForm />

          </Layout>
        </PageWrapper>
      </BodyClassName>

    );
  }
}

export async function getStaticProps() {
  const res = await fetch(
    `${Config.apiUrl}/wp-json/postlight/v1/page?slug=contact`,
  );
  const post = await res.json();

  return {
    props: {
      post
    }
  };
}

export default Contact;
