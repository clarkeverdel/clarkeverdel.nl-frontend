import React, { Component } from 'react';

import {
  gsap, TweenMax, TimelineMax, Power0, Sine, Power3, Power4,
} from 'gsap/all';

import ScrollToPlugin from 'gsap/ScrollToPlugin';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import GSDevTools from 'gsap/GSDevTools';

import Link from './Link';
import AnimatedButton from './AnimatedButton';

import BgIcon from '../public/static/images/BG_ICON.svg';
import AboutMe from '../public/static/images/AboutMe.svg';
import AboutMeArrow from '../public/static/images/ARROW_DOWN_1.svg';
import RecentWork from '../public/static/images/RecentWork.svg';
import RecentWorkArrow from '../public/static/images/ARROW_DOWN_2.svg';
import Cross from '../public/static/images/CROSS.svg';
import Triangle from '../public/static/images/TRIANGLE.svg';
import Circle from '../public/static/images/CIRCLE.svg';

gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, GSDevTools);


class HomeOpening extends Component {
  constructor(props) {
    super(props);
    this.loaderTween = null;
    this.handleArrowHover = this.handleArrowHover.bind(this);
    this.handleArrowLeave = this.handleArrowLeave.bind(this);

    this.circleRef = React.createRef('circle');
    this.crossRef = React.createRef('cross');
    this.triangleRef = React.createRef('triangle');
    this.titleRef = React.createRef('title');

    this.background = React.createRef('background');
    this.backgroundLogo = React.createRef('backgroundLogo');
    this.startHomeAnimation = this.startHomeAnimation.bind(this);

    this.arrow1 = React.createRef('arrow1');
    this.arrow2 = React.createRef('arrow2');
    this.homeWord1 = React.createRef('homeWord1');
    this.homeWord2 = React.createRef('homeWord2');

    this.homeAnimationTimeline = new TimelineMax({
      delay: 1,
      id: 'homeAnimationTimeline',
    });
  }

  componentDidMount() {
    // Enable arrow animation -- Starting on page load
    this.animateArrows();

    // start word animations -- starting on page load
    // this.animateWords();

    /** New timeline starts here * */
    this.startHomeAnimation();

    if (GSDevTools.getById('main')) {
      GSDevTools.getById('main').kill();
    }

    GSDevTools.create({
      id: 'main',
      animation: 'homeAnimationTimeline',
      paused: true,
    });
  }

  componentWillUnmount() {
    if (GSDevTools.getById('main')) {
      GSDevTools.getById('main').kill();
    }
  }

  handleArrowHover(e) {
    // Arrow animations (Hover)
    const target = e.currentTarget;
    const hoverArrow = new TimelineMax({ repeat: 0 });
    hoverArrow.to(target, { duration: 0.5, y: +50 }, 0);
  }

  handleArrowLeave(e) {
    // Arrow animations (Hover)
    const target = e.currentTarget;
    const hoverArrow = new TimelineMax({ repeat: 0 });
    hoverArrow.to(target, { duration: 0.5, y: 0 }, 0);
  }

  onMouseMove(e) {
    // Forced to pick elements via findDOMNode
    // because the SVG element objects to no pass any DOM Data.
    const x = e.pageX - (screen.width / 2);
    const y = e.pageY - (screen.height / 2);
    let rotation = (x / 30);
    const cross = this.crossRef.current;
    const triangle = this.triangleRef.current;
    const circle = this.circleRef.current;
    const title = this.titleRef.current;

    if (e.pageX < (screen.width / 2)) {
      rotation = (x / 30);
    }

    gsap.to(circle, 2.5, { x: (x / 20), y: (y / 5), ease: Power4.easeOut }, 0);
    gsap.to(triangle, 2.5, { x: (x / 30), y: (y / 10), ease: Power3.easeOut }, 0);
    gsap.to(triangle, 2.5, { rotation, ease: Power0.easeOut }, 0);
    gsap.to(cross, 2.5, { x: (x / 30), y: (y / 10), ease: Power4.easeOut }, 0);
    gsap.to(title, 2.5, { x: (x / 60), y: (y / 40), ease: Power4.easeOut }, 0);
  }

