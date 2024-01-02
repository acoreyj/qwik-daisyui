import { component$, $, useSignal } from '@builder.io/qwik';
import { Checkbox, checkboxConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';

export default component$(() => {
  const checkboxComponentTemplate = $(
    (variants: string) => `<Checkbox variant={${variants}}/>`
  );
  const selectedVariants = useSignal<Record<string, string | undefined>>({});
  return (
    <PreviewComponent
      componentId="Checkbox"
      genieComponent={Checkbox}
      variants={checkboxConfig.variants}
      componentTemplate$={checkboxComponentTemplate}
      onSelectedVariantsChange$={(selected) => {
        selectedVariants.value = selected;
      }}
      daisyHref="https://daisyui.com/components/checkbox/"
    >
      <Checkbox
        class="ml-2"
        q:slot="additional"
        checked
        variant={selectedVariants.value}
      />
    </PreviewComponent>
  );
});
