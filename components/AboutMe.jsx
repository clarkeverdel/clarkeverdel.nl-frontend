import React, { Component } from 'react';
import AnimatedButton from './AnimatedButton';

// Images
import Triangle from '../public/static/images/TRIANGLE.svg';
import Circle from '../public/static/images/CIRCLE.svg';

class AboutMe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="wrapper about-me" id="about-me">
        <div className="about-me__wrapper">
          <div className="about-me__header">
            <h2 className="about-me__title h1">About me</h2>

            <div className="about-me__photo">
              <img className="about-me__photo__image" src="/static/images/png/ClarkAbout.png" loading="lazy"/>
              <Triangle />
              <Circle />
              <img className="about-me__photo__mask" src="/static/images/png/ClarkAbout_Mask.png" loading="lazy"/>
            </div>

            <div className="about-me__subtitle">
              Clarke Verdel
            </div>
            <div className="about-me__lead">
              Creative developer
            </div>
          </div>
          <div className="about-me__content">
            <p>
              I'm a passionate developer who likes to build high performant, awesome looking websites. I have been working as a front-end developer since 2012 and having worked on many cool projects I can say that I love my job. Helping businesses reaching their online success is my motivation in delivering awesome stuff.
            </p>
            <p>
              Are you looking for someone that take things to the next level? Check out my latest projects and send me a message.
            </p>
          </div>
        </div>
        <AnimatedButton color="dark" text="Contact" href="/contact?slug=contact&apiRoute=page"  as="/contact" className="about-me__button"/>
      </section>
    );
  }
}

export default AboutMe;
