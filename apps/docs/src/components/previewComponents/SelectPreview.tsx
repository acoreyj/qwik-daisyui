import { component$, $ } from '@builder.io/qwik';
import { Select, selectConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';

export default component$(() => {
  const selectComponentTemplate = $(
    (
      variants: string,
      modifiers: string
    ) => `<Select variant={${variants}} modifiers={${modifiers}}}>
  <option disabled selected>
    Title
  </option>
  <option>Test 1</option>

  <option>Test 2</option>
</Select>`
  );
  return (
    <PreviewComponent
      componentId="Select"
      genieComponent={Select}
      variants={selectConfig.variants}
      modifiers={selectConfig.modifiers}
      componentTemplate$={selectComponentTemplate}
      daisyHref="https://daisyui.com/components/select/"
    >
      <option disabled selected>
        Title
      </option>
      <option>Test 1</option>

      <option>Test 2</option>
    </PreviewComponent>
  );
});
