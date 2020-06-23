import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';


class Login extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}
	render() {
		return (
			<div>
					<div>
						<TextField id="email" label="Email" onChange={(event, newValue) => this.setState({ email: newValue })} />
						<br />
						<TextField id="password" label="Password" onChange={(event, newValue) => this.setState({ password: newValue })} />
						<br />
						<br/>
						<Button variant="contained" color="primary" onClick={(event) => this.handleClick(event)}>
                            sign in
                        </Button>
					</div>
			</div>
		);
	}

	handleClick(event) {
		var payload = {
			"email": this.state.username,
			"password": this.state.password
		}

		fetch('http://localhost:9090/api/employe/mylogin',{
			method:"POST",
			headers:{
				"content-type":"application/json",
			},
			body: JSON.stringify(payload),
		})
            .then(results => {
                if (!results.ok) {
                    throw Error(results.statusText);
                }
                console.log(results.statusText)
                return results.json();
            }).then(data => {
                this.setState({ camions: data._embedded.camions });
            }).catch(error => {
                console.log(error);
            });
	}
}

export default Login;