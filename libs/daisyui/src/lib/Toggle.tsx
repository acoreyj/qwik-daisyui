import { QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';
const cvaFn = cva({
  base: 'toggle',
  variants: {
    theme: {
      primary: 'toggle-primary',
      secondary: 'toggle-secondary',
      accent: 'toggle-accent',
      info: 'toggle-info',
      success: 'toggle-success',
      warning: 'toggle-warning',
      error: 'toggle-error',
    },
    size: {
      xs: 'toggle-xs',
      sm: 'toggle-sm',
      md: 'toggle-md',
      lg: 'toggle-lg',
    },
  },
});

type InputProps = QwikIntrinsicElements['input'];
export type ToggleProps = {
  variant?: VariantProps<typeof cvaFn>;
} & Omit<InputProps, 'type'>;
export const Toggle = component$((props: ToggleProps) => {
  const { variant, ...rest } = props;
  return (
    <>
      <input
        {...rest}
        type="checkbox"
        class={cx(props.class, cvaFn(variant))}
      />
    </>
  );
});
