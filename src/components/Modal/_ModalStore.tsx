import { action, makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

import ModalEntity from './_ModalEntity';
import { ModalProps } from './ModalProvider';

class ModalStore {
  modals: ModalEntity[] = [];
  renderStack: ModalEntity[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  addModal(props: ModalProps) {
    // Check if modal with same id already exists
    const existingModal = this.modals.find((m) => m.props?.id === props.id);

    if (existingModal) return existingModal;

    const modal = new ModalEntity(
      props,
      () => console.warn('modals array is not mounted with modal instance yet'),
      () => this.pop(),
    );

    this.modals.push(modal);

    modal.open = () => this.open(props.id as string);

    return modal;
  }

  @action
  open(id: string) {
    const instance =  this.modals.find((m) => m.props?.id === id);

    if(instance) {
    // check if the modal is already open
      if (this.renderStack.includes(instance)) return;

      this.renderStack.push(instance);
    } else console.warn('modal is missing with id:', id);
  }

  @action
  modifyModal(index: number, modal: ModalEntity) {
    this.modals[index] = modal;
  }

  @action
  close(index: number) {
    this.renderStack.splice(index, 1);
  }

  @action
  pop() {
    this.renderStack.pop();
  }

  @action
  clear() {
    this.renderStack = [];
  }

  @action
  cleanModal(id: string) {
    this.renderStack = this.renderStack.filter((m) => m?.props?.id !== id);
  }
}

export const modalStore = new ModalStore();

export const ModalContext = createContext(modalStore);

export const useModalStore = () => {
  return useContext(ModalContext);
};
