import React, { Component } from 'react';
import AnimatedButton from './AnimatedButton';

// Images
import Image from 'next/image';

function AboutMe() {
  return (
    <section className="wrapper about-me" id="about-me">
      <div className="about-me__wrapper">
        <div className="about-me__header">
          <h2 className="about-me__title h1">About me</h2>

          <div className="about-me__photo">
            <Image src="/static/images/png/ClarkeAbout.png" alt="Clarke Verdel" width={1084} height={825} />
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
            I&apos;m a passionate developer who likes to build high performant, awesome looking websites. I have been working as a front-end developer since 2012 and having worked on many cool projects I can say that I love my job. Helping businesses reaching their online success is my motivation in delivering awesome stuff.
          </p>
          <p>
            Are you looking for someone that take things to the next level? Check out my latest projects and send me a message.
          </p>
        </div>
      </div>
      <AnimatedButton color="dark" text="Contact" href="/contact" as="/contact" className="about-me__button" />
    </section>
  );
}

export default AboutMe;
