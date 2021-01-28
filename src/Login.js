import React, { Component, Fragment } from "react";
import axios from 'axios';
import cookie from 'js-cookie';
import { connect } from 'react-redux';

import '../node_modules/bootstrap-jquery/dist/css/bootstrap.min.css';

class Login extends Component {

    constructor(props){
      super(props)
      this.state = {email:'', password:'', errors:{}}
    }

    handleForm = (e) => {
      e.preventDefault();

      const data = {
        email:this.state.email,
        password:this.state.password
      }

      axios.post("http://localhost:8000/api/auth/login", data)
      .then( res => {
          cookie.set('token', res.data.access_token);
          this.props.setLogin(res.data.user);
          this.props.history.push("/profile");
      })
      .catch(e => this.setState({ errors: e.response.data }));

      // this.props.history.push("/profile");
    }

    handleInput = (e) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;

      this.setState({[name]:value});
    }

    render() {

      const error = this.state.errors;

      return (
        <Fragment>
          <form onSubmit={this.handleForm}>

            <div className="row">
              <div className="col-md-4 col-md-offset-4 login_div">
                  <h1 className="text-center">Login Form</h1>
                  {error.errors ? <p className="text-red">{error.errors}</p> : ""}

                  <div className="row login_form">
                    <div className="form-group">
                      <label className="col-md-2">Email:</label>
                      <div className="col-md-10">
                        <input type="email" required name="email" className="form-control" placeholder="Enter your email" onChange={this.handleInput} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-2">Password:</label>
                      <div className="col-md-10">
                        <input type="password" required name="password" className="form-control" placeholder="Enter your password" onChange={this.handleInput} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-2"></label>
                      <div className="col-md-10">
                        <button type="submit" className="btn btn-info submit_btn">Submit</button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

          </form>
        </Fragment>
      )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: (user) => dispatch({type: "SET_LOGIN", payload: user})
  }
}

export default connect(null,mapDispatchToProps)(Login);
