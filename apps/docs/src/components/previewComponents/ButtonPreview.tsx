import { component$, $ } from '@builder.io/qwik';
import { Button, buttonConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';

export default component$(() => {
  const buttonComponentTemplate = $(
    (variants: string, modifiers: string) =>
      `<Button variant={${variants}} modifiers={${modifiers}}}>Button</Button>`
  );
  return (
    <PreviewComponent
      componentId="Button"
      genieComponent={Button}
      variants={buttonConfig.variants}
      modifiers={buttonConfig.modifiers}
      componentTemplate$={buttonComponentTemplate}
      daisyHref="https://daisyui.com/components/button/"
    >
      Button
    </PreviewComponent>
  );
});
