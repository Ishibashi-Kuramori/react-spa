import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {firebaseAuth} from '../firebase.js';

export default class TopNav extends Component {

  // コンストラクタ
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false
    };
    this._isMounted = false; // unmountを判断(setStateの警告対策)
  }

  // render読み込み後にログイン状態をチェック
  // ※constructorでやるとsetStateで警告が出る
  componentDidMount() {
    this._isMounted = true;
    firebaseAuth.onAuthStateChanged((user) => {
      if(this._isMounted) {
        this.setState({ user: user })
        this.props.updateUser(user);
      }
    })
  }

  // unmount中は更新を停止
  componentWillUnmount = () => {
    this._isMounted = false;
  }

  // Logoutボタンクリック時
  onSignOut = () => {
    firebaseAuth.signOut();
  }

  // ユーザ削除確認ダイアログ表示
  showModal = () => {
    this.setState({
      isShowModal: true
    });
  }

  // ユーザ削除確認ダイアログ非表示
  hideModal = () => {
    this.setState({
      isShowModal: false
    });
  }

  // ユーザ削除処理
  deleteUser = () => {
    const hideModal = this.hideModal;
    this.state.user.delete().then(function() {
      hideModal();
    }).catch(function(error) {
      console.log(error);
      alert('ユーザ削除に失敗しました。\n一旦ログアウトしてもう一度お試し下さい。');
    });
  }

  render() {
    return (<div>
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="navbar-brand">
            <p className="is-size-5 has-text-weight-bold has-text-info mt-3">Simple Markdown Editer</p>
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
                    <span className="icon mr-0">
                      <i className="fa fa-user"></i>
                    </span>
                    <strong>
                      {this.state.user.displayName}
                    </strong>
                </p>
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
                <p className="control">
                  <button className="button is-small is-danger" onClick={this.showModal}>
                    <span className="icon mr-0">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <span>
                      Delete User
                    </span>
                  </button>
                </p>
              </div>
              }
            </div>
          </div>
        </div>
      </nav>

      {this.state.user &&
      <div className={'modal ' + (this.state.isShowModal ? 'is-active' : '')}>
        <div className="modal-background" onClick={this.hideModal}></div>
        <div className="modal-content">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">退会確認</p>
            <button className="delete" aria-label="close" id="close" onClick={this.hideModal}></button>
          </header>
          <section className="modal-card-body">
            <span className="icon mr-0">
              <i className="fa fa-user"></i>
            </span>
            <strong>
              {this.state.user.displayName}
            </strong>
            <span>
              さんのユーザ情報、及び投稿データが全て削除されます。<br />
              よろしいでしょうか？
            </span>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={this.deleteUser}>削除</button>
            <button className="button" onClick={this.hideModal}>キャンセル</button>
          </footer>
        </div>
        </div>
      </div>
      }
    </div>);
  }
}
