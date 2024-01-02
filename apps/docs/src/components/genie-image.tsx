import { component$ } from '@builder.io/qwik';
export type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
};
export default component$((props: Props) => {
  return (
    <>
      <picture>
        <source srcSet={`${props.src}?f=avif&w=3840 3840w`} type="image/avif" />
        <source srcSet={`${props.src}?f=avif&w=1920 1920w`} type="image/avif" />
        <source srcSet={`${props.src}?f=avif&w=1280 1280w`} type="image/avif" />
        <source srcSet={`${props.src}?f=avif&w=960 960w`} type="image/avif" />
        <source srcSet={`${props.src}?f=avif&w=640 640w`} type="image/avif" />

        <source srcSet={`${props.src}?f=webp&w=3840 3840w`} type="image/webp" />
        <source srcSet={`${props.src}?f=webp&w=1920 1920w`} type="image/webp" />
        <source srcSet={`${props.src}?f=webp&w=1280 1280w`} type="image/webp" />
        <source srcSet={`${props.src}?f=webp&w=960 960w`} type="image/webp" />
        <source srcSet={`${props.src}?f=webp&w=640 640w`} type="image/webp" />

        <source srcSet={`${props.src}?w=3840 3840w`} />
        <source srcSet={`${props.src}?w=1920 1920w`} />
        <source srcSet={`${props.src}?w=1280 1280w`} />
        <source srcSet={`${props.src}?w=960 960w`} />
        <source srcSet={`${props.src}?w=640 640w`} />

        <img
          src={`${props.src}`}
          alt={props.alt || 'description'}
          decoding={props.decoding || 'async'}
          loading={props.loading || 'lazy'}
          width={props.width || 1280}
          height={props.height || 1280}
        />
      </picture>
    </>
  );
});
