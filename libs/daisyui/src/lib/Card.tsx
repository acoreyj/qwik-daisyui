import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';
import { cva, cx } from 'cva';
import type { VariantProps } from 'cva';
import { getModifiersClasses } from './utils';
export const config = {
  base: 'card',
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
    padding: {
      default: '',
      normal: 'card-normal',
      compact: 'card-compact',
    },
    image: {
      normal: '',
      side: 'card-side',
      full: 'image-full',
    },
  },
  modifiers: {
    border: 'card-bordered',
    glass: 'glass',
  },
};
const cvaFn = cva(config);

type DivProps = QwikIntrinsicElements['div'];
export type Props = {
  variant?: VariantProps<typeof cvaFn>;
  modifiers?: Record<string, boolean>;
  image?: {
    src: string;
    width: number;
    height: number;
    alt?: string;
  };
  title?: string;
  description?: string;
} & Omit<DivProps, 'type'>;
export const Component = component$((props: Props) => {
  const { variant, modifiers, ...rest } = props;
  return (
    <>
      <div
        {...rest}
        class={cx(
          props.class,
          cvaFn(variant),
          getModifiersClasses(config.modifiers, modifiers)
        )}
      >
        <Slot name="start" />
        <Slot name="image" />
        {props.image ? (
          <figure>
            <img
              width={props.image.width}
              height={props.image.height}
              src={props.image.src}
              alt={props.image.alt}
            />
          </figure>
        ) : null}
        <div class="card-body">
          <Slot name="body-start" />
          <Slot name="title" />
          {props.title ? <h2 class="card-title">{props.title}</h2> : null}
          <Slot name="description" />
          {props.description ? <p>{props.description}</p> : null}
          <div class="card-actions justify-end">
            <Slot name="actions" />
          </div>
          <Slot name="body-end" />
        </div>
        <Slot name="image-end" />
        <Slot name="end" />
      </div>
    </>
  );
});
