import { component$, useSignal } from '@builder.io/qwik';
import { Tooltip, tooltipConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';

export default component$(() => {
  const selectedVariants = useSignal<Record<string, string | undefined>>({});
  const selectedModifiers = useSignal<Record<string, boolean>>({});
  return (
    <PreviewComponent
      daisyHref="https://daisyui.com/components/tooltip/"
      componentId="Tooltip"
      genieComponent={Tooltip}
      variants={tooltipConfig.variants}
      modifiers={tooltipConfig.modifiers}
      componentTemplate$={(variants, modifiers) => `<Tooltip
  tip={'hello world'}
  variant={${variants}}
  modifiers={${modifiers}}
>
  <button class="btn">Hover me</button>
</Tooltip>`}
      onSelectedVariantsChange$={(selected) => {
        selectedVariants.value = selected;
      }}
      onSelectedModifiersChange$={(selected) => {
        selectedModifiers.value = selected;
      }}
      hideDefaultComponent
    >
      <div class="flex gap-20 flex-col md:flex-row" q:slot="additional">
        <Tooltip
          tip={'hello'}
          variant={selectedVariants.value}
          modifiers={selectedModifiers.value}
        >
          <button class="btn">Hover me</button>
        </Tooltip>
        <Tooltip
          tip={'hello'}
          variant={selectedVariants.value}
          modifiers={{ open: true }}
        >
          <button class="btn">Hover me</button>
        </Tooltip>
      </div>
    </PreviewComponent>
  );
});
