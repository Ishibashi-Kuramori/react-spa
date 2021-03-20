import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Todo extends Component {

  // コンストラクタ
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      name: ''
    };
  }

  // テキスト入力時
  onInput = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  // 登録ボタンクリック時
  addTodo = () => {
    const { todos, name } = this.state;
    this.setState({
      todos: [...todos, name]
    });
  }

  // 削除ボタンクリック時
  removeTodo = (index) => {
    const { todos, name } = this.state;
    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1)]
    });
  }

  // TODO: navは別コンポーネントに移す
  render() {
    const { todos } = this.state;
    return (<div>

    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="../">
            <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" />
          </a>
        </div>
        <div class="navbar-end mr-0">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <Link to="/register" class="button is-small">
                  <span class="icon mr-0">
                    <i class="fa fa-user-plus"></i>
                  </span>
                  <span>
                    Register
                  </span>
                </Link>
              </p>
              <p class="control">
                <Link to="/login" class="button is-small is-info is-outlined">
                  <span class="icon mr-0">
                    <i class="fa fa-user"></i>
                  </span>
                  <span>Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Simple Todo List</h1>
          <h2 class="subtitle">@React & Bulma Practice By Ishibashi</h2>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column"></div>
      <div class="card column is-half">
        <div class="card-content">
          <div class="content">

      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="TODOを入力" onInput={this.onInput} />
        </div>
        <div class="control">
          <button class="button is-info" onClick={this.addTodo}>
            <i class="far fa-edit"></i>&nbsp;登録
          </button>
        </div>
      </div>

      <table class="table is-striped">
        <thead>
          <tr>
            <th><abbr title="Position">No</abbr></th>
            <th><abbr title="Position">Todo</abbr></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => <tr key={index}>
            <td>{index + 1}</td>
            <td>{todo}</td>
            <td>
              <button class="button is-danger is-small" onClick={() => { this.removeTodo(index) }}>
                <i class="far fa-trash-alt"></i>&nbsp;削除
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>

          </div>

        </div>
      </div>
      <div class="column"></div>
    </div>


    </div>);
  }
}