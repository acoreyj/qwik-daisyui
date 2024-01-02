import { Slot, component$ } from '@builder.io/qwik';

import { Link, type LinkProps } from '@builder.io/qwik-city';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';
import { getModifiersClasses } from './utils';
export const config = {
  base: 'link',
  variants: {
    theme: {
      none: '',
      neutral: 'link-neutral',
      primary: 'link-primary',
      secondary: 'link-secondary',
      accent: 'link-accent',
      info: 'link-info',
      success: 'link-success',
      warning: 'link-warning',
      error: 'link-error',
    },
  },
  modifiers: {
    //Only show underline on hover
    hover: 'link-hover',
  },
};
const cvaFn = cva(config);

export type Props = {
  variant?: VariantProps<typeof cvaFn>;
  modifiers?: Record<string, boolean>;
} & LinkProps;
export const Component = component$((props: Props) => {
  const { variant, modifiers, ...rest } = props;
  return (
    <>
      <Link
        {...rest}
        class={cx(
          props.class,
          cvaFn(variant),
          getModifiersClasses(config.modifiers, modifiers)
        )}
      >
        <Slot />
      </Link>
    </>
  );
});
