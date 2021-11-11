import SVG from 'react-inlinesvg';
import React from 'react';

const hrStyle = {
  marginTop: 75,
};

const Footer = () => (
  <footer className="footer">
    <div>
            &copy;
      {' '}
      {(new Date().getFullYear())}
. All rights reserverd.
      <a href="mailto:hello@clarkeverdel.nl?subject=Howdy Clarke, Let's partner up" className="footer__logo">
        <SVG src="/static/images/footer_logo.svg" className="footer__logo__img" />
      </a>


    </div>

  </footer>

);

export default Footer;
