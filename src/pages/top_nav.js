import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firebaseAuth} from '../firebase.js';

export default class TopNav extends Component {

  // コンストラクタ
  constructor(props) {
    super(props);
    this.state = {};
  }

  // render読み込み後にログイン状態をチェック
  // ※constructorでやるとsetStateで警告が出る
  componentDidMount() {
    firebaseAuth.onAuthStateChanged((user) => {
      this.setState({ user })
    })
  }

  // Logoutボタンクリック時
  onSignOut = () => {
    firebaseAuth.signOut();
  }

  render() {
    return (<div>
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="../">
              <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" />
            </a>
          </div>
          <div className="navbar-end mr-0">
            <div className="navbar-item">
              {!this.state.user &&
              <div className="field is-grouped">
                <p className="control">
                  <Link to="/register" className="button is-small">
                    <span className="icon mr-0">
                      <i className="fa fa-user-plus"></i>
                    </span>
                    <span>
                      Register
                    </span>
                  </Link>
                </p>
                <p className="control">
                  <Link to="/login" className="button is-small is-info is-outlined">
                    <span className="icon mr-0">
                      <i className="fa fa-user"></i>
                    </span>
                    <span>Login</span>
                  </Link>
                </p>
              </div>
              }
              {this.state.user &&
              <div className="field is-grouped">
                <p className="control">
                  <button className="button is-small is-info is-outlined" onClick={this.onSignOut}>
                    <span className="icon mr-0">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span>
                      Logout
                    </span>
                  </button>
                </p>
              </div>
              }
            </div>
          </div>
        </div>
      </nav>

      <div className="hero is-info is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Simple Todo List</h1>
            <h2 className="subtitle">@React & Bulma Practice By Ishibashi</h2>
          </div>
        </div>
      </div>

    </div>);
  }
}
