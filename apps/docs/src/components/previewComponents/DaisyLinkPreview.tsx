import { component$, $ } from '@builder.io/qwik';
import { DaisyLink, daisyLinkConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';

export default component$(() => {
  const compTemplate = $(
    (variants: string, modifiers: string) =>
      `<DaisyLink class="text-xl font-bold" variant={${variants}} modifiers={${modifiers}}}> 
  Qwik Bits Daisy UI Link
</DaisyLink>`
  );
  return (
    <PreviewComponent
      componentClass="text-xl font-bold"
      componentId="DaisyLink"
      genieComponent={DaisyLink}
      variants={daisyLinkConfig.variants}
      modifiers={daisyLinkConfig.modifiers}
      componentTemplate$={compTemplate}
      daisyHref="https://daisyui.com/components/link/"
    >
      <p q:slot="note">
        You can also use the {'<DaisyCityLink>'} component to have the Qwik City
        Link component rather than a standard {'<a>'} tag
      </p>
      Qwik Bits Daisy UI Link
    </PreviewComponent>
  );
});
