import React, { Component } from 'react';

import {
  gsap, TweenMax, TimelineMax, Power0, Sine, Power3, Power4,
} from 'gsap';
import CustomEase from 'gsap/CustomEase';
import RoughEase from 'gsap/EasePack';

import ScrollToPlugin from 'gsap/ScrollToPlugin';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import GSDevTools from 'gsap/GSDevTools';

import Link from './Link';
import AnimatedButton from './AnimatedButton';

// SVG files
import BgIcon from '../public/static/images/BG_ICON.svg';
import AboutMe from '../public/static/images/AboutMe.svg';
import AboutMeArrow from '../public/static/images/ARROW_DOWN_1.svg';
import RecentWork from '../public/static/images/RecentWork.svg';
import RecentWorkArrow from '../public/static/images/ARROW_DOWN_2.svg';
import Cross from '../public/static/images/CROSS.svg';
import Triangle from '../public/static/images/TRIANGLE.svg';
import Circle from '../public/static/images/CIRCLE.svg';
import LogoNegative from '../public/static/images/CV_LOGO_BLACK.svg';
import CodeArrow from '../public/static/images/code_arrow.svg';

// Register gsap modules
gsap.registerPlugin(CSSRulePlugin, ScrollToPlugin, GSDevTools, RoughEase, CustomEase);


class HomeOpening extends Component {
  constructor(props) {
    super(props);
    this.loaderTween = null;
    this.handleArrowHover = this.handleArrowHover.bind(this);
    this.handleArrowLeave = this.handleArrowLeave.bind(this);

    this.circleRef = React.createRef('circle');
    this.crossRef = React.createRef('cross');
    this.triangleRef = React.createRef('triangle');

    // Barebone refs
    this.homeBareboneLogo = React.createRef('homeBareboneLogo');
    this.homeBareboneLogoContainer = React.createRef('homeBareboneLogoContainer');
    this.homeBareboneLogoFull = React.createRef('homeBareboneLogoFull');
    this.homeBareboneTitle = React.createRef('homeBareboneTitle');
    this.homeBareboneSubtitle = React.createRef('homeBareboneSubtitle');
    this.homeBareboneArrow1 = React.createRef('homeBareboneArrow1');
    this.homeBareboneArrow1_Svg = React.createRef('homeBareboneArrow1_Svg');
    this.homeBareboneArrow1_Txt = React.createRef('homeBareboneArrow1_Txt');
    this.homeBareboneArrow2 = React.createRef('homeBareboneArrow2');
    this.homeBareboneArrow2_Svg = React.createRef('homeBareboneArrow2_Svg');
    this.homeBareboneArrow2_Txt = React.createRef('homeBareboneArrow2_Txt');
    this.homeBareboneCode = React.createRef('homeBareboneCode');

    // Opening refs
    this.homeOpening = React.createRef('homeOpening');
    this.homeOpeningLogo = React.createRef('homeOpeningLogo');
    this.homeOpeningLogoContainer = React.createRef('homeOpeningLogoContainer');
    this.homeOpeningTitle = React.createRef('homeOpeningTitle');
    this.homeOpeningSubtitle = React.createRef('homeOpeningSubtitle');
    this.homeOpeningArrow1 = React.createRef('homeOpeningArrow1');
    this.homeOpeningArrow2 = React.createRef('homeOpeningArrow2');
    this.homeOpeningHomeWord1 = React.createRef('homeOpeningWord1');
    this.homeOpeningHomeWord2 = React.createRef('homeOpeningWord2');

    this.startHomeAnimation = this.startHomeAnimation.bind(this);

    // Timeline
    this.homeAnimationTimeline = gsap.timeline({
      id: 'homeAnimationTimeline',
      delay: 1,
    }).delay(1);

    CustomEase.create("custom", "M0,0 C0,0 0.0247,0.00211 0.03707,0.00714 0.05152,0.01303 0.06423,0.01886 0.07459,0.03038 0.10351,0.06254 0.12546,0.08977 0.14735,0.12981 0.17564,0.18153 0.18831,0.21797 0.20917,0.2765 0.26882,0.44384 0.29416,0.54487 0.35353,0.70816 0.36667,0.74432 0.37878,0.76627 0.39883,0.79818 0.41618,0.82579 0.42964,0.84466 0.45302,0.8665 0.48414,0.89557 0.50894,0.91582 0.54618,0.93582 0.58624,0.95734 0.61812,0.96822 0.6633,0.97943 0.71261,0.99167 0.74622,0.99524 0.79841,0.99842 0.87552,1.00313 1,1 1,1 ");
    this.customEase = "custom";
  }

