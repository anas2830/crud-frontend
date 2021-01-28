import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'js-cookie';

class Register extends Component {

    constructor(props){
        super(props)
        this.state = {name: "", email:"", password:"", password_confirmation:"", errors:{}}
    }

    handleForm = (e) => {
        e.preventDefault();
  
        const data = {
          name: this.state.name,
          email:this.state.email,
          password:this.state.password,
          password_confirmation:this.state.password_confirmation
        }
  
        axios.post("http://localhost:8000/api/auth/register", data)
        .then( res => {
            cookie.set('token', res.data.access_token);
            cookie.set('user', res.data.user);
            this.props.history.push("/profile");
        })
        .catch(e => this.setState({ errors: e.response.data }));
  
      }
  
      handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
  
        this.setState({[name]:value});
      }


    render () {
        return (
            <form onSubmit={this.handleForm}>
                <div className="row">
                <div className="col-md-4 col-md-offset-4 login_div">
                    <h1 className="text-center">Register Form</h1>
                    <div className="row login_form">
                        <div className="form-group">
                        <label className="col-md-3">Name:</label>
                        <div className="col-md-9">
                            <input type="text" required name="name" className="form-control" placeholder="Enter your name" onChange={this.handleInput} />
                        </div>
                        </div>
                        <div className="form-group">
                        <label className="col-md-3">Email:</label>
                        <div className="col-md-9">
                            <input type="email" required name="email" className="form-control" placeholder="Enter your email" onChange={this.handleInput} />
                        </div>
                        </div>
                        <div className="form-group">
                        <label className="col-md-3">Password:</label>
                        <div className="col-md-9">
                            <input type="password" required name="password" className="form-control" placeholder="Enter your confirm password" onChange={this.handleInput} />
                        </div>
                        </div>
                        <div className="form-group">
                        <label className="col-md-3">Pass: Confirm:</label>
                        <div className="col-md-9">
                            <input type="password" required name="password_confirmation" className="form-control" placeholder="Enter your password" onChange={this.handleInput} />
                        </div>
                        </div>
                        <div className="form-group">
                        <label className="col-md-3"></label>
                        <div className="col-md-9">
                            <button type="submit" className="btn btn-info submit_btn">Register</button>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </form>
        )
    }
}

export default Register