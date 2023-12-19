import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';

export const config = {
  base: 'select',
  variants: {
    theme: {
      none: '',
      primary: 'select-primary',
      secondary: 'select-secondary',
      accent: 'select-accent',
      info: 'select-info',
      success: 'select-success',
      warning: 'select-warning',
      error: 'select-error',
    },
    size: {
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
    },
  },
  options: {
    border: 'select-bordered',
    ghost: 'select-ghost',
  },
};
const cvaFn = cva(config);

type SelectElProps = QwikIntrinsicElements['select'];
export type Props = {
  variant?: VariantProps<typeof cvaFn>;
  options?: Record<string, boolean>;
} & SelectElProps;
export const Component = component$((props: Props) => {
  const { variant, options, ...rest } = props;
  console.log('ops', options);
  let cls = props.class || '';
  if (options) {
    Object.keys(options).forEach((key) => {
      if (options[key]) {
        cls += ' ' + config.options[key as keyof typeof config.options];
      }
    });
  }
  return (
    <>
      <select {...rest} class={cx(cls, cvaFn(variant))}>
        <Slot />
      </select>
    </>
  );
});