  componentDidMount() {
    // start word animations -- starting on page load
    // this.animateWords();

    /** New timeline starts here * */
    this.startHomeAnimation();

    if (GSDevTools.getById('main')) {
      GSDevTools.getById('main').kill();
    }

    // GSDevTools.create({
    //   id: 'main',
    //   animation: 'homeAnimationTimeline',
    //   paused: true,
    // });
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
    const title = this.homeOpeningTitle.current;

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
    const homeOpening = this.homeOpening.current;
    const homeOpeningLogo = this.homeOpeningLogo.current;
    const homeOpeningLogoContainer = this.homeOpeningLogoContainer.current;
    const homeOpeningTitle = this.homeOpeningTitle.current;
    const homeOpeningSubtitle = this.homeOpeningSubtitle.current;

    const homeBareboneLogo = this.homeBareboneLogo.current;
    const homeBareboneLogoContainer = this.homeBareboneLogoContainer.current;
    const homeBareboneLogoFull = this.homeBareboneLogoFull.current;
    const homeBareboneTitle = this.homeBareboneTitle.current;
    const homeBareboneSubtitle = this.homeBareboneSubtitle.current;
    const homeBareboneCode = this.homeBareboneCode.current;

    const homeBareboneArrow1_Svg = this.homeBareboneArrow1_Svg.current;
    const homeBareboneArrow1_Txt = this.homeBareboneArrow1_Txt.current;

    const homeBareboneArrow2_Svg = this.homeBareboneArrow2_Svg.current;
    const homeBareboneArrow2_Txt = this.homeBareboneArrow2_Txt.current;

    const triangle = this.triangleRef.current;
    const trianglePosition = triangle.getBoundingClientRect();
    const circle = this.circleRef.current;
    const circlePosition = circle.getBoundingClientRect();
    const cross = this.crossRef.current;
    const crossPosition = cross.getBoundingClientRect();


    this.homeAnimationTimeline.to(homeOpening, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.5,
      ease: this.customEase
    }, 0);

    this.homeAnimationTimeline.to(homeBareboneLogoFull, {
      opacity: 0,
      duration: .3,
      ease: this.customEase
    }, .15);

    this.homeAnimationTimeline.to(homeBareboneTitle, {
      xPercent: 7,
      duration: 1,
      ease: this.customEase
    }, 0);
    this.homeAnimationTimeline.to(homeBareboneSubtitle, {
      opacity: 0,
      duration: .3,
      ease: this.customEase
    }, .35);

    this.homeAnimationTimeline.to(homeBareboneCode, {
      opacity: 0,
      ease: this.customEase,
      duration: .2
    }, .3);

    // Animate Left Arrow "About me"
    this.homeAnimationTimeline.to(homeBareboneArrow1_Svg, {
      clipPath: 'inset(185px 0 0 0)',
      // ease: this.customEase,
      duration: .3
    }, 0);

    this.homeAnimationTimeline.to(homeBareboneArrow1_Svg, {
      opacity: 0,
      ease: this.customEase,
      duration: .2
    }, .3);
    this.homeAnimationTimeline.to(homeBareboneArrow1_Txt, {
      y: 30,
      opacity: 0,
      ease: this.customEase,
      duration: .5
    }, 0);

