import React, { Component } from 'react';
import shortid from 'shortid';
import Container from './components/Container';
// import TodoList from './components/TodoList';
// import TodoEditor from './components/TodoEditor';
// import Filter from './components/TodoFilter';
import Modal from './components/Modal';
// import IconButton from './components/IconButton';
// import { ReactComponent as AddIcon } from './icons/add.svg';
// import Tabs from './components/Tabs';
// import tabs from './tabs.json';
// import Clock from './components/Clock';
// import initialTodos from './todos.json';

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  componentDidMount() {
    console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.todos !== prevState.todos) {
      console.log('Обновилось поле todos');
      localStorage.setItem('todos-1', JSON.stringify(this.state.todos))
    }


    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      console.log('Обновилось поле todos, записываю todos в хранилище');
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }

  }
  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));

    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(({ text }) =>
      text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <button type='button' onClick={this.toggleModal}>Відкрити модалку </button>
        {showModal &&
          <Modal onClose={this.toggleModal}>
            <button type='button' onClick={this.toggleModal}>Закрити модалку</button>
            <p>Привіт рендер модалки в Апп</p>
            <button type='button' onClick={this.toggleModal}>Закрити - 2</button>
            <p>Привіт  2</p></Modal>
        }
        {/* <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}

        TODO: вынести в отдельный компонент
        <div>
          <p>Всего заметок: {totalTodoCount}</p>
          <p>Выполнено: {completedTodoCount}</p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        /> */}
      </Container>
    );
  }
}

export default App;
