import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

  componentDidMount() {
    console.log('didMount');

    window.addEventListener('keydown', this.handleKeyDown)
  }

  // componentDidUpdate() { console.log('didUpdate') }

  componentWillUnmount() {
    console.log('willUnmount');
    window.removeEventListener('keydown', this.handleKeyDown)
  }
  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      console.log('нажали ескейп');
      this.props.onClose();
    }
  }
  // componentDidMount() {
  //   console.log('Modal componentDidMount');
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   console.log('Modal componentWillUnmount');
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  // handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     console.log('Нажали ESC, нужно закрыть модалку');

  //     this.props.onClose();
  //   }
  // };

  // handleBackdropClick = event => {
  //   console.log('Кликнули в бекдроп');

  //   console.log('currentTarget: ', event.currentTarget);
  //   console.log('target: ', event.target);

  //   if (event.currentTarget === event.target) {
  //     this.props.onClose();
  //   }
  // };
  handleBackdropClick = (event) => {
    console.log('currentTarget', event.currentTarget);
    console.log('event', event.target);
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  }
  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
