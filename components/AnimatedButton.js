import React, { Component } from "react";
import {TimelineMax, Power2, Power0 } from 'gsap';

class AnimatedButton extends Component {

  constructor(props){
    super(props);
    this.buttonColor = this.props.color;
    this.buttonText = this.props.text;
    this.buttonTimeline = new TimelineMax();
    this.buttonElement = null;



    this.state = {
        buttonClass: "btn btn-action btn-animated btn-dark",
        buttonRef: React.createRef(),
        lockHoverAnimation: true,
    };
  }

  componentDidMount(){
    this.buttonElement = this.state.buttonRef.current;

    // set button elements for tweening
    let buttonPart1 = this.buttonElement.children[0],
        buttonPart2 = this.buttonElement.children[1],
        buttonText = this.buttonElement.children[3].children[0],
        buttonArrow = this.buttonElement.children[3].children[1];

    // Button animation
    // 52px is the width of the arrow + padding in the 2nd part
    this.buttonTimeline.fromTo(this.buttonElement, .75, {width: "150px", x: "-50", textAlign: 'right', paddingLeft: '0', paddingRight: '0' }, {width: '215px', x: 0, textAlign: 'center', clearProps: 'paddingLeft, paddingRight',  ease:Power2.easeOut}, '0.5');
    this.buttonTimeline.fromTo(buttonPart1, .75, {x: -170}, {x: 0,  ease:Power2.easeOut}, '0.5');
    this.buttonTimeline.fromTo(buttonPart2, .75, {width: '52px', Percent: 100 }, {width: '100%', xPercent: 0,  ease:Power2.easeOut}, '0.5');
    this.buttonTimeline.fromTo(buttonText, .75, {width: 0 }, {width: '140px', ease:Power0.easeOut}, '0.5');
    this.buttonTimeline.fromTo(buttonArrow, .75, {x: -17}, {x: 0}, '0.5');
    this.buttonTimeline.play();

    if(this.buttonColor){
        this.setState({
          buttonClass: "btn btn-action btn-animated btn-"+ this.buttonColor
        });
    }
  }

  handleHoverOn() {
    if(this.buttonTimeline._active == false){
      let buttonTimeline = new TimelineMax(),
          buttonText = this.buttonElement.children[3],
          buttonPart3_left = this.buttonElement.children[2].children[0],
          buttonPart3_right = this.buttonElement.children[2].children[1];

      // Activate hover effect
      buttonTimeline.to(buttonText, .25, {scale: 1.1, ease: Power1.easeOut}, '0.25');
      buttonTimeline.to(buttonPart3_left, .25, {xPercent: 100,  ease: Power1.easeOut}, '0.25');
      buttonTimeline.to(buttonPart3_right, .25, {xPercent: -100,  ease: Power1.easeOut}, '0.25');
    }
  }

  handleHoverOff() {
    if(this.buttonTimeline._active == false) {
      let buttonTimeline = new TimelineMax(),
          buttonText = this.buttonElement.children[3],
          buttonPart3_left = this.buttonElement.children[2].children[0],
          buttonPart3_right = this.buttonElement.children[2].children[1];

      // Activate hover effect
      buttonTimeline.to(buttonText, .25, {scale: 1.01, ease: Power3.easeOut}, '0.25');
      buttonTimeline.to(buttonPart3_left, .25, {xPercent: 0, ease: Power2.easeOut}, '0.25');
      buttonTimeline.to(buttonPart3_right, .25, {xPercent: 0, ease: Power2.easeOut}, '0.25');
    }
  }

  render() {
    return(
    <div>
      <a href="#" className={this.state.buttonClass} id="animatedButton" ref={this.state.buttonRef} onMouseEnter={this.handleHoverOn.bind(this)} onMouseLeave={this.handleHoverOff.bind(this)}>
        <div className="btn__part1"></div>
        <div className="btn__part2"></div>
        <div className="btn__part3">
          <div className="slide slide-left"></div>
          <div className="slide slide-right"></div>
        </div>
        <div className="btn__text" data-text={this.buttonText}>
          <span className="text">{this.buttonText}</span>
          <span className="arrow"></span>
        </div>
      </a>
    </div>
    );
  }

}

export default AnimatedButton;
