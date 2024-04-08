import { component$, $ } from '@builder.io/qwik';
import { buttonConfig, Button } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';

export type Props = {
  hideDaisyLink?: boolean;
};
export default component$((props: Props) => {
  const buttonComponentTemplate = $(
    (variants: string, modifiers: string) =>
      `<Button variant={${variants}} modifiers={${modifiers}}}>Button</Button>`
  );
  return (
    <PreviewComponent
      genieComponent={Button}
      hideDaisyLink={props.hideDaisyLink}
      componentId="Button"
      variants={buttonConfig.variants}
      modifiers={buttonConfig.modifiers}
      componentTemplate$={buttonComponentTemplate}
      daisyHref="https://daisyui.com/components/button/"
    >
      Button
    </PreviewComponent>
  );
});
