import React, { Component } from "react";
import Link from "../components/Link";
import { Config } from "../config.js";
import { TimelineMax } from 'gsap';

import SVG from 'react-inlinesvg';
import Loader from 'react-loaders';

import {
  Container, Navbar, Nav, NavbarToggler, Collapse, NavbarBrand, NavItem,
} from 'reactstrap';

class Menu extends Component {
  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount(){
    // Put the SVG tween inside this function

    // Arrow animations
    var menuTL = new TimelineMax();

    var navlink = document.getElementsByClassName('nav-link-text');
    var contactlink = document.getElementsByClassName('contact-icon');


    menuTL.from(navlink, 0.5, { opacity: 1, y: +50 }, '+=0.5');

    // var menuTW = new TweenMax();
    // menuTW.from(contactlink, 2.5, { opacity: 0, y: +200 }, '+=0.5');
    // menuTW.to(contactlink, 2.5, { y: -200, ease: Bounce.easeInOut}, '+=0.5');
    //arrowTL.from(target2, 1.5, { opacity: 0, y: -50 }, '1.25' );
  }

  getSlug(url) {
      const parts = url.split("/");
      return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  render() {

      const menuItems = this.props.menu.items.map((item, index) => {
        if (item.object === "custom") {
            return (
              <NavItem className="d-flex align-items-center" key={item.ID}>
                <Link href={item.url} key={item.ID}>
                    <a className="nav-link">{item.title}</a>
                </Link>
              </NavItem>
            );
        }
        const slug = this.getSlug(item.url);

        const actualPage = item.object === "category" ? "category" : "post";

        if(slug == 'contact'){

          return (
              <NavItem className="d-flex align-items-center" key={item.ID}>
                <Link
                    as={`/${slug}`}
                    href={`/contact?slug=${slug}&apiRoute=${item.object}`}
                    key={item.ID}
                    prefetch
                >
                    <a className="nav-link contact-nav-link">
                      <SVG
                          src="/static/images/MAIL_BTN.svg"
                          className="contact-icon"
                      >
                        Here's some optional content for browsers that don't support XHR or inline
                        SVGs. You can use other React components here too. Here, I'll show you.
                        // <img src="/path/to/myfile.png" />
                      </SVG>
                    </a>
                </Link>
              </NavItem>
          );
        }else {

        //   as={`/${item.object}/${slug}`}

          return (
              <NavItem className="d-flex align-items-center nav-item-text" key={item.ID}>
                <Link
                    as={`/${slug}`}
                    href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                    key={item.ID}
                    activeClassName='active'
                    prefetch
                >
                    <a className="nav-link">{item.title}</a>
                </Link>
              </NavItem>
          );
        }

      });

    return(

    <header>
        <Navbar dark expand="md" className="">

            <Container fluid>

                <NavbarBrand className="d-inline-block p-0 mr-auto" href="/">
                  <div className="logo position-relative img-fluid">
                    <Link href="/">
                      <div>

                      <svg version="1.1" id="cv_logo_nieuw" className="cv_logo_nieuw" x="0px" y="0px" width="167.2px" height="42.5px" viewBox="0 0 167.2 42.5">
                      <style type="text/css">
                         {`#cv_logo_nieuw .st0{fill:#FFFFFF;}
                        #cv_logo_nieuw .st1{fill:url(#SVGID_1_CVLOGO);}
                        #cv_logo_nieuw .st2{fill:url(#SVGID_2_CVLOGO);}
                        #cv_logo_nieuw .st3{fill:url(#SVGID_3_CVLOGO);}
                        #cv_logo_nieuw .st4{fill:#206BFF;}  ` }
                      </style>
                      <g>
                        <path className="st0" d="M81.7,12.7c-0.7,1.3-2.1,2.1-3.7,2.1c-2.4,0-4.3-1.9-4.3-4.3s1.9-4.3,4.3-4.3c1.6,0,3,0.9,3.7,2.1L85,6.5
                          c-1.4-2.4-4-4.1-7-4.1c-4.5,0-8.1,3.7-8.1,8.1s3.7,8.1,8.1,8.1c3,0,5.6-1.6,7-4.1L81.7,12.7z"/>
                        <polygon className="st0" points="97.3,14.7 97.3,14.7 92.8,14.7 92.8,2.6 88.9,2.6 88.9,18.5 95.1,18.5 	"/>
                        <polygon className="st0" points="164.9,36.1 161.1,36.1 157,36.1 157,24.1 153.2,24.1 153.2,40 162.7,40 	"/>
                        <polygon className="st0" points="165.7,6.5 165.7,2.6 153.9,2.6 153.9,18.5 165.7,18.5 165.7,14.7 157.8,14.7 157.8,12.5 163.5,12.5
                          163.5,8.6 157.8,8.6 157.8,6.5 	"/>
                        <polygon className="st0" points="149.4,28 149.4,24.1 137.6,24.1 137.6,40 149.4,40 149.4,36.1 141.5,36.1 141.5,34 147.2,34
                          147.2,30.1 141.5,30.1 141.5,28 	"/>
                        <path className="st0" d="M129.1,18.5h4.4l-2.8-4.8c1.6-1.1,2.7-2.9,2.7-5c0-3.3-2.7-6-6-6h-5.8v15.9h3.8v-3.8h1.4L129.1,18.5z
                           M125.6,6.5h1.9c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2h-1.9V6.5z"/>
                        <polygon className="st0" points="150.6,2.6 146.2,2.6 141.6,8.7 141.6,2.6 137.8,2.6 137.8,18.5 141.6,18.5 141.6,12.4 146.2,18.5
                          150.6,18.5 145,10.6 	"/>
                        <polygon className="st0" points="105.9,14.6 105.9,14.6 108.7,9.8 111.6,14.6 111.5,14.6 113.8,18.5 118.2,18.5 108.7,2.1 99.2,18.5
                          103.7,18.5 	"/>
                        <polygon className="st0" points="82.9,24.1 80.7,27.9 80.8,27.9 78,32.8 75.2,27.9 75.2,27.9 73,24.1 68.5,24.1 78,40.5 87.4,24.1 	"/>
                        <path className="st0" d="M126.7,24.1H121V40h3.8v0h1.9c4.4,0,7.9-3.5,7.9-7.9C134.6,27.7,131.1,24.1,126.7,24.1z M126.7,36.1h-1.9V28
                          h1.9c2.2,0,4.1,1.8,4.1,4.1C130.8,34.3,129,36.1,126.7,36.1z"/>
                        <g className="stroke-me">
                          <radialGradient id="SVGID_1_CVLOGO" cx="25.2912" cy="81.7785" r="50.7822" gradientUnits="userSpaceOnUse">
                            <stop offset="0.4" style={{ stopColor: "rgb(32, 107, 255)", stopOpacity:0 }}/>
                            <stop offset="0.99" style={{ stopColor: "rgb(32, 107, 255)" }}/>
                          </radialGradient>
                          <polygon className="st1" points="48.2,2.7 48.9,11.4 44.2,19.5 42.5,22.5 36.1,11.4 26,11.4 26,11.4 42.5,40 64,2.7 		"/>
                          <radialGradient id="SVGID_2_CVLOGO" cx="20.333" cy="21.2476" r="31.2083" gradientUnits="userSpaceOnUse">
                            <stop offset="0.4" style={{ stopColor:"rgb(32, 107, 255)", stopOpacity:0 }}/>
                            <stop offset="0.99" style={{ stopColor:"rgb(32, 107, 255)" }} />
                          </radialGradient>
                          <path className="st2" d="M36.1,11.4h12.8l5-8.7h-33l5.1,8.8C29,11.4,32.9,11.4,36.1,11.4L36.1,11.4z"/>
                          <linearGradient id="SVGID_3_CVLOGO" gradientUnits="userSpaceOnUse" x1="34.247" y1="26.7683" x2="24.0702" y2="33.2444">
                            <stop offset="0" style={{ stopColor: "rgb(32, 107, 255)", stopOpacity: 0.2 }} />
                            <stop offset="1" style={{ stopColor: "rgb(32, 107, 255)" }} />
                          </linearGradient>
                          <path className="st3" d="M29.4,25.3c-0.5,1.2-1.2,2.3-2.1,3.2c-0.9,0.9-2,1.6-3.2,2.1c-1.2,0.5-2.5,0.8-3.9,0.8v8.7
                            c2.5,0,5-0.5,7.3-1.5c2.2-0.9,4.2-2.3,5.9-4c1.3-1.3,2.5-2.8,3.3-4.5l-5.4-9.4L29.4,25.3z"/>
                          <path className="st4" d="M20.9,31.3c-0.2,0-0.4,0-0.6,0c-1.3,0-2.6-0.3-3.9-0.8c-1.2-0.5-2.2-1.2-3.2-2.1c-0.9-0.9-1.6-2-2.1-3.2
                            c-0.5-1.2-0.8-2.5-0.8-3.9c0-1.3,0.3-2.6,0.8-3.9c0.5-1.2,1.2-2.3,2.1-3.2c0.9-0.9,2-1.6,3.2-2.1c1.1-0.4,2.2-0.7,3.3-0.8
                            c0,0,0,0,0,0c0.2,0,0.3,0,0.5,0c0.2,0,0.3,0,0.5,0c0,0,0,0,0,0c1.2,0.1,2.3,0.3,3.3,0.8c1.2,0.5,2.2,1.2,3.2,2.1
                            c0.2,0.2,0.5,0.5,0.7,0.7l0,0c0,0,0,0,0,0c0.4,0.5,0.7,1,1,1.5c0.2,0.2,0.3,0.5,0.5,0.8l8-3.4c-0.9-2.2-2.3-4.2-4-5.9
                            c-1.7-1.7-3.7-3.1-5.9-4c-2.3-1-4.8-1.5-7.3-1.5c-2.5,0-5,0.5-7.3,1.5c-2.2,0.9-4.2,2.3-5.9,4C5.3,9.9,4,11.9,3,14.1
                            c-1,2.3-1.5,4.8-1.5,7.3c0,2.5,0.5,5,1.5,7.3c0.9,2.2,2.3,4.2,4,5.9c1.7,1.7,3.7,3.1,5.9,4c2.3,1,4.8,1.5,7.3,1.5
                            c0.4,0,0.7,0,1.1,0L20.9,31.3z"/>
                        </g>
                        <polygon className="st0" points="101.3,28 101.3,24.1 89.6,24.1 89.6,40 101.3,40 101.3,36.1 93.4,36.1 93.4,34 99.2,34 99.2,30.1
                          93.4,30.1 93.4,28 	"/>
                        <path className="st0" d="M112.6,40h4.4l-2.8-4.8c1.6-1.1,2.7-2.9,2.7-5c0-3.3-2.7-6-6-6h-5.8V40h3.8v-3.8h1.4L112.6,40z M109.1,28h1.9
                          c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2h-1.9V28z"/>
                      </g>
                      </svg>

                        {/* <SVG
                            src="/static/images/CV_LOGO.svg"
                            uniquifyIDs={false}
                            preloader={<Loader type="ball-clip-rotate-multiple" active />}
                        >
                          Here's some optional content for browsers that don't support XHR or inline
                          SVGs. You can use other React components here too. Here, I'll show you.
                          // <img src="/path/to/myfile.png" />
                        </SVG> */ }
                      </div>
                    </Link>
                  </div>
                </NavbarBrand>

                <NavbarToggler onClick={this.toggle} className="mr-2" />

                <Collapse isOpen={this.state.isOpen} navbar>

                  <Nav className="ml-auto" navbar>

                    {/*
                    <NavItem className="d-flex align-items-center">
                      <Link className="" href="/">
                        <a className="nav-link">Home</a>
                      </Link>
                    </NavItem>
                    */}

                    {menuItems}

                    {/*
                    <NavItem  className="d-flex align-items-center">
                      <Link href="/contact">
            	            <a className="menu-item-contact">
                            <SVG
                                src="/static/images/MAIL_BTN.svg"
                                preloader={<Loader type="ball-clip-rotate-multiple" active />}
                            >
                              Here's some optional content for browsers that don't support XHR or inline
                              SVGs. You can use other React components here too. Here, I'll show you.
                              // <img src="/path/to/myfile.png" />
                            </SVG>
                          </a>
            	        </Link>
                    </NavItem>
                    */}

                  </Nav>

                </Collapse>
            </Container>
        </Navbar>

      </header>
    )
  }


}

export default Menu;
