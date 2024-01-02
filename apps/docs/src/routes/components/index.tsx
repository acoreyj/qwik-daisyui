import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import SelectPreview from '~/components/previewComponents/SelectPreview';
import CheckboxPreview from '~/components/previewComponents/CheckboxPreview';
import TogglePreview from '~/components/previewComponents/TogglePreview';
import NavbarPreview from '~/components/previewComponents/NavbarPreview';
import DaisyLinkPreview from '~/components/previewComponents/DaisyLinkPreview';
import CardPreview from '~/components/previewComponents/CardPreview';
export default component$(() => {
  return (
    <div class="flex flex-col gap-6 my-6 lg:my-12">
      <CardPreview />
      <DaisyLinkPreview />
      <NavbarPreview />
      <SelectPreview />
      <CheckboxPreview />
      <TogglePreview />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Bits daisyUI Components',
  meta: [
    {
      name: 'description',
      content: 'Qwik Bits daisyUI Components',
    },
  ],
};
