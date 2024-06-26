import React from 'react';
import { SpectrumButton, SpectrumButtonProps } from '@deephaven/components';
import { useButtonProps } from './hooks/useButtonProps';
import { SerializedButtonEventProps } from './model/SerializedPropTypes';

export function Button(
  props: SerializedButtonEventProps<SpectrumButtonProps>
): JSX.Element {
  const buttonProps = useButtonProps(props);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SpectrumButton {...buttonProps} />;
}

Button.displayName = 'Button';

export default Button;
