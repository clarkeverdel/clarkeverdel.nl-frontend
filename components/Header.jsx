import React, { Component } from 'react';
import Head from 'next/head';
import Link from './Link';
import Menu from './Menu';
import { Config } from '../config.js';
import stylesheet from '../src/styles/style.scss';
import 'bootstrap/scss/bootstrap.scss';

class Header extends Component {
  render() {
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

          <title>
            Clarke Verdel - Full Stack Developer
          </title>
        </Head>
      </div>
    );
  }
}

export default Header;
