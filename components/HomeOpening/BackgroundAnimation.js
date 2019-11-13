import React, { Component } from "react";
import {TimelineMax, Power2, Power0 } from 'gsap';
import SVG from "react-inlinesvg";

class BackgroundAnimation extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render() {
    return(
        <div className="home-opening__background">
          <SVG
            src="/static/images/BG_ICON.svg"
            className="cv-background" ref={this.cvBackground} />
        </div>
    );
  }

}

export default BackgroundAnimation;
