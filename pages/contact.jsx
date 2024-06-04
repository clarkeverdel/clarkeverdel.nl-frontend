import React, { Component, useEffect, useRef, useState } from 'react';
import Error from 'next/error';
import BodyClassName from 'react-body-classname';
import { gsap, Power4, Power3 } from 'gsap';

import Layout from '../src/components/Layout';
import PageWrapper from '../src/components/PageWrapper';
import ContactForm from '../src/components/Contact/Form';
import { Config } from '../config';

import Cross from '../public/static/images/CROSS_DARK.svg';
import Triangle from '../public/static/images/TRIANGLE_DARK.svg';
import Circle from '../public/static/images/CIRCLE_DARK.svg';

const Contact = (props) => {
  const { post } = props;

  const circleRef = useRef('circle');
  const crossRef = useRef('cross');
  const triangleRef = useRef('triangle');

  const [records, setRecords] = useState({
    email: '',
    name: '',
    submitted: false,
    message: '',
    showForm: true,
    hideForm: false,
    validate: {
      emailState: ''
    }
  })

  const handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await setRecords({
      [name]: value,
    });
  };

  const onMouseMove = (e) => {
    // Forced to pick elements via findDOMNode
    // because the SVG element objects to no pass any DOM Data.
    const x = e.pageX - (screen.width / 2);
    const y = e.pageY - (screen.height / 2);
    let rotation = (x / 30);
    const cross = crossRef.current;
    const triangle = triangleRef.current;
    const circle = circleRef.current;

    // TODO: Use a QuickSetter from Gsap Docs to boost performance
    gsap.to(circle, { duration: 2.5, x: (x / 20), y: (y / 5), ease: Power4.easeOut });
    gsap.to(triangle, { duration: 2.5, x: (x / 30), y: (y / 10), rotation, ease: Power3.easeOut });
    gsap.to(cross, { duration: 2.5, x: (x / 30), y: (y / 10), rotation, ease: Power4.easeOut });
  }

  useEffect(() => {
    const tl = gsap.timeline({ repeat: 0 });
    const darkIconColor = 'rgb(23,18,32)';

    // Change mail icon color
    tl.to('.MAIL_BTN_svg__mail_btn .MAIL_BTN_svg__st0', { fill: darkIconColor, duration: 1 }, 0);

    // Change hamburger icon color
    tl.to('#HAMBURGER_svg__Group_7 path', { fill: darkIconColor, duration: 1 }, 0);
  })

  if (!post.title) return <Error statusCode={404} />;

  return (
    <BodyClassName className="page-contact blue-bg">
      <PageWrapper>
        <Layout onMouseMove={onMouseMove} title={post.title.rendered}>

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
            <Cross className="cross" ref={crossRef} />
            <Triangle className="triangle" ref={triangleRef} />
            <Circle className="circle" ref={circleRef} />
          </div>

          <ContactForm />

        </Layout>
      </PageWrapper>
    </BodyClassName>
  );
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
