import App from 'next/app';
import React from 'react';
import { PageTransition } from 'next-page-transitions';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <div>
        <PageTransition timeout={800} classNames="page-transition">
          <Component {...pageProps} key={router.query.slug} />
        </PageTransition>
        <style jsx global>
          {`
          .page-transition-enter .menu-panel {
            transform: translateX(-100%);
          }
          .page-transition-enter-active .menu-panel {
              animation: .8s cubic-bezier(.86,0,.07,1);
              animation-name: hundredToZero;
          }
          .page-transition-exit .menu-panel{
            transform: translateX(0%);
          }
          .page-transition-exit-active .menu-panel {
              animation: .8s cubic-bezier(.86,0,.07,1);
              animation-name: zeroToHundred;
          }
          .page-transition-enter-done .menu-panel {
            transform: translateX(-100%);
          }

          @keyframes zeroToHundred {
            0% {
              -webkit-transform: translateX(-100%);
              transform: translateX(-100%)
            }
            to {
              -webkit-transform: translateX(0%);
              transform: translateX(0%)
            }
          }

          @keyframes hundredToZero {
            0% {
              -webkit-transform: translateX(0%);
              transform: translateX(0%)
            }

            to {
              -webkit-transform: translateX(100%);
              transform: translateX(100%)
            }
          }
        `}
        </style>
      </div>
    );
  }
}
