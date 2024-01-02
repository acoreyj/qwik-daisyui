import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';
import { getModifiersClasses } from './utils';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';
export const config = {
  base: 'tooltip',
  variants: {
    theme: {
      none: '',
      primary: 'tooltip-primary',
      secondary: 'tooltip-secondary',
      accent: 'tooltip-accent',
      info: 'tooltip-info',
      success: 'tooltip-success',
      warning: 'tooltip-warning',
      error: 'tooltip-error',
    },
    direction: {
      top: 'tooltip-top',
      bottom: 'tooltip-bottom',
      left: 'tooltip-left',
      right: 'tooltip-right',
    },
  },
  modifiers: {
    open: 'tooltip-open',
  },
};
const cvaFn = cva(config);

type DivProps = QwikIntrinsicElements['div'];
export type Props = {
  variant?: VariantProps<typeof cvaFn>;
  modifiers?: Record<string, boolean>;
  tip?: string;
} & Omit<DivProps, 'type'>;
export const Component = component$((props: Props) => {
  const { variant, tip, modifiers, ...rest } = props;
  return (
    <>
      <div
        {...rest}
        class={cx(
          props.class,
          cvaFn(variant),
          getModifiersClasses(config.modifiers, modifiers)
        )}
        data-tip={tip}
      >
        <Slot />
      </div>
    </>
  );
});
