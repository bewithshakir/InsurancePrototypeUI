import React from "react";

import "./Login.scss";

const Login = props => {
  return (
    <div className="login-section">
      <div className="container align-item-center-pos">
        <div className="row">
          <div className="col-sm-5">
            <div className="white-bg rounded login-content">
              <h3 className="hdr">Login</h3>
              <p>
                Don't have an account? <a href="#">Sign up</a>
              </p>
              <form>
                <label>Email Address</label>
                <input className="form-control" />
                <label>Email Address</label>
                <input className="form-control" />
                <div className="d-flex justify-content-between">
                  <div>
                    <input type="checkbox" id="loggedInd" />
                    <label htmlFor="loggedInd">Keep me logged in</label>
                  </div>
                  <a href="#">Forget password?</a>
                </div>
                <button className="btn btn-primary full-width btn-extra-lg">
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className="col-sm-7">
            <h1 className="align-item-center-pos bebas-font">
              Trusted Mobility Platform and services
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
