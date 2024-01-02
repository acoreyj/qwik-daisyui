import {
  QwikIntrinsicElements,
  component$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';

export const config = {
  base: 'checkbox',
  variants: {
    theme: {
      neutral: '',
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      info: 'checkbox-info',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      error: 'checkbox-error',
    },
    size: {
      none: '',
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg',
    },
  },
};
const cvaFn = cva(config);

type InputProps = QwikIntrinsicElements['input'];

export type Props = {
  variant?: VariantProps<typeof cvaFn>;
} & Omit<InputProps, 'type' | 'children'>;
export const Component = component$((props: Props) => {
  const { variant, ...rest } = props;
  const bindChecked = useSignal(props.checked || false);
  useTask$(({ track }) => {
    track(() => bindChecked.value);
    if (props['bind:checked']) {
      props['bind:checked'].value = bindChecked.value;
    }
  });

  return (
    <input
      {...rest}
      bind:checked={bindChecked}
      type="checkbox"
      class={cx(props.class, cvaFn(variant))}
    />
  );
});
