import { ReactElement } from 'react';
import ObjectView, { ObjectViewProps } from '../ObjectView';
import {
  DeserializedFocusEventCallback,
  SerializedFocusEventCallback,
  useFocusEventCallback,
} from './useFocusEventCallback';
import {
  DeserializedKeyboardEventCallback,
  SerializedKeyboardEventCallback,
  useKeyboardEventCallback,
} from './useKeyboardEventCallback';

export interface SerializedPickerEventProps {
  /** Handler that is called when the element receives focus. */
  onFocus?: SerializedFocusEventCallback;

  /** Handler that is called when the element loses focus. */
  onBlur?: SerializedFocusEventCallback;

  /** Handler that is called when a key is pressed */
  onKeyDown?: SerializedKeyboardEventCallback;

  /** Handler that is called when a key is released */
  onKeyUp?: SerializedKeyboardEventCallback;
}

export interface DeserializedPickerEventProps {
  /** Handler that is called when the element receives focus. */
  onFocus?: DeserializedFocusEventCallback;

  /** Handler that is called when the element loses focus. */
  onBlur?: DeserializedFocusEventCallback;

  /** Handler that is called when a key is pressed */
  onKeyDown?: DeserializedKeyboardEventCallback;

  /** Handler that is called when a key is released */
  onKeyUp?: DeserializedKeyboardEventCallback;
}

export type WrappedDHPickerJSApiProps<TProps> = Omit<TProps, 'table'> & {
  children: ReactElement<ObjectViewProps, typeof ObjectView>;
};

export type SerializedPickerProps<TProps> = TProps & SerializedPickerEventProps;

export type DeserializedPickerProps<TProps> = Omit<
  TProps,
  keyof SerializedPickerEventProps
> &
  DeserializedPickerEventProps;

/**
 * Wrap Picker props with the appropriate serialized event callbacks.
 * @param props Props to wrap
 * @returns Wrapped props
 */
export function usePickerProps<TProps>({
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  ...otherProps
}: SerializedPickerProps<TProps>): DeserializedPickerProps<TProps> {
  const serializedOnFocus = useFocusEventCallback(onFocus);
  const serializedOnBlur = useFocusEventCallback(onBlur);
  const serializedOnKeyDown = useKeyboardEventCallback(onKeyDown);
  const serializedOnKeyUp = useKeyboardEventCallback(onKeyUp);

  return {
    onFocus: serializedOnFocus,
    onBlur: serializedOnBlur,
    onKeyDown: serializedOnKeyDown,
    onKeyUp: serializedOnKeyUp,
    // The @deephaven/components `Picker` has its own normalization logic that
    // handles primitive children types (string, number, boolean). It also
    // handles nested children inside of `Item` and `Section` components, so
    // we are intentionally not wrapping `otherProps` in `mapSpectrumProps`
    ...otherProps,
  };
}
