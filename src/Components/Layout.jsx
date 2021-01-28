import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import '../../node_modules/bootstrap-jquery/dist/css/bootstrap.min.css';


function Layout(props){

    const handleLogout = (e) => {
        e.preventDefault();
        cookie.remove('token');
        props.logout();
    }

    return (
        <Fragment>
        <div>
            <nav class="navbar navbar-expand-sm bg-dark bg-light">
                <ul class="navbar-nav">
                    {
                        !props.loggedIn ? 
                            <Fragment>
                                <li class="nav-item">
                                    <Link className="login_btn btn btn-info" to="/login">Login</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="reg_btn btn btn-info" to="/register">Register</Link>
                                </li>
                            </Fragment>
                        : 
                        <Fragment>
                            <li class="nav-item">
                                <Link 
                                    className="login_btn btn btn-info" 
                                    to="/logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link className="reg_btn btn btn-info" to="/product">Product</Link>
                            </li>
                        </Fragment>
                    }
                </ul>
            </nav>
            {props.children}
        </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch({type: "SET_LOGOUT"})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Layout);