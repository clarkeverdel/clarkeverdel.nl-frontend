import React, { Component } from 'react';
import Head from 'next/head';
import { Config } from '../config.js';
import stylesheet from '../src/styles/style.scss';
// ES Modules
import parse from 'html-react-parser';

class Header extends Component {

  render() {
    let {title} = this.props;
    if(!title){
      title = 'Clarke Verdel - Full Stack Developer'
    }else {
      title = title + ' | Clarke Verdel - Full Stack Developer'
    }

    return (
      <div>
        <Head>

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta charSet="utf-8" />

          <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet" />

          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

          <title>{parse(title)}</title>
        </Head>
      </div>
    );
  }
}

export default Header;
