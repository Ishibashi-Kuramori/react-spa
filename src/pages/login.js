import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firebaseAuth} from '../firebase.js';

export default class Login extends Component {

  constructor() {
    super();

    this.state = {
      isSubmitEnabled: false,
      isLoginError: false,
    };

    this.elements = null;

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // フォーム入力時
  handleFormChange() {
    if(!this.elements) return;

    this.setState({
      isSubmitEnabled: this.elements['email'].value && this.elements['password'].value,
      isLoginError: false,
    });
  }

  // ログインボタン実行処理
  handleFormSubmit(event) {
    event.preventDefault();

    // form値取得
    const email = this.elements['email'].value;
    const password = this.elements['password'].value;

    firebaseAuth.signInWithEmailAndPassword(email, password)
    .then((response) => {
      this.props.history.push('/mdl');
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        isLoginError: true,
      });
    });

  }

  render() {
     return (
    <section className="hero is-fullheight" id="loginPage">
      <div className="hero-body has-text-centered">
        <div className="login">
          <h3 className="title has-text-black">Login</h3>
          <hr className="login-hr" />
          {!this.state.isLoginError &&
            <p className="subtitle has-text-black">Email & Passを入力して下さい</p>
          }
          {this.state.isLoginError &&
            <p className="subtitle has-text-danger">Email or Passをご確認下さい</p>
          }
          <form onChange={this.handleFormChange} onSubmit={this.handleFormSubmit} ref={el => this.elements = el && el.elements}>
            <div className="field">
              <div className="control">
                <input className="input is-medium is-rounded" type="email" name="email" placeholder="hello@example.com" autoComplete="username" required />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input is-medium is-rounded" type="password" name="password" placeholder="**********" autoComplete="current-password" required minLength="6"/>
              </div>
            </div>
            <br />
            <button className="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit" disabled={!this.state.isSubmitEnabled}>
              ログイン&nbsp;<i className="fas fa-sign-in-alt"></i>
            </button>
          </form>
          <br />
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <Link to="/register">新規アカウント作成</Link>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <Link to="/">戻る</Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {this.state.isLoginError &&
        <div className="notification is-warning">
          デバッグ用 Email: a@a.com  Pass: aaaaaa
        </div>
      }
    </section>
    );
  }
}
