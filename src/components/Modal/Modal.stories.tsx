import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import Alert from '../Alert/Alert';
import Button, { ButtonColor, ButtonVariant } from '../Button/Button';
import Sticky from '../Sticky/Sticky';
import Toast from '../Toast/Toast';

import Modal from './_Modal';
import ModalProvider, { ModalProps } from './ModalProvider';
import useModal from './useModal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modals',
  component: Modal,
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<Omit<ModalProps, 'style'>>;

const SpawnButton = ({ open }: { open: () => void }) => (
  <Button label="open" color="blue" variant="primary" onClick={() => open()} />
);

export const Single: Story = {
  render: (args) => {
    const modal = useModal({
      ...args,
      actions: [
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
  args: {
    id: 'single',
    title: 'Single',
    color: ButtonColor.Blue,
    content: <div>Modal Content</div>,
  },
};

export const Double: Story = {
  render: (args) => {
    const modal = useModal({
      ...args,
      actions: [
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
  args: {
    id: 'double',
    title: 'Double',
    variant: 'double',
    color: ButtonColor.Blue,
    content: <div>Modal Content</div>,
  },
};

export const Triple: Story = {
  render: (args) => {
    const modal = useModal({
      ...args,
      actions: [
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
  args: {
    id: 'triple',
    title: 'Triple',
    variant: 'triple',
    color: ButtonColor.Blue,
    content: <div>Modal Content</div>,
  },
};

export const Fullscreen: Story = {
  render: (args) => {
    const modal = useModal({
      ...args,
      actions: [
        {
          label: 'Submit',
          onClick: undefined,
        },
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
  args: {
    id: 'fullscreen',
    title: 'Fullscreen',
    variant: 'fullscreen',
    color: ButtonColor.Blue,
    content: <div>Modal Content</div>,
  },
};

export const Dynamic: Story = {
  render: () => {
    const [number, setNumber] = React.useState(0);
    const [showAlert, setShowAlert] = React.useState(false);

    const handleCloseModal = () => {
      confirm.open();
    };

    const modal = useModal({
      title: 'Content Close Modal confirmation',
      id: 'content-close',
      color: ButtonColor.Blue,
      variant: 'triple',
      preCloseFn: () => confirm.open(),
      manualClose: true,
      alert: (
        <Alert
          type={'info'}
          message={'Alert content can be dynamically set and displayed'}
          dismissible={true}
          onClose={() => setShowAlert(false)}
        />
      ),
      alertVisible: showAlert,
      content: (
        <div>
          <p>counter: {number}</p>
          <p>This modal will only close after confirmation</p>
          <Button
            label="Show Alert"
            color={ButtonColor.Black}
            variant={ButtonVariant.Secondary}
            onClick={() => setShowAlert(true)}
          />
          <br />
          <Button
            label="Clear Alert"
            color={ButtonColor.Black}
            variant={ButtonVariant.Secondary}
            onClick={() => setShowAlert(false)}
          />
          <p>and here!</p>
        </div>
      ),
      actions: [
        {
          label: 'Count',
          onClick: () => setNumber(number + 1),
          inactive: number >= 5,
        },
        {
          label: 'Minus',
          onClick: () => setNumber(number - 1),
          inactive: number <= -5,
        },
        {
          label: 'Close modal',
          onClick: handleCloseModal,
        },
      ],
    });

    const confirm = useModal({
      id: 'confirm-cancellation',
      title: 'Close Modal',
      content: 'Are you sure you want to close this modal?',
      color: ButtonColor.Red,
      actions: [
        {
          label: 'Yes',
          onClick: () => {
            confirm.close();
            modal.close();
          },
        },
        {
          label: 'No',
          onClick: () => confirm.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
};

export const Scroll: Story = {
  render: (args) => {
    const modal = useModal({
      ...args,
      actions: [
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
      ],
    });

    return (
      <>
        <Sticky>
          <div style={{ margin: '1em' }}>
            <SpawnButton open={modal.open} />
          </div>
        </Sticky>
        <div>
          {Array.from({ length: 100 }, (_, idx) => (
            <p key={idx}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              impedit quaerat. Doloribus neque, vel placeat amet aspernatur
              adipisci repellendus nam omnis cum impedit sequi recusandae
              consequatur temporibus culpa exercitationem illo.
            </p>
          ))}
        </div>
      </>
    );
  },
  args: {
    id: 'scroll',
    title: 'Scroll',
    color: ButtonColor.Blue,
    content: <div>Modal Content</div>,
  },
};

export const Nested: Story = {
  render: (args) => {
    const modal2 = useModal({
      ...args,
      id: 'nested_modal_2',
      title: 'Child modal',
      content: (
        <div>
          <p>Very cool</p>
        </div>
      ),
      color: ButtonColor.Blue,
      actions: [
        {
          label: 'close',
          onClick: () => modal2.close(),
        },
      ],
    });

    const modal = useModal({
      ...args,
      id: 'nested_modal_1',
      title: 'Parent Modal',
      content: (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          iure
        </div>
      ),
      color: ButtonColor.Blue,
      actions: [
        {
          label: 'open',
          onClick: () => modal2.open(),
        },
        {
          label: 'close',
          onClick: () => modal.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
};

export const NoId: Story = {
  name: 'No ID',
  render: (args) => {
    const modal = useModal({
      ...args,
      actions: [
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
  args: {
    title: 'No ID Required',
    content: (
      <p>
        If you choose not to provide and ID for your modal, one will be
        magically generated and hashed!
      </p>
    ),
  },
};

const ExampleIcon = () => (
  <div
    style={{
      width: 30,
      height: 30,
      backgroundColor: '#e5e5e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      fontSize: 12,
    }}
  >
    🚀
  </div>
);

export const Icon: Story = {
  render: (args) => {
    const modal = useModal({
      ...args,
      actions: [
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
  args: {
    id: 'icon',
    title: 'Icon',
    content: <p>Modal with an icon</p>,
    icon: <ExampleIcon />,
  },
};

export const Stack: Story = {
  name: 'Toast (Stack)',
  decorators: [
    (Story) => (
      <div style={{ height: '95vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [openToast, setOpenToast] = React.useState(false);
    const modal = useModal({
      ...args,
      content: (
        <>
          <Button
            label="Spawn/Close Toast"
            color={ButtonColor.Blue}
            variant={ButtonVariant.Primary}
            onClick={() => setOpenToast(!openToast)}
          />
        </>
      ),
      actions: [
        {
          label: 'Close',
          variant: ButtonVariant.Primary,
          color: ButtonColor.Blue,
          onClick: () => modal.close(),
        },
      ],
    });

    return (
      <>
        <SpawnButton open={modal.open} />
        <Toast open={openToast} x="left" y="bottom" variant="error">
          Toast
        </Toast>
      </>
    );
  },
  args: {
    id: 'icon',
    variant: 'fullscreen',
    title: 'Modal',
  },
};

const DynamicModalContent = () => {
  return (
    <div style={{width: 1000}}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, omnis,
      sapiente autem deleniti nisi veritatis modi ex consequatur voluptatum,
      saepe facere reprehenderit! Maxime ad labore fugiat sit quod dolor error!
    </div>
  );
};

export const DynamicContentModal: Story = {
  render: (args) => {
    const modal = useModal({
      ...args,
      actions: [
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
        {
          label: 'Close',
          onClick: () => modal.close(),
        },
      ],
    });

    return <SpawnButton open={modal.open} />;
  },
  args: {
    id: 'dynamic content',
    variant: 'dynamic',
    title: 'Dynamic',
    color: ButtonColor.Blue,
    content: <DynamicModalContent/>,
  },
};
