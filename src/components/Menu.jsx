import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Navbar, Nav, Collapse, NavbarBrand, NavItem,
} from 'reactstrap';

import Link from './Link';

import Close from '../../public/static/images/CLOSE.svg';
import Hamburger from '../../public/static/images/HAMBURGER.svg';
import Logo from '../../public/static/images/CV_LOGO.svg';
import InvertedLogo from '../../public/static/images/CV_LOGO_DIAP.svg';
import MailIcon from '../../public/static/images/MAIL_BTN.svg';

import wordpressMenu from '../js/fetchMenuItems';

const Menu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const getSlug = (url) => {
    const parts = url.split('/');
    return parts.length > 2 ? parts[parts.length - 2] : '';
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const renderMenuItems = (mobile) => {
    const menu = wordpressMenu;

    const menuItems = menu.items.map(item => {
      if (item.object === 'custom') {
        return (
          <NavItem className="d-flex align-items-center" key={item.ID}>
            <Link href={item.url} key={item.ID}>
              <a className={`nav-link ${router.asPath === `/${slug}` ? 'nav-link--active' : '' }`}><span>{item.title}</span></a>
            </Link>
          </NavItem>
        );
      }

      const slug = getSlug(item.url);

      return (
        <NavItem className="d-flex align-items-center" key={item.ID}>
          <Link
            as={`/${slug}`}
            href={`/${slug}`}
            key={item.ID}
          >
            <a className={`nav-link contact-nav-link ${router.asPath === `/${slug}` ? 'nav-link--active' : '' }`}>
              {(!mobile && slug === 'contact' ? <MailIcon /> : <span>{item.title}</span>)}
            </a>
          </Link>
        </NavItem>
      );
    });

    return menuItems;
  }

  return (
    <header>
      <Navbar dark expand="md" className="">

        <div className="container-fluid">

          <NavbarBrand className="d-inline-block p-0 mr-auto" href="/">
            <div className="logo position-relative img-fluid">
              <Link href="/">
                <div>
                  {(router.asPath === '/contact' ?
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
                  <a className={`nav-link ${router.asPath === `/` ? 'nav-link--active' : '' }`}>
                    <span>About me</span>
                  </a>
                </Link>
              </NavItem>
              { renderMenuItems() }
            </Nav>
          </Collapse>

          <button className="navbar-toggle" onClick={toggle}>
            <Hamburger />
          </button>
        </div>
      </Navbar>

      <div className={isOpen ? "mobile-menu visible" : 'mobile-menu'}>

        <div className="mobile-menu__header">
          <div className="mobile-menu__logo">
            <Logo id="mobile-menu__logo-img" />
          </div>
          <button className="mobile-menu__close" onClick={toggle}>
            <Close />
          </button>
        </div>

        <ul className="mobile-menu__container">
          <NavItem className="d-flex align-items-center">
            <Link href="/">
              <a className="nav-link">
                <span>Home</span>
              </a>
            </Link>
          </NavItem>

          { renderMenuItems(true) }
        </ul>
      </div>

    </header>
  );
}

export default Menu;
