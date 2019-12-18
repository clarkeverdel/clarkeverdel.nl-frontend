import React, { Component } from 'react';
import Link from './Link';
import {
  TimelineMax, TweenMax, Power0, Power1, Power2, Power3, Percent,
} from 'gsap/all';


class AnimatedButton extends Component {
  constructor(props) {
    super(props);

    const classes = "btn btn-action btn-animated btn-dark";

    this.buttonColor = this.props.color;
    this.buttonText = this.props.text;
    this.buttonType = this.props.type;

    this.state = {
      buttonClass: classes,
      lockHoverAnimation: true,
    };

    this.buttonRef = React.createRef();
    this.buttonTimeline = new TimelineMax();
  }

  componentDidMount() {
    const { buttonTimeline } = this;
    const buttonElement = this.buttonRef.current;

    // set button elements for tweening
    const buttonPart1 = buttonElement.children[0];
    const buttonPart2 = buttonElement.children[1];
    const buttonTextContainer = buttonElement.children[3];
    const buttonText = buttonElement.children[3].children[0];
    const buttonArrow = buttonElement.children[3].children[1];

    // Button animation
    // 52px is the width of the arrow + padding in the 2nd part
    buttonTimeline.fromTo(buttonElement, {
      width: '150px', x: '-50', textAlign: 'right', paddingLeft: '0', paddingRight: '0',
    }, {
      duration: 0.75, width: '215px', x: 0, textAlign: 'center', clearProps: ['paddingLeft', 'paddingRight'], ease: Power2.easeOut,
    }, '0.5');
    buttonTimeline.fromTo(buttonPart1, { x: -170 }, { duration: 0.75, x: 0, ease: Power2.easeOut }, '0.5');
    buttonTimeline.fromTo(buttonPart2, { width: '52px', Percent: 100 }, {
      duration: 0.75, width: '100%', xPercent: 0, ease: Power2.easeOut,
    }, '0.5');
    buttonTimeline.fromTo(buttonText, { width: 0 }, { duration: 0.75, width: '140px', ease: Power0.easeOut }, '0.5');
    buttonTimeline.fromTo(buttonArrow, { x: -17 }, { duration: 0.75, x: 0 }, '0.5');
    this.buttonTimeline.play();

    if (this.buttonColor) {
      this.setState({
        buttonClass: `btn btn-action btn-animated btn-${this.buttonColor}`,
      });
    }
  }

  handleHoverOn() {
    if (!this.buttonTimeline.isActive()) {
      const buttonTimeline = new TimelineMax();
      const buttonElement = this.buttonRef.current;

      // set button elements for tweening
      const buttonText = buttonElement.children[3];
      const buttonPart3_left = buttonElement.children[2].children[0];
      const buttonPart3_right = buttonElement.children[2].children[1];

      // Activate hover effect
      buttonTimeline.to(buttonText, 0.25, { scale: 1.05, ease: Power1.easeOut }, '0.25');
      buttonTimeline.to(buttonPart3_left, 0.25, { xPercent: 100, ease: Power1.easeOut }, '0.25');
      buttonTimeline.to(buttonPart3_right, 0.25, { xPercent: -100, ease: Power1.easeOut }, '0.25');
    }
  }

  handleHoverOff() {
    if (!this.buttonTimeline.isActive()) {
      const buttonTimeline = new TimelineMax();
      const buttonElement = this.buttonRef.current;

      const buttonText = buttonElement.children[3];
      const buttonPart3_left = buttonElement.children[2].children[0];
      const buttonPart3_right = buttonElement.children[2].children[1];

      // Activate hover effect
      buttonTimeline.to(buttonText, 0.25, { scale: 1, ease: Power3.easeOut }, '0.25');
      buttonTimeline.to(buttonPart3_left, 0.25, { xPercent: 0, ease: Power2.easeOut }, '0.25');
      buttonTimeline.to(buttonPart3_right, 0.25, { xPercent: 0, ease: Power2.easeOut }, '0.25');
    }
  }

  render() {
    let button;

    let buttonPart1 = <div className="btn__part1" />;
    let buttonPart2 = <div className="btn__part2" />;
    let buttonPart3 = (
      <div className="btn__part3">
        <div className="slide slide-left" />
        <div className="slide slide-right" />
      </div>
    );
    let buttonText = (
      <div className="btn__text" data-text={this.buttonText}>
        <span className="text">{this.buttonText}</span>
        <span className="arrow" />
      </div>
    );


    if(this.props.href) {
      button = (
        <Link href={this.props.href}>
          <button className={`${this.props.className} ${this.state.buttonClass}`}
                  id={this.props.id}
                  ref={this.buttonRef}
                  onMouseEnter={this.handleHoverOn.bind(this)}
                  onMouseLeave={this.handleHoverOff.bind(this)}>
            {buttonPart1}
            {buttonPart2}
            {buttonPart3}
            {buttonText}
          </button>
        </Link>
      );
    }else {
      button = (
        <button type="submit"
                className={`${this.props.className} ${this.state.buttonClass}`}
                id={this.props.id}
                ref={this.buttonRef}
                onMouseEnter={this.handleHoverOn.bind(this)}
                onMouseLeave={this.handleHoverOff.bind(this)}>
          {buttonPart1}
          {buttonPart2}
          {buttonPart3}
          {buttonText}
        </button>
      );
    }

    return(button);
  }
}

export default AnimatedButton;
