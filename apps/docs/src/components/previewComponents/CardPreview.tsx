import { component$, $, useSignal } from '@builder.io/qwik';
import { Card, cardConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';
import Image from '~/components/genie-image';
export default component$(() => {
  const checkboxComponentTemplate = $(
    (variants: string) => `<Checkbox variant={${variants}}/>`
  );
  const selectedVariants = useSignal<Record<string, string | undefined>>({});
  const selectedModifiers = useSignal<Record<string, boolean>>({});
  return (
    <PreviewComponent
      componentId="Card"
      hideDefaultComponent
      genieComponent={Card}
      variants={cardConfig.variants}
      modifiers={cardConfig.modifiers}
      componentTemplate$={checkboxComponentTemplate}
      onSelectedVariantsChange$={(selected) => {
        selectedVariants.value = selected;
      }}
      onSelectedModifiersChange$={(selected) => {
        selectedModifiers.value = selected;
      }}
      daisyHref="https://daisyui.com/components/card/"
    >
      <Card
        q:slot="additional"
        title="Webb Card Title"
        description="Webb Card Description"
        variant={selectedVariants.value}
        modifiers={selectedModifiers.value}
      >
        <Image
          q:slot="image"
          src="https://www.qwikbits.dev/images/qwikbits/crab-nebula-webb.jpg"
          alt="webb"
          width={500}
          height={436}
        ></Image>
      </Card>
    </PreviewComponent>
  );
});
