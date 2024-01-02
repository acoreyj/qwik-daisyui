import { component$, useSignal } from '@builder.io/qwik';
import { Toggle, toggleConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';

export default component$(() => {
  const selectedVariants = useSignal<Record<string, string | undefined>>({});
  return (
    <PreviewComponent
      daisyHref="https://daisyui.com/components/toggle/"
      componentId="Toggle"
      genieComponent={Toggle}
      variants={toggleConfig.variants}
      componentTemplate$={(variants) => `<Toggle variant={${variants}}/>`}
      onSelectedVariantsChange$={(selected) => {
        selectedVariants.value = selected;
      }}
    >
      <Toggle
        q:slot="additional"
        checked
        variant={selectedVariants.value}
        class="ml-2"
      />
    </PreviewComponent>
  );
});