    // Animate Right Arrow "Recent Work"
    this.homeAnimationTimeline.to(homeBareboneArrow2_Svg, {
      clipPath: 'inset(85px 0 0 0)',
      // ease: this.customEase,
      duration: .3
    }, 0);

    this.homeAnimationTimeline.to(homeBareboneArrow2_Svg, {
      opacity: 0,
      ease: this.customEase,
      duration: .2
    }, .3);
    this.homeAnimationTimeline.to(homeBareboneArrow2_Txt, {
      y: 30,
      opacity: 0,
      ease: this.customEase,
      duration: .5
    }, 0);

    // Animate logo CV on two levels
    const logoHeight = (window.innerHeight > 660 ? '606px' : '100%');
    this.homeAnimationTimeline.to(homeOpeningLogo, {
      height: logoHeight,
      alignItems: 'center',
      y: 0,
      ease: this.customEase,
      duration: 1
    }, 0);
    this.homeAnimationTimeline.to(homeOpeningLogoContainer, {
      height: '100%',
      ease: this.customEase,
      duration: 1
    }, 0);
    this.homeAnimationTimeline.to(homeBareboneLogo, {
      height: logoHeight,
      alignItems: 'center',
      y: 0,
      ease: this.customEase,
      duration: 1
    }, 0);
    this.homeAnimationTimeline.to(homeBareboneLogoContainer, {
      height: '100%',
      ease: this.customEase,
      duration: 1
    }, 0);


    // Blurry effect for new layover
    this.homeAnimationTimeline.from(homeOpeningTitle, {
      scale: 1.5,
      filter: 'blur(5px)',
      duration: 1.5,
      ease: this.customEase,
    },0);
    this.homeAnimationTimeline.from(homeOpeningSubtitle, {
      scale: 1.5,
      filter: 'blur(5px)',
      duration: 1.5,
      ease: this.customEase,
    },0);

    this.homeAnimationTimeline.from(triangle, {
      scale: 2.75,
      filter: 'blur(3px)',
      y: 0 - (trianglePosition.y * 1.25),
      x: -150,
      duration: 1.5,
      ease: this.customEase,
    }, 0);
    this.homeAnimationTimeline.from(circle, {
      scale: 2.75,
      filter: 'blur(3px)',
      y: 0 - (circlePosition.y * 1),
      x: window.innerWidth - circlePosition.x,
      duration: 1.5,
      ease: this.customEase,
    }, 0);
    // this.homeAnimationTimeline.from(cross, {
    //   scale: 2,
    //   duration: 1.5,
    //   ease: this.customEase,
    // }, 0);



