import { QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';

export type QwikHTMLElementProps<T extends keyof QwikIntrinsicElements> =
  QwikIntrinsicElements[T] & {
    tag?: string;
  };

export type QwikHTMLElementIntrinsic = QwikHTMLElementProps<
  keyof QwikIntrinsicElements
>;

export const QwikHTMLElement = component$(
  (props: QwikHTMLElementProps<keyof QwikIntrinsicElements>) => {
    const Component = props.tag;
    console.log({ Component });
    console.log(props);
    return (
      <>
        {Component ? (
          <Component {...props}>
            <Slot />
          </Component>
        ) : (
          <Slot />
        )}
      </>
    );
  }
);
