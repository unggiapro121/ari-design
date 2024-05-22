import { makeAutoObservable } from 'mobx';
import React, { ReactElement } from 'react';

import { ModalProps } from './ModalProvider';

export default class ModalEntity {
  constructor(props: ModalProps, open: () => void, close: () => void) {
    this.open = open;
    this.close = close;
    this.update(props);
    makeAutoObservable(this);
  }

  public update(props: ModalProps) {
    const { content } = this.props || props;
    const newProps = (props.content as ReactElement).props;

    this.props = {...props, content: newProps ? React.cloneElement(content as ReactElement, newProps) : content };
  }

  open: () => void;
  close: () => void;
  props?: ModalProps;
}
