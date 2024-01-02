import { type QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';
import { VariantProps, cva, cx } from 'cva';

export const config = {
  base: 'navbar',
  variants: {
    theme: {
      none: '',
      neutral: 'bg-neutral',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
    },
    blur: {
      none: 'backdrop-blur-none',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl',
      '2xl': 'backdrop-blur-2xl',
      '3xl': 'backdrop-blur-3xl',
    },
  },
};

type DivProps = QwikIntrinsicElements['div'];
export type Props = {
  variant?: VariantProps<typeof cvaFn>;
} & Omit<DivProps, 'children'>;

const cvaFn = cva(config);
export const Component = component$((props: Props) => {
  return (
    <>
      <div {...props} class={cx(props.class, cvaFn(props.variant))}>
        <Slot />
        <div class="navbar-start">
          <Slot name="start" />
        </div>
        <div class="navbar-center">
          <Slot name="center" />
        </div>
        <div class="navbar-end">
          <Slot name="end" />
        </div>
      </div>
    </>
  );
});
