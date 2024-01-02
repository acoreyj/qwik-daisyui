import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';
import { getModifiersClasses } from './utils';

export const config = {
  base: 'select',
  variants: {
    theme: {
      neutral: '',
      primary: 'select-primary',
      secondary: 'select-secondary',
      accent: 'select-accent',
      info: 'select-info',
      success: 'select-success',
      warning: 'select-warning',
      error: 'select-error',
    },
    size: {
      none: '',
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
    },
  },
  modifiers: {
    border: 'select-bordered',
    ghost: 'select-ghost',
  },
};
const cvaFn = cva(config);

type SelectElProps = QwikIntrinsicElements['select'];
export type Props = {
  variant?: VariantProps<typeof cvaFn>;
  modifiers?: Record<string, boolean>;
} & SelectElProps;
export const Component = component$((props: Props) => {
  const { variant, modifiers, ...rest } = props;
  const bindValue = useSignal(props.value?.toString() || '');
  useTask$(({ track }) => {
    track(() => bindValue.value);
    if (props['bind:value']) {
      props['bind:value'].value = bindValue.value;
    }
  });
  return (
    <>
      <select
        {...rest}
        bind:value={bindValue}
        class={cx(
          props.class,
          cvaFn(variant),
          getModifiersClasses(config.modifiers, modifiers)
        )}
      >
        <Slot />
      </select>
    </>
  );
});
