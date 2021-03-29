import React, { Component } from 'react';
import TopNav from './top_nav.js';
import { Link } from 'react-router-dom';
import {firebaseStore} from '../firebase.js';

export default class Mdl extends Component {

  // コンストラクタ
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
      mds: [],
      isShowModal: false,
      selectMd: {}
    };
  }

  // top_navからログインユーザを取得
  updateUser(user) {
    if(user) {
      // ログイン済で開始 or ログイン実行時はリストを取得してロード完了
      this.getMds(user);
    } else {
      // 未ログイン開始 or ログアウト実行時はリストを初期化してロード完了
      this.setState({
        isLoading: false,
        user: {},
        mds: [],
      });
    }
  }

  // ユーザのデータ一覧を取得
  getMds(user) {
    this.setState({isLoading: true});
    firebaseStore.collection('mds').where('uid', '==', user.uid).get().then((snapshot) => {
      var mds = [];
      snapshot.forEach((doc) => {
        var data = doc.data();
        var obj = {
          mdid: data.mdid,
          title: data.title,
          text: data.text,
          date: data.date.toDate().toLocaleString(),
        };
        mds.push(obj);
      });
      this.setState({
        isLoading: false,
        user: user,
        mds: mds,
      });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
      this.setState({
        isLoading: false,
        user: user,
        mds: [],
      });
    });
  }

  // 一覧の編集ボタンクリック時
  modMd = (index) => {
    this.props.history.push({
      pathname: '/',
      md: this.state.mds[index]
    });
  }

  // 一覧の削除ボタンクリック時
  showModal = (index) => {
    this.setState({
      isShowModal: true,
      selectMd: this.state.mds[index]
    });
  }

  // ユーザ削除確認ダイアログ非表示
  hideModal = () => {
    this.setState({
      isShowModal: false
    });
  }

  // 確認ダイアログ削除ボタンクリック時
  deleteMd = () => {
    firebaseStore.collection('mds').doc(this.state.selectMd.mdid).delete().then(() => {
      this.getMds(this.state.user);
      this.hideModal();
    }).catch((error) => {
      console.error("Error removing document: ", error);
      alert('削除に失敗しました');
    });
  }

  render() {
    return (<div>

    <TopNav updateUser={this.updateUser.bind(this)} />

    <div className="hero is-info is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Simple Markdown Editer</h1>
          <h2 className="subtitle">@React & Bulma Practice By Ishibashi</h2>
        </div>
      </div>
    </div>

    <div className="columns">
      <div className="card column m-5">
        <div className="card-content">
          <div className="content">

            <div className="field has-addons">
              <div className="control">
                <Link to="/" className={'button is-info ' + (this.state.isLoading ? 'is-loading' : '')}>
                  <i className="far fa-edit"></i>&nbsp;新規作成
                </Link>
              </div>
            </div>

            {this.state.mds.length > 0 &&
              <table className="table is-striped">
                <thead>
                  <tr>
                    <th><abbr title="Position">No</abbr></th>
                    <th><abbr title="Position">タイトル</abbr></th>
                    <th><abbr title="Position">更新日時</abbr></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.mds.map((md, index) => <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{md.title}</td>
                    <td>{md.date}</td>
                    <td>
                      <button className="button is-info is-small" onClick={() => { this.modMd(index) }}>
                        <i className="far fa-edit"></i>&nbsp;編集
                      </button>
                      <button className="button is-danger is-small" onClick={() => { this.showModal(index) }}>
                        <i className="far fa-trash-alt"></i>&nbsp;削除
                      </button>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            }
            {this.state.mds.length === 0 &&
              <div className="notification is-primary">
                保存されたMarkdownはありません。新規登録を選んで下さい。
              </div>
            }
          </div>
        </div>
      </div>
    </div>

      {this.state.mds &&
      <div className={'modal ' + (this.state.isShowModal ? 'is-active' : '')}>
        <div className="modal-background" onClick={this.hideModal}></div>
        <div className="modal-content">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">削除確認</p>
            <button className="delete" aria-label="close" id="close" onClick={this.hideModal}></button>
          </header>
          <section className="modal-card-body">
            <span>
              【{this.state.selectMd.title}】を削除します。<br />
              よろしいでしょうか？
            </span>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={this.deleteMd}>削除</button>
            <button className="button" onClick={this.hideModal}>キャンセル</button>
          </footer>
        </div>
        </div>
      </div>
      }

    </div>);
  }
}
