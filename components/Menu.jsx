import React, { Component } from 'react';
import {withRouter} from 'next/router';

import {
  Navbar, Nav, Collapse, NavbarBrand, NavItem,
} from 'reactstrap';

import Link from './Link';

import Close from '../public/static/images/CLOSE.svg';
import Hamburger from '../public/static/images/HAMBURGER.svg';
import Logo from '../public/static/images/CV_LOGO.svg';
import InvertedLogo from '../public/static/images/CV_LOGO_DIAP.svg';
import MailIcon from '../public/static/images/MAIL_BTN.svg';

class Menu extends Component {

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  getSlug(url) {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { menu, router } = this.props;
    const self = this;

    const menuItems = menu.items.map((item, index) => {
      if (item.object === 'custom') {
        return (
          <NavItem className="d-flex align-items-center" key={item.ID}>
            <Link href={item.url} key={item.ID}>
              <a className="nav-link">{item.title}</a>
            </Link>
          </NavItem>
        );
      }
      const slug = self.getSlug(item.url);
      let actualPage = item.object === 'category' ? 'category' : 'post';
      if(slug === 'contact'){
        actualPage = 'contact';
      }

      return (
        <NavItem className="d-flex align-items-center" key={item.ID}>
          <Link
            as={`/${slug}`}
            href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
            key={item.ID}
            activeClassName="active"
          >
            <a className="nav-link contact-nav-link">
              {(slug === 'contact' ? <MailIcon /> : item.title)}
            </a>
          </Link>
        </NavItem>
      );

      //
      // return (
      //   <NavItem className="d-flex align-items-center nav-item-text" key={item.ID}>
      //     <Link
      //       as={`/${slug}`}
      //       href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
      //       key={item.ID}
      //       activeClassName="active"
      //     >
      //       <a className="nav-link">{item.title}</a>
      //     </Link>
      //   </NavItem>
      // );
    });

    return (

      <header>
        <Navbar dark expand="md" className="">

          <div className="container-fluid">

            <NavbarBrand className="d-inline-block p-0 mr-auto" href="/">
              <div className="logo position-relative img-fluid">
                <Link href="/">
                  <div>
                    {(router.query.slug === 'contact' ?
                      <InvertedLogo id="navbar-brand-img" />
                    : <Logo id="navbar-brand-img" />)}

                  </div>
                </Link>
              </div>
            </NavbarBrand>

            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="d-flex align-items-center" key={0}>
                  <Link href="/" key={0}>
                    <a className="nav-link">About me</a>
                  </Link>
                </NavItem>
                {menuItems}
              </Nav>
            </Collapse>

            <button className="navbar-toggle" onClick={this.toggle}>
              <Hamburger />
            </button>
          </div>
        </Navbar>

        <div className={(this.state.isOpen) ? "mobile-menu visible" : 'mobile-menu'}>

          <div className="mobile-menu__header">
            <div className="mobile-menu__logo">
              <Logo id="mobile-menu__logo-img" />
            </div>
            <button className="mobile-menu__close" onClick={this.toggle}>
              <Close />
            </button>
          </div>

          <ul className="mobile-menu__container">
            <NavItem className="d-flex align-items-center">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </NavItem>

            {menuItems}
          </ul>
        </div>

      </header>
    );
  }
}

export default withRouter(Menu);
