import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { vi } from 'vitest';

import Button, { ButtonColor, ButtonType, ButtonVariant } from './Button';

describe('Button component', () => {
  test('does render correctly', () => {
    const button = renderer
      .create(
        <Button
          label="Test"
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
        />,
      )
      .toJSON();

    expect(button).toMatchSnapshot();
  });

  describe('button element is of type', () => {
    test('button by default', () => {
      const { getByText } = render(
        <Button
          label="Test"
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
        />,
      );

      expect(getByText('Test').getAttribute('type')).toBe('button');
    });

    test('button', () => {
      const { getByText } = render(
        <Button
          label="Test"
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
          type={ButtonType.Button}
        />,
      );

      expect(getByText('Test').getAttribute('type')).toBe('button');
    });

    test('submit', () => {
      const { getByText } = render(
        <Button
          label="Test"
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
          type={ButtonType.Submit}
        />,
      );

      expect(getByText('Test').getAttribute('type')).toBe('submit');
    });

    test('reset', () => {
      const { getByText } = render(
        <Button
          label="Test"
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
          type={ButtonType.Reset}
        />,
      );

      expect(getByText('Test').getAttribute('type')).toBe('reset');
    });

    test('link', () => {
      const { getByRole } = render(
        <Button
          label="Test"
          href="test.com"
          variant={ButtonVariant.Primary}
          color={ButtonColor.Red}
          type={ButtonType.Link}
        />,
      );
      const anchor = getByRole('link');

      expect(anchor).toBeTruthy();
      expect(anchor.textContent).toEqual('Test');
      expect(anchor.getAttribute('href')).toEqual('test.com');
    });
  });

  it('renders the button with the given label', () => {
    const screen = render(
      <Button
        label="Test Button"
        variant={ButtonVariant.Primary}
        color={ButtonColor.Red}
      />,
    );
    const button = screen.getByText('Test Button');

    expect(button).toBeInTheDocument();
  });

  it('renders the button with an icon prefix and suffix', () => {
    const { container } = render(
      <Button
        label="Test Button"
        variant={ButtonVariant.Primary}
        color={ButtonColor.Red}
        iconPrefix={<span data-testid="icon-prefix" />}
        iconSuffix={<span data-testid="icon-suffix" />}
      />,
    );

    expect(
      container.querySelector('[data-testid="icon-prefix"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="icon-suffix"]'),
    ).toBeInTheDocument();
  });

  it('renders the button with a link', () => {
    const { container } = render(
      <Button
        label="Test Button"
        variant={ButtonVariant.Primary}
        color={ButtonColor.Red}
        type={ButtonType.Link}
        href="https://example.com"
      />,
    );

    const link = container.querySelector('a');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('triggers onClick event when clicked', () => {
    const handleClick = vi.fn();

    const screen = render(
      <Button
        label="Test Button"
        variant={ButtonVariant.Primary}
        color={ButtonColor.Red}
        onClick={handleClick}
      />,
    );

    const button = screen.getByText('Test Button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders the button with loading state', () => {
    const screen = render(
      <Button
        label="Test Button"
        variant={ButtonVariant.Primary}
        color={ButtonColor.Red}
        loading={true}
      />,
    );

    const spinner = screen.getByTestId('button-spinner');

    expect(spinner).toBeInTheDocument();
  });

  it('applies custom className and style', () => {
    const { container } = render(
      <Button
        label="Test Button"
        variant={ButtonVariant.Primary}
        color={ButtonColor.Red}
        className="custom-class"
        style={{ backgroundColor: 'yellow' }}
      />,
    );

    const button = container.querySelector('.custom-class');

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: 'yellow' });
  });
});
