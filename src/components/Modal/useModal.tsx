import objectHash from 'object-hash';
import React, { useEffect } from 'react';

import ModalEntity from './_ModalEntity';
import { useModalStore } from './_ModalStore';
import { ModalProps } from './ModalProvider';

export interface ModalControls {
  open: () => void;
  close: () => void;
  clear: () => void;
}

const useModal = (props: Omit<ModalProps, 'style'>) => {
  const store = useModalStore();
  const [modal, setModal] = React.useState<ModalEntity>();

  // This allows us to generate a unique id for each modal instance
  // Only if the id is not provided by the user, hash comparison is used
  // to speed up the process along with memoization
  props.id ||= React.useMemo(() => `modal-${objectHash(props)}`, []);

  // The following will only run once to initialise the modal instance
  if (!modal) {
    setModal(store.addModal(props));
  }

  useEffect(() => {
    return () => store.cleanModal(props.id ?? '');
  }, []);

  // The following will update the modal instance with
  // new props when props are updated in subsequent renders
  useEffect(() => {
    if (modal) modal.update(props);
  }, [props]);

  return {
    open: () => modal?.open?.(),
    close: () => {
      modal?.close?.();
      props.onClose?.();
    },
    clear: () => store.clear?.(),
  } as ModalControls;
};

export default useModal;
