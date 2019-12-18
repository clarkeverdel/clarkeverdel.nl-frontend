import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';


const layoutStyle = {
  margin: 0,
  padding: 0,
};

class Layout extends Component {
  render() {
    return (
      <div style={layoutStyle}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
