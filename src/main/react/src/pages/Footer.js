import React, {Component} from 'react';
import "./Footer.css"
class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <div className="column">
                        <a className="footer_title">Dijital Akademi</a>
                        <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.</a>

                    </div>
                    <div className="column">
                        <a className="footer_title">OTHER LINKS</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Ticket</a>
                        <a href="#">Contact Us</a>
                    </div>
                    <div className="column">
                        <a className="footer_title">SHORT CUT</a>
                        <a href="">Our Services</a>
                        <a href="">Our Blog</a>
                        <a href="">Our Projects</a>
                        <a href="">About Us</a>
                    </div>

                    <div className="column">
                        <a className="footer_title">İletişim</a>
                        <a title="Address"><i className="fa fa-map-marker"></i> 007, street, province/state, country -
                            zipcode</a>
                        <a href="emailto:" title="Email"><i className="fa fa-envelope"></i> email@serviceprovider.domain</a>
                        <a href="tel:" title="Contact"><i className="fa fa-phone"></i> +(x)-xxxx-xxxxx</a>
                    </div>

                    <div className="sub-footer">
                        © CopyRights 2021 - dijitalAkademi.com Tüm hakları gizlidir.
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;