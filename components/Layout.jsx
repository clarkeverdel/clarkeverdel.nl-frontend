import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';


const layoutStyle = {
  margin: 0,
  padding: 0,
};

class Layout extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const {className, onMouseMove, title} = this.props;

    return (
      <div style={layoutStyle} className={className} onMouseMove={onMouseMove}>
        <Header title={title}/>
        {this.props.children}
        <Footer />
        <div className="menu-panel"></div>
      </div>
    );
  }
}

export default Layout;
