import { Slot, component$ } from '@builder.io/qwik';
import { Link, type LinkProps } from '@builder.io/qwik-city';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';
const cvaFn = cva({
  base: 'link',
  variants: {
    theme: {
      neutral: 'link-neutral',
      primary: 'link-primary',
      secondary: 'link-secondary',
      accent: 'link-accent',
      info: 'link-info',
      success: 'link-success',
      warning: 'link-warning',
      error: 'link-error',
    },
    option: {
      hover: 'link-hover',
    },
  },
});

export type DaisyCityLinkProps = {
  variant?: VariantProps<typeof cvaFn>;
} & LinkProps;
export const DaisyCityLink = component$((props: DaisyCityLinkProps) => {
  const { variant, ...rest } = props;
  return (
    <>
      <Link {...rest} class={cx(props.class, cvaFn(variant))}>
        <Slot />
      </Link>
    </>
  );
});
