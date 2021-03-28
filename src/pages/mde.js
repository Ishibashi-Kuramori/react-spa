import React, { Component } from 'react';
import TopNav from './top_nav.js';
import ReactMarkdown from 'react-markdown/with-html';
import {firebaseStore} from '../firebase.js';
import firebase from "firebase/app";

export default class Mde extends Component {

  // コンストラクタ
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      id: '',
      title: '',
      text: ''
    };
  }

  // top_navからログインユーザを取得
  updateUser(user){
    this.setState({ user: user })
  }

  // タイトル入力時
  onInputTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  // テキスト入力時
  onInputText = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  // 保存ボタン処理
  saveMd = () => {

    // 保存データ設定
    var data = {
      mdid: this.state.id,
      uid: this.state.user.uid,
      title: this.state.title,
      text: this.state.text,
      date: firebase.firestore.FieldValue.serverTimestamp()
    };

    var ref;
    var mode = '';
    if(this.state.id) {
      // IDがセット済の場合は編集
      ref = firebaseStore.collection('mds').doc(this.state.id);
      mode = '編集';
    } else {
      // IDが未セットの場合は新規追加
      ref = firebaseStore.collection('mds').doc();
      data.mdid = ref.id;
      mode = '新規登録';
    }
    ref.set(data).then(() => {
      this.setState({
        id: ref.id
      });
      alert(mode + 'が完了しました');
    }).catch((error) => {
      console.error("Error writing document: ", error);
      alert(mode + 'が失敗しました');
    });
  }

  render() {
    return (<div id="mdePage">

    <TopNav updateUser={this.updateUser.bind(this)} />

    <div className="hero is-warning is-fullheight-with-navbar has-background-light">
      <div className="hero-body columns pt-5 pl-5 pr-5 pb-0">

        <div className="column mde-input-height">
          <textarea className="textarea is-large has-fixed-size" placeholder="Markdownを入力" onInput={this.onInputText}></textarea>
        </div>

        <div className="column card mde-output-height">
          <div className="card-content">
            <div className="content">
              <ReactMarkdown
                source={this.state.text}
                escapeHtml={false}
              />
            </div>
          </div>
        </div>

      </div>

      <div className="hero-hotter columns pb-5 pl-5 pr-5">
        <div className="column field has-addons">
          <div className="control">
            <input className="input" type="text" placeholder="タイトルを入力" size="50" onInput={this.onInputTitle} />
          </div>
          <div className="control">
            <button className="button is-info" disabled={!this.state.user} onClick={this.saveMd}>
              <i className="far fa-edit"></i>&nbsp;{this.state.id ? '編集' : '保存'}
            </button>
          </div>
        </div>
        {!this.state.user &&
          <div className="column notification is-primary mb-5">
            保存機能はログイン後に有効になります。
          </div>
        }
      </div>

    </div>

    </div>);
  }
}
