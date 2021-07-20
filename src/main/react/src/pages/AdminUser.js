import React, {Component} from 'react';
import {connect} from "react-redux";

class AdminUser extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        loginSuccess: store
    }
}

export default connect(mapStateToProps)(AdminUser);

