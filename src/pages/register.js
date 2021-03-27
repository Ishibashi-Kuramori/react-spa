import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firebaseAuth} from '../firebase.js';

export default class Register extends Component {

  constructor() {
    super();

    this.state = {
      isSubmitEnabled: false,
      isRegisterError: false,
      errorMessage: ''
    };

    this.elements = null;

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // フォーム入力時
  handleFormChange() {
    if(!this.elements) return;

    this.setState({
      isSubmitEnabled: this.elements['name'].value && this.elements['email'].value && this.elements['password'].value,
      isRegisterError: false,
    });
  }

  // 新規登録ボタン実行処理
  handleFormSubmit(event) {
    event.preventDefault();
    let errorMessage = 'ユーザ情報登録に失敗しました';
    const history = this.props.history;

    // form値取得
    const name = this.elements['name'].value;
    const email = this.elements['email'].value;
    const password = this.elements['password'].value;

    // firebaseに新規ユーザを追加
    firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const user = firebaseAuth.currentUser;
      // プロフィールに名前をセット
      user.updateProfile({
        displayName: name,
      }).then(function() {
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isRegisterError: true,
          errorMessage: errorMessage
        });
      });
    })
    .catch((error) => {
      console.log(error);
      if(error.code === 'auth/email-already-in-use') errorMessage = 'Emailが既に登録済みです';
      this.setState({
        isRegisterError: true,
        errorMessage: errorMessage
      });
    });
  }

  render() {
     return (
    <section className="hero is-fullheight" id="loginPage">
      <div className="hero-body has-text-centered">
        <div className="login">
          <h3 className="title has-text-black">Register</h3>
          <hr className="login-hr" />
          {!this.state.isRegisterError &&
            <p className="subtitle has-text-black">ユーザ情報を入力して下さい</p>
          }
          {this.state.isRegisterError &&
            <p className="subtitle has-text-danger">{this.state.errorMessage}</p>
          }
          <form onChange={this.handleFormChange} onSubmit={this.handleFormSubmit} ref={el => this.elements = el && el.elements}>
            <div className="field">
              <div className="control">
                <input className="input is-medium is-rounded" type="text" name="name" placeholder="名前(例:山田太郎)" required />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input is-medium is-rounded" type="email" name="email" placeholder="Email(例:hello@example.com)" required />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input is-medium is-rounded" type="password" name="password" placeholder="パスワード(6文字以上)" required minLength="6"/>
              </div>
            </div>
            <br />
            <button className="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit" disabled={!this.state.isSubmitEnabled}>
              新規登録&nbsp;<i className="fa fa-user-plus"></i>
            </button>
          </form>
          <br />
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>

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
    </section>
    );
  }
}
