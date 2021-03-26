import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TopNav from './top_nav.js';

const SortableItem = SortableElement(({todo, sortIndex, onDeleteHandler}) =>
  <tr>
    <td>{sortIndex + 1}</td>
    <td>{todo.name}</td>
    <td>{todo.date}</td>
    <td>
      <button className="button is-danger is-small" onClick={() => { onDeleteHandler(sortIndex) }}>
        <i className="far fa-trash-alt"></i>&nbsp;削除
      </button>
    </td>
  </tr>
);

const SortableList = SortableContainer(({todos, onDeleteHandler}) => {
  return (
    <tbody>
      {todos.map((todo, index) => (
        <SortableItem
          key={index}
          index={index}
          sortIndex={index}
          todo={todo}
          onDeleteHandler={onDeleteHandler} />
      ))}
    </tbody>
  );
});

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
    if(!name) return;
    var obj = {
      name: name,
      date: new Date().toLocaleString()
    }
    this.setState({
      todos: [...todos, obj]
    });
  }

  // 削除ボタンクリック時
  removeTodo = (index) => {
    const { todos } = this.state;
    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1)]
    });
  }

  // レコード並び替え時
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({todos}) => ({
      todos: arrayMove(todos, oldIndex, newIndex),
    }));
  };

  render() {
    return (<div>

    <TopNav />

    <div className="columns">
      <div className="card column m-5">
        <div className="card-content">
          <div className="content">

            <div className="field has-addons">
              <div className="control">
                <input className="input" type="text" placeholder="TODOを入力" onInput={this.onInput} />
              </div>
              <div className="control">
                <button className="button is-info" onClick={this.addTodo}>
                  <i className="far fa-edit"></i>&nbsp;登録
                </button>
              </div>
            </div>

            {this.state.todos.length > 0 &&
              <table className="table is-striped">
                <thead>
                  <tr>
                    <th><abbr title="Position">No</abbr></th>
                    <th><abbr title="Position">Todo</abbr></th>
                    <th><abbr title="Position">Date</abbr></th>
                    <th></th>
                  </tr>
                </thead>
                <SortableList
                  todos={this.state.todos}
                  onSortEnd={this.onSortEnd}
                  onDeleteHandler={this.removeTodo} />
              </table>
            }
            {this.state.todos.length === 0 &&
              <div className="notification is-primary">
                TODO を入力して登録して下さい
              </div>
            }
          </div>
        </div>
      </div>
    </div>


    </div>);
  }
}