    // Enable arrow animation -- Starting on page load
    this.animateArrows();
  }

  animateArrows() {
    // Arrow animations (Initial)
    const target1 = this.homeOpeningArrow1.current;
    const target2 = this.homeOpeningArrow2.current;

    this.homeAnimationTimeline.from(target1, 1.5, { opacity: 0, y: -100, ease: this.customEase }, '1');
    this.homeAnimationTimeline.from(target2, 1.5, { opacity: 0, y: -100, ease: this.customEase }, '1');
  }

  animateWords() {
    // Homepage words animations
    // Declare variables at first
    const words = ['Design', 'Development'];
    const centerT = this.homeOpeningHomeWord2.current;
    const leftT = this.homeOpeningHomeWord1.current;
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

        <div className="home-barebone align-content-center">
          <div className="home-barebone__logo" ref={this.homeBareboneLogoContainer}>
            <BgIcon ref={this.homeBareboneLogo}/>
          </div>
          <div className="home-barebone__container container-fluid">
            <div className="home-barebone__block">
              <div className="home-barebone__logofull">
                <LogoNegative ref={this.homeBareboneLogoFull}/>
              </div>
              <h1 className="home-barebone__title" ref={this.homeBareboneTitle}>
                <div className="home-barebone__title__line-1">
                  Creative
                </div>
                <div className="home-barebone__title__line-2">
                  Development
                </div>
              </h1>
              <div className="home-barebone__subtitle" ref={this.homeBareboneSubtitle}>
                <span className="label">design technical brilliance</span>
              </div>
              <div className="home-barebone__code" ref={this.homeBareboneCode}>
                <div className="home-barebone__code__wrapper">
                  <span><CodeArrow style={{width: 14, transform: 'rotate(180deg)', marginRight: 5}}/>script<CodeArrow style={{width: 14, marginLeft: 5}}/></span>
                  <span>const initHomepage = &#40;<strong>magic</strong>&#41; => &#123;</span>
                  <span style={{marginLeft: 10}}>this.renderBlock(magic)</span>
                  <span style={{marginLeft: 10}}>this.doSomeGsap(magic)</span>
                  <span>&#125;&#41;</span>
                  ... ... ...
                  <span><CodeArrow style={{width: 14, marginRight: 5, transform: 'rotate(180deg)'}}/>/script<CodeArrow style={{width: 14, marginLeft: 5}}/></span>
                </div>
              </div>
            </div>
          </div>

          <div className="home-barebone__vertical-link left-side"
            id="arrow-1"
            ref={this.homeBareboneArrow1}
            onMouseOver={this.handleArrowHover}
            onMouseLeave={this.handleArrowLeave}
          >
            <a href="#about-me" onClick={(e) => { this.scrollToSection(e, '#about-me'); }}>
              <AboutMe className="aboutme__text" ref={this.homeBareboneArrow1_Txt}/>
              <AboutMeArrow className="aboutme__arrow" ref={this.homeBareboneArrow1_Svg}/>
            </a>
          </div>

          <div
            className="home-barebone__vertical-link right-side"
            id="arrow-2"
            ref={this.homeBareboneArrow2}
            onMouseOver={this.handleArrowHover}
            onMouseLeave={this.handleArrowLeave}
          >
            <a href="#recent-work" onClick={(e) => { this.scrollToSection(e, '#recent-work'); }}>
              <RecentWork className="recentwork__text" ref={this.homeBareboneArrow2_Txt} />
              <RecentWorkArrow className="recentwork__arrow" ref={this.homeBareboneArrow2_Svg}/>
            </a>
          </div>
        </div>

        <div className="home-opening" ref={this.homeOpening} onMouseMove={this.onMouseMove.bind(this)}>

          <div className="home-opening__logo" ref={this.homeOpeningLogoContainer}>
            <BgIcon  ref={this.homeOpeningLogo}/>
          </div>

          <div className="home-opening__content">
            <div className="home-opening__container container">
              <div className="home-opening__block text-center">
                <h1 className="home-opening__title" ref={this.homeOpeningTitle}>
                  <div id="home-word-1" ref={this.homeOpeningHomeWord1}>

                      <span className="label">Creative</span>
                      <Circle className="circle" ref={this.circleRef} />
                      <Triangle className="triangle" ref={this.triangleRef} />

                  </div>
                  <div id="home-word-2" ref={this.homeOpeningHomeWord2}>Development</div>
                </h1>
                <div className="home-opening__subtitle" ref={this.homeOpeningSubtitle}>
                  <span className="label">design</span>
                  <Cross className="cross" ref={this.crossRef} />
                  <span className="label">technical brilliance</span>
                </div>

                <AnimatedButton className="home-opening__button" color="dark" text="Find out more" slug="services" apiRoute="page" href="/services" />

              </div>
            </div>

            <div
              className="home-opening__vertical-link left-side"
              id="arrow-1"
              ref={this.homeOpeningArrow1}
              onMouseOver={this.handleArrowHover}
              onMouseLeave={this.handleArrowLeave}
            >
              <a href="#about-me" onClick={(e) => { this.scrollToSection(e, '#about-me'); }}>
                <AboutMe className="aboutme__text" />
                <AboutMeArrow className="aboutme__arrow" />
              </a>
            </div>

            <div
              className="home-opening__vertical-link right-side"
              id="arrow-2"
              ref={this.homeOpeningArrow2}
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
