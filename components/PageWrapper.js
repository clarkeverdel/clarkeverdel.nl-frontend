import React from "react";
import { Config } from "../config.js";
import Router from 'next/router';

import { PageTransition } from 'next-page-transitions'

const PageWrapper = Comp => (
  class extends React.Component {
    static async getInitialProps(args) {
      const headerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const headerMenu = await headerMenuRes.json();
      return {
        headerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null),
      };
    }

    render() {
      return (
        <div>
          <PageTransition timeout={300} classNames="page-transition">
            <Comp {...this.props} />
          </PageTransition>
          <style jsx global>{`
            .page-transition-enter {
              opacity: 0;
            }
            .page-transition-enter-active {
              opacity: 1;
              transition: opacity 300ms;
            }
            .page-transition-exit {
              opacity: 1;
            }
            .page-transition-exit-active {
              opacity: 0;
              transition: opacity 300ms;
            }
          `}</style>
        </div>
      )
    }
  }
)

export default PageWrapper;
