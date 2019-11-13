import Header from "./Header";
import Footer from "./Footer";
import GsapTools from 'gsap-tools';

const layoutStyle = {
    margin: 0,
    padding: 0
};

const Layout = props => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
        <Footer />

        {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/plugins/ScrollToPlugin.min.js"></script>*/}
        {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/plugins/TextPlugin.min.js"></script>*/}
        {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/plugins/CSSRulePlugin.min.js"></script>*/}
        {/*<script src="//s3-us-west-2.amazonaws.com/s.cdpn.io/16327/MorphSVGPlugin.min.js?r=185"></script>*/}

        <GsapTools />

    </div>
);

export default Layout;