  startHomeAnimation() {
    const background = this.background.current;
    const backgroundLogo = this.backgroundLogo.current;

    this.homeAnimationTimeline.set(background, {
      css: {
        height: 0,
      },
    });

    this.homeAnimationTimeline.to(background, 1, {
      css: {
        height: '100%',
      },
    });

    this.homeAnimationTimeline.set(backgroundLogo, {
      css: {
        height: 0,
      },
    });

    this.homeAnimationTimeline.to(backgroundLogo, 1, {
      css: {
        height: '90%',
      },
    });

    // this.homeAnimationTimeline.set('.triangle', {
    //   '-webkit-filter': 'blur(0px)',
    //   'filter': 'blur(0px)'
    // });
  }

  animateArrows() {
    // Arrow animations (Initial)
    const showArrow = new TimelineMax();
    const target1 = this.arrow1.current;
    const target2 = this.arrow2.current;

    showArrow.from(target1, 1.5, { opacity: 0, y: -50 }, '1.25');
    showArrow.from(target2, 1.5, { opacity: 0, y: -50 }, '1.25');
  }

  animateWords() {
    // Homepage words animations
    // Declare variables at first
    const words = ['Design', 'Development'];
    const centerT = this.homeWord2.current;
    const leftT = this.homeWord1.current;
    const W1 = leftT.offsetWidth;
    const W2 = centerT.offsetWidth;
    const tl = new TimelineMax({ repeat: -1 });

    // Start setting the offsets inside the Tween
    TweenMax.set('#home-word-2', { left: W1 });
    TweenMax.set('#right-txt', { left: W1 + W2 });

    for (let i = 0; i < words.length; i++) {
      centerT.innerHTML = words[i];

      tl.to('#right-txt', 2, { x: 120, ease: Sine.easeOut }, '+=3');
      tl.to('#home-word-2', 0.75, { text: { value: words[i] }, ease: Sine.easeInOut }, '-=0.1');
    }
  }

  scrollToSection(e, id) {
    e.preventDefault();
    gsap.to(window, { duration: 0.5, scrollTo: { y: id } });
  }

  render() {
    return (

      <div className="wrapper">

        <div className="d-flex flex-wrap justify-content-center align-items-center align-content-center home-opening" onMouseMove={this.onMouseMove.bind(this)}>

          <div className="home-opening__background" ref={this.background} />

          {/* <SVG */}
          {/*  src="/static/images/BG_ICON.svg" */}
          {/*  className="home-opening__backgroundlogo" innerRef={this.backgroundLogo} onLoad={this.startHomeAnimation} /> */}

          <div className="home-opening__backgroundlogo" ref={this.backgroundLogo}>
            <BgIcon />
          </div>


          <div className="home-opening-content">

            <div className="container">
              <div className="home-opening-block text-center">
                <h1 className="title" ref={this.titleRef}>
                  <div id="home-word-1" ref={this.homeWord1}>
                    <span>
                      <span className="label">Creative</span>
                      <Circle className="circle" ref={this.circleRef} />
                      <Triangle className="triangle" ref={this.triangleRef} />
                    </span>
                  </div>
                  <div id="home-word-2" ref={this.homeWord2}>Development</div>
                </h1>
                <div className="subtitle" ref="subtitle">
                  <span className="label">design</span>
                  <Cross className="cross" ref={this.crossRef} />
                  <span className="label">technical brilliance</span>
                </div>
                <Link href="/contact">
                  <AnimatedButton color="dark" text="Find out more" href="#" />
                </Link>
              </div>
            </div>

            <div
              className="vertical-link left-side"
              id="arrow-1"
              ref={this.arrow1}
              onMouseOver={this.handleArrowHover}
              onMouseLeave={this.handleArrowLeave}
            >
              <a href="#about-me" onClick={(e) => { this.scrollToSection(e, '#about-me'); }}>
                <AboutMe className="aboutme__text" />
                <AboutMeArrow className="aboutme__arrow" />
              </a>
            </div>

            <div
              className="vertical-link right-side"
              id="arrow-2"
              ref={this.arrow2}
              onMouseOver={this.handleArrowHover}
              onMouseLeave={this.handleArrowLeave}
            >
              <a href="#recent-work" onClick={(e) => { this.scrollToSection(e, '#recent-work'); }}>
                <RecentWork className="recentwork__text" />
                <RecentWorkArrow className="recentwork__arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeOpening;
