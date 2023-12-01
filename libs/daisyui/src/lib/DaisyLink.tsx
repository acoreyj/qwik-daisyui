import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';
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

type AProps = QwikIntrinsicElements['a'];
export type DaisyLinkProps = {
  variant?: VariantProps<typeof cvaFn>;
} & AProps;
export const DaisyLink = component$((props: DaisyLinkProps) => {
  const { variant, ...rest } = props;
  return (
    <>
      <a {...rest} class={cx(props.class, cvaFn(variant))}>
        <Slot />
      </a>
    </>
  );
});
