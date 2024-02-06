import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';

export const config = {
  base: 'toggle',
  variants: {
    theme: {
      neutral: '',
      primary: 'toggle-primary',
      secondary: 'toggle-secondary',
      accent: 'toggle-accent',
      info: 'toggle-info',
      success: 'toggle-success',
      warning: 'toggle-warning',
      error: 'toggle-error',
    },
    size: {
      none: '',
      xs: 'toggle-xs',
      sm: 'toggle-sm',
      md: 'toggle-md',
      lg: 'toggle-lg',
    },
  },
};
const cvaFn = cva(config);

type InputProps = QwikIntrinsicElements['input'];
export type Props = {
  variant?: VariantProps<typeof cvaFn>;
  modifiers?: Record<string, boolean>;
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
    <>
      {/* @ts-expect-error QwikIntrinsicElements['input'] type is wrong */}
      <input
        {...rest}
        bind:checked={bindChecked}
        type="checkbox"
        class={cx(props.class, cvaFn(variant))}
      />
      <Slot />
    </>
  );
});
