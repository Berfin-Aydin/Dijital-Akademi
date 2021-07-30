import React, {Component} from 'react';
import {Splitter, SplitterPanel} from 'primereact/splitter';
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {getAbout} from "../api/apiCalls";
import {ScrollPanel} from "primereact/scrollpanel";

class AboutPage extends Component {
    state = {
        about: {}
    }

    componentDidMount() {
        const userName = this.props.loginSuccess.userName;
        getAbout(userName).then(response => {
            this.setState({
                about: response.data

            })
        })
    }

    render() {

        return (
            <>
                <Navbar/>
                <div>
                    <div className="scrollpanel-demo">
                        <div className="card">
                            <div className="p-grid">
                                <div className="p-col-12 p-md-4">
                                    <ScrollPanel style={{width: '100%', height: '200px'}}>
                                        <div style={{padding: '1em', lineHeight: '1.5'}}>
                                            <h2>Biz Kimiz?</h2>
                                            {this.state.about.aboutContact}

                                        </div>
                                    </ScrollPanel>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <ScrollPanel style={{width: '100%', height: '200px'}} className="custombar1">
                                        <div style={{padding: '1em', lineHeight: '1.5'}}>
                                            <h2>Vizyonumuz</h2>
                                            {this.state.about.aboutVision}

                                        </div>
                                    </ScrollPanel>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <ScrollPanel style={{width: '100%', height: '200px'}} className="custombar2">
                                        <div style={{padding: '1em', lineHeight: '1.5', width: '600px'}}>
                                            <h2>Misyonumuz</h2>
                                            {this.state.about.aboutMission}
                                        </div>
                                    </ScrollPanel>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(AboutPage);
