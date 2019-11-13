import React, { Component } from "react";
import Link from "../components/Link";
import Head from "next/head";
import Menu from "./Menu.js";
import { Config } from "../config.js";
import stylesheet from '../src/styles/style.scss';
import "bootstrap/scss/bootstrap.scss";

class Header extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <Head>

                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <meta charSet="utf-8" />

                    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,500,700,900" rel="stylesheet" />

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
