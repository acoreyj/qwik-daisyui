import { QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';

export const config = {
  base: 'checkbox',
  variants: {
    theme: {
      none: '',
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      info: 'checkbox-info',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      error: 'checkbox-error',
    },
    size: {
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
} & Omit<InputProps, 'type'>;
export const Component = component$((props: Props) => {
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
