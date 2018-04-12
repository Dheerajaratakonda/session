import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService('http://10.168.142.11:8060/securityservice/login/authenticate');
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: ""
            }
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    const profile = Auth.getProfile()
                    const firstname=profile.firstname.substr(0,profile.firstname.indexOf(' '));
                    const lastname=profile.surname;
                    const name=firstname + " " + lastname;
                    this.setState({
                        user: name
                    })
                }
                catch(err){
                    Auth.logout()
                    this.props.history.replace('/login')
                }
            }
        }

        render() {
            console.log(this.state.user)
            if (this.state.user) {
              console.log(this.props.history)
              return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            }
            else {
              
                return null
            }
        }
    };
}

