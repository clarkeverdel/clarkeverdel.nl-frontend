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
              Sed quat. Icia inim vendis ut pelescid maio eicipsant atemquia im essin et pliquodis eum vendam sequibus autectur, cuptaqui cum faccum exeror as qui tesendam, to quia ex et aut occumqu odisitatur? Ceperem faceperore secus verruptatum dicias vel et quianda nosti qui que duciisi molendit earis a dolestium ex exerovitae mollupt ataquunt.
            </p>
          </div>
        </div>
        <AnimatedButton color="dark" text="Contact" href="/contact?slug=contact&apiRoute=page"  as="/contact" className="about-me__button"/>
      </section>
    );
  }
}

export default AboutMe;
