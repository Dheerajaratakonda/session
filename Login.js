import './Login.css';
import React, { Component } from 'react';
import { LocaleProvider, Row, Col, Form, Input, Card, Button, Icon, message} from 'antd';
import moment from 'moment';
import enUS from 'antd/lib/locale-provider/en_US';
import config from '../config';
import $ from 'jquery';
import jwt_decode from 'jwt-decode';
import AuthService from './AuthService';

const server =  config.securityServer;

class Login extends React.Component {
    constructor(props) {
        super(props);
      this.Auth = new AuthService();
        this.state = {
            username:"",
            password:"",
            expirationTime:"0"
        }
    }
    componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.push('/PO_Search');
    }
        handleOnChange = (e) =>{
            this.setState({[e.target.id]:e.target.value})
            
        }
        
        handleLogin = (e) => {
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
               this.props.history.replace('/PO_Search');
            })
            .catch(err =>{
                message.error("Username or password incorrect");
            })

    };
  
    
  render() {
  
    return (
        <div className='Login-component'>
            <Row type="flex" justify="center" align="middle" >
                <Form className="row">
                    <Col type="flex" justify="center" align="middle">
                        <h3 className="input">
                            Log In
                        </h3>
                        <Col span={24}>
                            <Form.Item  className="input">
                              <Input prefix={<Icon type="user" style={{ color: 'black' }} />} placeholder="User Name"  id="username" size="small" onChange={this.handleOnChange} />
                           </Form.Item>
                           <Form.Item  className="input">
                                <Input prefix={<Icon type="lock" style={{ color: 'black' }} />} placeholder="Password" type="password"    id="password" size="small" onChange={this.handleOnChange} onPressEnter={this.handleLogin}  />
                           </Form.Item>
                            <Button type="primary" onClick={this.handleLogin} >Log In</Button>
                        </Col>
                    </Col>
                </Form>
            </Row>
        </div>
	
    );
  }
}

export default Login;
