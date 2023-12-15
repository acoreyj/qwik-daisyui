import { QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';
const cvaFn = cva({
  base: 'card',
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
export type CardProps = {
  variant?: VariantProps<typeof cvaFn>;
} & Omit<InputProps, 'type'>;
export const Card = component$((props: CardProps) => {
  const { variant, ...rest } = props;
  return (
    <>
      <div class={cx(props.class, cvaFn(variant))}>
        <div class="card-body">
          <h2 class="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <input
        {...rest}
        type="checkbox"
        class={cx(props.class, cvaFn(variant))}
      />
    </>
  );
});
