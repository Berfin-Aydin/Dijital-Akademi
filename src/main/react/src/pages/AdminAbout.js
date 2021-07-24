import React, {Component} from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
class AdminAbout extends Component {
    state={
        value1: '',
        value2: '',
        value3: ''
    }
    render() {
        return (
            <div>
                <div className="card">
                    <h5>Basic</h5>
                    <InputTextarea value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} rows={5} cols={30} />

                    <h5>Auto Resize</h5>
                    <InputTextarea value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} rows={5} cols={30} autoResize />

                    <h5>Disabled</h5>
                    <InputTextarea value={this.state.value3} rows={5} cols={30} disabled />
                </div>
            </div>
        );
    }
}

export default AdminAbout;