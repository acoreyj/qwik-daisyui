import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
export type Props = {
  source: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
};
export default component$((props: Props) => {
  const img = props.source;
  const src = img;
  const isBrowser = useSignal(false);
  useVisibleTask$(() => {
    isBrowser.value = true;
  });
  return isBrowser ? (
    <>
      <picture>
        <source
          srcset={`${src}?f=avif&w=3840 3840w,
			${src}?f=avif&w=1920 1920w,
			${src}?f=avif&w=1280 1280w,
			${src}?f=avif&w=960 960w,
			${src}?f=avif&w=640 640w,
			${src}?f=avif&w=384 384w,
			${src}?f=avif&w=144 144w
			`}
          type="image/avif"
        />
        <source
          srcset={`${src}?f=webp&w=3840 3840w,
					${src}?f=webp&w=1920 1920w,
					${src}?f=webp&w=1280 1280w,
					${src}?f=webp&w=960 960w,
					${src}?f=webp&w=640 640w,
					${src}?f=webp&w=384 384w,
					${src}?f=webp&w=144 144w
					`}
          type="image/webp"
        />

        <img
          srcset={`
		${src}?w=3840 3840w,
		${src}?w=1920 1920w,
		${src}?w=1280 1280w,
		${src}?w=960 960w,
		${src}?w=640 640w,
		${src}?w=384 384w,
		${src}?w=144 144w
	`}
          alt={props.alt || 'description'}
          decoding={props.decoding || 'async'}
          loading={props.loading || 'lazy'}
          width={props.width || 1280}
          height={props.height || 1280}
        />
      </picture>
    </>
  ) : null;
});
