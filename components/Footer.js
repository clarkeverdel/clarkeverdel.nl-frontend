import Link from "../components/Link";
import SVG from "react-inlinesvg";
import React from "react";

const hrStyle = {
    marginTop: 75
};

const Footer = () => (
    <footer className="footer">
        <div>
            &copy; {(new Date().getFullYear())}. All rights reserverd.
            <Link href="mailto:hello@clarkeverdel.nl?subject=Howdy Clarke, Let's partner up">
                <a><SVG src="/static/images/footer_logo.svg" className="footer__logo" /></a>
            </Link>


        </div>

    </footer>

);

export default Footer;
