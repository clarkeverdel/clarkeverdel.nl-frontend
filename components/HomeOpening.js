import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {TweenMax, TimelineMax, TweenLite, Power2, Sine} from 'gsap';
import ScrollToPlugin from 'gsap/umd/ScrollToPlugin';
import CSSRulePlugin from 'gsap/umd/CSSRulePlugin';

import { add } from 'gsap-tools';

import Link from "../components/Link";
import SVG from 'react-inlinesvg';

import AnimatedButton from './AnimatedButton.js'

import Transition from 'react-addons-transition-group';

class HomeOpening extends Component {

  constructor(props){
    super(props);
    this.loaderTween = null;
    this.handleArrowHover = this.handleArrowHover.bind(this);
    this.handleArrowLeave = this.handleArrowLeave.bind(this);

    this.state = {
      animationEnabled: false
    };

    this.circleRef = React.createRef('circle');
    this.crossRef = React.createRef('cross');
    this.triangleRef = React.createRef('triangle');
    this.titleRef = React.createRef('title');

    this.cvBackground = React.createRef('cvBackground');
    this.startHomeAnimation = this.startHomeAnimation.bind(this);

    this.arrow1 = React.createRef('arrow1');
    this.arrow2 = React.createRef('arrow2');
    this.homeWord1 = React.createRef('homeWord1');
    this.homeWord2 = React.createRef('homeWord2');

    this.homeAnimationTimeline = new TimelineMax({
      delay: 1
    });
  }

  componentDidMount(){

    // Enable arrow animation -- Starting on page load
    this.animateArrows();

    // start word animations -- starting on page load
    //this.animateWords();

    /** New timeline starts here **/
    //this.startHomeAnimation();

    this.disposer = add(this.homeAnimationTimeline);
  }

  startHomeAnimation(){
    const rule = CSSRulePlugin.getRule(".home-opening__background:before");
    let cvBackground = this.cvBackground.current;

    this.homeAnimationTimeline.set(rule, {
      cssRule: {
        height: 0
      }
    });

    this.homeAnimationTimeline.to(rule, 1, {
      cssRule: {
        height: "100%"
      }
    });

    this.homeAnimationTimeline.set(cvBackground, {
      css: {
        height: 0
      }
    });

    this.homeAnimationTimeline.to(cvBackground, 1, {
      css: {
        height: "90%"
      }
    });

    // this.homeAnimationTimeline.set('.triangle', {
    //   '-webkit-filter': 'blur(0px)',
    //   'filter': 'blur(0px)'
    // });
  }

  componentWillUnmount() {
    this.disposer();
  }

  handleArrowHover(e) {
    // Arrow animations (Hover)
    let target = e.currentTarget,
        hoverArrow = new TimelineMax({repeat: 0});
    hoverArrow.to(target, 0.5, { y: +50 }, 0);
  }
  handleArrowLeave(e) {
    // Arrow animations (Hover)
    let target = e.currentTarget,
        hoverArrow = new TimelineMax({repeat: 0});
    hoverArrow.to(target, 0.5, { y: 0 }, 0);
  }

  onMouseMove(e){
    // Forced to pick elements via findDOMNode because the SVG element objects to no pass any DOM Data.
    let x = e.pageX - (screen.width / 2),
        y = e.pageY - (screen.height / 2),
        rotation = (x / 30),
        cross = this.crossRef.current,
        triangle = this.triangleRef.current,
        circle = this.circleRef.current,
        title = this.titleRef.current;

    if(e.pageX < (screen.width / 2)){
      rotation = (x / 30);
    }

    TweenMax.to(circle, 2.5, {x: (x / 20) , y: (y / 5), ease: Power4.easeOut}, 0);
    TweenMax.to(triangle, 2.5, {x: (x / 30), y: (y / 10), ease: Power3.easeOut}, 0);
    TweenMax.to(triangle, 2.5, {rotation: rotation, ease: Power0.easeOut}, 0);
    TweenMax.to(cross, 2.5, {x: (x / 30), y: (y / 10), ease: Power4.easeOut}, 0);
    TweenMax.to(title, 2.5, {x: (x / 60), y: (y / 40), ease: Power4.easeOut}, 0);
  }

