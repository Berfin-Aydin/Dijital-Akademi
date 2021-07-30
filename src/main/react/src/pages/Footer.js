import React, {Component} from 'react';
// import "./Footer.css"

class Footer extends Component {
    render() {
        return (
            <div className="position-absolute " style={{marginBottom: "0"}} >
                <footer className="footer mt-5 py-5 bg-light " style={{width: "119rem", paddingBottom:"0px"}}>
                    <div className="row">
                        <div className="col-4 col-md p-ml-0">
                            <h5>Features</h5>
                            <ul className="list-unstyled text-small">
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Cool
                                    stuff</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Random
                                    feature</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Team
                                    feature</a></li>

                            </ul>
                        </div>
                        <div className="col-4 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Resource</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Resource
                                    name</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Another
                                    resource</a></li>

                            </ul>
                        </div>
                        <div className="col-4 col-md">
                            <h5>About</h5>
                            <ul className="list-unstyled text-small">
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Team</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Locations</a></li>
                                <li className="mb-1"><a className="link-secondary text-decoration-none"
                                                        href="#">Privacy</a></li>

                            </ul>
                        </div>
                        <div className="col-12 col-md">
                            <small className="d-block mb-3 text-muted text-center">&copy; 2017–2021</small>
                            <div className="sub-footer text-center">
                                <small> © CopyRights 2021 - dijitalAkademi.com Tüm hakları gizlidir.</small>

                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
