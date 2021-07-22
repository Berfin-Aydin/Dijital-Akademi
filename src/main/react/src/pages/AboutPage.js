import React, {Component} from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {getAbout} from "../api/apiCalls";
class AboutPage extends Component {
    state={
        about:[]
    }
    componentDidMount() {
        const userName= this.props.loginSuccess.userName;
        getAbout(userName).then(response=>{
            console.log("resssssponse", response.data)
            this.setState({

                about:response.data

            })
        })
    }

    render() {

        return (
            <>
                <Navbar/>
            <div>
                <Splitter style={{height: '300px'}}>
                    <SplitterPanel>
                        <h2>Vizyonumuz</h2>
                        <p>{this.state.about.aboutVision}</p>
                    </SplitterPanel>
                    <SplitterPanel>
                        <h2>Misyonumuz</h2><br/>
                        <div><p> {this.state.about.aboutMission}</p></div>


                    </SplitterPanel>
                </Splitter>

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
