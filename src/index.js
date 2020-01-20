import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {observable, configure, action} from "mobx";
import {observer} from "mobx-react";


configure({enforceActions: 'observed'});

const nickName = observable({

  firstName: 'Alexandr',
  age: 27,

  nickName() {
    console.log(`Generate NickName`);
    return `${this.firstName}${this.age}`;
  },

  increment() {
    this.age++
  },

  decrement() {
    this.age--
  }
}, {
 increment: action,
  decrement: action
});

const todos = observable([
  {text: 'Learn MobX'},
  {text: 'you are good boy'},
]);

@observer
class Counter extends React.Component {

  handleIncrement = () => {
    this.props.store.increment()
  };
  handleDecrement = () => {
    this.props.store.decrement()
  };


  render() {
    return (
      <div className="App">
        <h1>{this.props.store.age}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
        <p>{this.props.store.nickName()}</p>
        <ul>
          {todos.map(({text}) => {
            return <li key={text}>{text}</li>
          })}
        </ul>
      </div>
    );
  }
}


ReactDOM.render(<Counter store={nickName}/>, document.getElementById('root'));


