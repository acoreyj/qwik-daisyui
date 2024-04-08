import { component$, $, useSignal } from '@builder.io/qwik';
import { Card, cardConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';
import Image from '~/components/genie-image';
export default component$(() => {
  const checkboxComponentTemplate = $(
    (variants: string, modifiers: string) => `<Card
  q:slot="additional"
  title="Webb Card Title"
  description="Webb Card Description"
  variant={${variants}}
  modifiers={${modifiers}}
>
  <img>
    q:slot="image"
    src="https://www.qwikbits.dev/images/qwikbits/crab-nebula-webb.jpg"
    alt="webb"
    width={500}
    height={436}
  ></img>
</Card>`
  );
  const selectedVariants = useSignal<Record<string, string | undefined>>({
    theme: 'neutral',
  });
  const selectedModifiers = useSignal<Record<string, boolean>>({});
  return (
    <PreviewComponent
      componentId="Card"
      hideDefaultComponent
      genieComponent={Card}
      variants={cardConfig.variants}
      modifiers={cardConfig.modifiers}
      componentTemplate$={checkboxComponentTemplate}
      selectedVariants={selectedVariants.value}
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
        class="max-w-96"
        description="Webb Card Description"
        variant={selectedVariants.value}
        modifiers={selectedModifiers.value}
      >
        <Image
          q:slot="image"
          source="https://www.qwikbits.dev/images/qwikbits/crab-nebula-webb.jpg"
          alt="webb"
          width={500}
          height={436}
        ></Image>
      </Card>
    </PreviewComponent>
  );
});
