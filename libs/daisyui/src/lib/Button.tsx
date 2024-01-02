import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';
import { getModifiersClasses } from './utils';

export const config = {
  base: 'btn',
  variants: {
    theme: {
      neutral: '',
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
    },
    size: {
      none: '',
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
    shape: {
      default: '',
      wide: 'btn-wide',
      block: 'btn-block',
      circle: 'btn-circle',
      square: 'btn-square',
    },
  },
  modifiers: {
    link: 'btn-link',
    outline: 'btn-outline',
    active: 'btn-active',
    disabled: 'btn-disabled',
    ghost: 'btn-ghost',
    glass: 'glass',
    'no-animation': 'no-animation',
  },
};
const cvaFn = cva(config);

type btnElProps = QwikIntrinsicElements['button'];
export type Props = {
  variant?: VariantProps<typeof cvaFn>;
  modifiers?: Record<string, boolean>;
} & btnElProps;
export const Component = component$((props: Props) => {
  const { variant, modifiers, ...rest } = props;
  return (
    <>
      <button
        {...rest}
        class={cx(
          props.class,
          cvaFn(variant),
          getModifiersClasses(config.modifiers, modifiers)
        )}
      >
        <Slot />
      </button>
    </>
  );
});
