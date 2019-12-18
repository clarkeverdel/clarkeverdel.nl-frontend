import React, { Component } from 'react';

class AboutMe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="wrapper about-me" id="about-me">
        <div className="about-me__wrapper">
          <div className="about-me__header">
            <h2 className="about-me__header__title">About me</h2>
          </div>
        </div>
      </section>
    );
  }
}

export default AboutMe;