  animateArrows(){
    // Arrow animations (Initial)
    let showArrow = new TimelineMax(),
      target1 = this.arrow1.current,
      target2 = this.arrow2.current;

    showArrow.from(target1, 1.5, { opacity: 0, y: -50 }, '1.25');
    showArrow.from(target2, 1.5, { opacity: 0, y: -50 }, '1.25');
  }

  animateWords(){
    // Homepage words animations
    // Declare variables at first
    let words = ['Design','Development'],
      centerT = this.homeWord2.current,
      leftT = this.homeWord1.current,
      W1 = leftT.offsetWidth,
      W2 = centerT.offsetWidth,
      tl = new TimelineMax({repeat:-1});

    // Start setting the offsets inside the Tween
    TweenMax.set('#home-word-2',{left:W1});
    TweenMax.set('#right-txt',{left:W1+W2});

    for(let i=0; i < words.length; i++){
      centerT.innerHTML = words[i];
      let W3 = centerT.offsetWidth;

      tl.to('#right-txt', 2, {x:120,ease:Sine.easeOut}, '+=3');
      tl.to('#home-word-2', 0.75, {text:{value:words[i]}, ease:Sine.easeInOut}, '-=0.1');
    };
  }

  scrollToSection(e, id){
    e.preventDefault();
    TweenLite.to(window, .5, {scrollTo: id});
  };

  render(){

    return(

        <div className="wrapper">

          <div className="d-flex flex-wrap justify-content-center align-items-center align-content-center home-opening" onMouseMove={this.onMouseMove.bind(this)}>

            <div className="home-opening__background">
                <SVG
                    src="/static/images/BG_ICON.svg"
                    className="cv-background" innerRef={this.cvBackground} onLoad={this.startHomeAnimation} />
            </div>

            <div className="home-opening-content">

              <div className="container">
                <div className="home-opening-block text-center">
                  <h1 className="title" ref={this.titleRef}>
                    <div id="home-word-1" ref={this.homeWord1}>
                      <span>
                        <span className="label">Creative</span>
                        <SVG src="/static/images/CIRCLE.svg" className="circle" innerRef={this.circleRef} />
                        <SVG src="/static/images/TRIANGLE.svg" className="triangle" innerRef={this.triangleRef}  />
                      </span>
                    </div>
                    <div id="home-word-2" ref={this.homeWord2}>Development</div>
                  </h1>
                  <div className="subtitle" ref="subtitle">
                    <span className="label">design</span>
                    <SVG src="/static/images/CROSS.svg" className="cross" innerRef={this.crossRef} />
                    <span className="label">technical brilliance</span>
                  </div>
                  <Link href="/contact">
                    <AnimatedButton color="dark" text="Find out more" />
                  </Link>
                </div>
              </div>

              <div className="vertical-link left-side" id="arrow-1" ref={this.arrow1} onMouseOver={this.handleArrowHover}
                   onMouseLeave={this.handleArrowLeave}>
                <a href="#about-me" onClick={(e) => {this.scrollToSection(e, "#about-me")}}>
                  <SVG src="/static/images/AboutMe.svg"/>
                  <SVG src="/static/images/ARROW_DOWN_1.svg"/>
                </a>
              </div>

              <div className="vertical-link right-side" id="arrow-2" ref={this.arrow2} onMouseOver={this.handleArrowHover}
                   onMouseLeave={this.handleArrowLeave}>
                <a href="#recent-work" onClick={(e) => {this.scrollToSection(e, "#recent-work")} }>
                    <SVG src="/static/images/RecentWork.svg"/>
                    <SVG src="/static/images/ARROW_DOWN_2.svg"/>
                </a>
              </div>
            </div>
          </div>
        </div>
    );
  }

}

export default HomeOpening;
