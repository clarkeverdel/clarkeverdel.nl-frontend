import React, { Component } from 'react';
import Link from './Link';
import {
  TimelineMax,  Power0, Power1, Power2, Power3, gsap,
} from 'gsap';
import CustomEase from 'gsap/CustomEase';
import GSDevTools from 'gsap/GSDevTools';

// Register gsap modules
gsap.registerPlugin(GSDevTools, CustomEase);


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

    // Timeline
    this.buttonTimeline = gsap.timeline({
      id: 'buttonTimeline',
      delay: 0,
    });
    this.buttonHoverTimeline = gsap.timeline({
      id: 'buttonHoverTimeline',
      delay: 0,
    });

    CustomEase.create("custom", "M0,0 C0,0 0.0247,0.00211 0.03707,0.00714 0.05152,0.01303 0.06423,0.01886 0.07459,0.03038 0.10351,0.06254 0.12546,0.08977 0.14735,0.12981 0.17564,0.18153 0.18831,0.21797 0.20917,0.2765 0.26882,0.44384 0.29416,0.54487 0.35353,0.70816 0.36667,0.74432 0.37878,0.76627 0.39883,0.79818 0.41618,0.82579 0.42964,0.84466 0.45302,0.8665 0.48414,0.89557 0.50894,0.91582 0.54618,0.93582 0.58624,0.95734 0.61812,0.96822 0.6633,0.97943 0.71261,0.99167 0.74622,0.99524 0.79841,0.99842 0.87552,1.00313 1,1 1,1 ");
    this.customEase = "custom";
  }

  componentDidMount() {

    if (GSDevTools.getById('buttonTool')) {
      GSDevTools.getById('buttonTool').kill();
    }

    // GSDevTools.create({
    //   id: 'buttonTool',
    //   animation: 'buttonTimeline',
    //   paused: false,
    // });d

    const buttonTimeline = this.buttonTimeline;
    const buttonElement = this.buttonRef.current;
    const buttonElementPosition = buttonElement.getBoundingClientRect();

    // set button elements for tweening
    const buttonPart1 = buttonElement.children[0];
    const buttonPart2 = buttonElement.children[1];
    const buttonPart3_left = buttonElement.children[2].children[0];
    const buttonPart3_right = buttonElement.children[2].children[1];
    const buttonTextContainer = buttonElement.children[3];
    const buttonText = buttonElement.children[3].children[0];
    const buttonArrow = buttonElement.children[3].children[1];

    // Button animation
    // 52px is the width of the arrow + padding in the 2nd part
    buttonTimeline.fromTo(buttonElement,
    {
       x: '-50',
      textAlign: 'right'
    },
     {
      duration: 0.75,
      x: 0,
      textAlign: 'center',
      ease: this.customEase
    },
      '0.5');

    buttonTimeline.fromTo(buttonPart1,
      { x: -170 },
      {
        duration: 0.75, x: 0,
        ease: this.customEase
      }
    , '.5');

    buttonTimeline.fromTo(buttonPart2, {
      left: -30,
      clipPath: `inset(0% 0% 0% ${buttonElementPosition.width - 46}px)`
    }, {
      duration: 0.75,
      left: 0,
      ease: this.customEase,
      clipPath: `inset(0% 0% 0% 0px)`
    }, '0.5');

    buttonTimeline.fromTo(buttonTextContainer, {width: '20%', x: -23}, { width: '100%', x: 0}, '0.6');
    buttonTimeline.fromTo(buttonText, { clipPath: 'inset(0% 0% 0% 100%)' }, { duration: 0.4, ease: this.customEase, clipPath: 'inset(0% 0% 0% 0%)',}, '0.6');
    buttonTimeline.fromTo(buttonArrow, {x: 0 }, { duration: 0.75, x: 0 }, '0.5');
    // buttonTimeline.set(buttonElement, { border: '1px solid rgba(27,29,31,.4)'});

    this.buttonTimeline.play();

    if (this.buttonColor) {
      this.setState({
        buttonClass: `btn btn-action btn-animated btn-${this.buttonColor}`,
      });
    }
  }

  componentWillUnmount() {
    if (GSDevTools.getById('buttonTool')) {
      GSDevTools.getById('buttonTool').kill();
    }
  }

  handleHoverOn() {
    if (!this.buttonTimeline.isActive()) {
      const buttonTimeline = this.buttonHoverTimeline.seek(0);
      const buttonElement = this.buttonRef.current;

      // set button elements for tweening
      const buttonText = buttonElement.children[3];
      const buttonPart3_left = buttonElement.children[2].children[0];
      const buttonPart3_right = buttonElement.children[2].children[1];

      // Activate hover effect
      // buttonTimeline.to(buttonText, 0.25, { scale: 1.05, ease: this.customEase }, '0.25');
      gsap.to(buttonPart3_left, 0.375, { x: "0%", ease: this.customEase }, '0.25');
      gsap.to(buttonPart3_right,  0.375, { x: "0%", ease: this.customEase }, '0.25');

    }
  }

  handleHoverClick() {
    setTimeout(() => {
      this.handleHoverOff();
    }, 500)
  }

  handleHoverOff() {
    if (!this.buttonTimeline.isActive()) {
      const buttonTimeline = this.buttonHoverTimeline;
      // console.log(buttonTimeline)
      // buttonTimeline.reverse();
      const buttonElement = this.buttonRef.current;

      const buttonText = buttonElement.children[3];
      const buttonPart3_left = buttonElement.children[2].children[0];
      const buttonPart3_right = buttonElement.children[2].children[1];

      // Activate hover effect
      // buttonTimeline.to(buttonText, 0.25, { scale: 1, ease: this.customEase }, '0.25');
      gsap.to(buttonPart3_left, 0.375, { x: "-102%", ease: this.customEase }, '0.25');
      gsap.to(buttonPart3_right, 0.375, { x: "100%", ease: this.customEase }, '0.25');
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
        <Link href={`${this.props.href}`} as={this.props.as}>
          <button className={`${this.props.className} ${this.state.buttonClass}`}
                  id={this.props.id}
                  ref={this.buttonRef}
                  onMouseEnter={this.handleHoverOn.bind(this)}
                  onMouseLeave={this.handleHoverOff.bind(this)}
                  onClick={this.handleHoverClick.bind(this)}>
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
