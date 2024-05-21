import React from 'react';
import './styleLoginLogoutPage.css'


const Login = () => {
  return (
    <div className="cnema-loginpage">
      <div className="cnema-loginpage-container">
        <div className="form-login-container">
          <div className="login-title">
            Login
          </div>
          <div className="login-form">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Let us know your Email" />
                <div id="emailHelp" className="form-text custome">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Keep it secret...."/>
              </div>
              <div className="button-group">
              <button type="submit" className="btn btn-primary">Log in</button>
              
              <div id="donotHaveAccYet" className="form-text custome">Don't have an account yet?</div>
              <button type="submit" className="btn btn-primary">Sign up</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Login;