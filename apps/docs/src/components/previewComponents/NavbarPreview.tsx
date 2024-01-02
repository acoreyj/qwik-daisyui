import { component$, $, useSignal } from '@builder.io/qwik';
import { Navbar, navbarConfig } from '@qwikbits/daisyui';
import { PreviewComponent } from '~/components/PreviewComponent';

export default component$(() => {
  const selectComponentTemplate = $(
    (selected: string) => `<Navbar variant={${selected}>
  <div q:slot="start">Menu</div>
  <div q:slot="center">
    <button class="btn btn-ghost text-xl">Qwik Bits daisyUI</button>
  </div>
  <div q:slot="end">Github</div>
</Navbar>`
  );

  const selectedVariants = useSignal<Record<string, string | undefined>>({
    theme: 'neutral',
  });

  return (
    <>
      <PreviewComponent
        componentId="Navbar"
        daisyHref="https://daisyui.com/components/navbar/"
        hideDefaultComponent={true}
        genieComponent={Navbar}
        variants={navbarConfig.variants}
        componentTemplate$={selectComponentTemplate}
        selectedVariants={selectedVariants.value}
        onSelectedVariantsChange$={(selected) => {
          selectedVariants.value = selected;
        }}
      >
        <p q:slot="note">
          Gradients are behind the navbar to show the navbar background/blur
        </p>
        <div q:slot="additional" class="relative">
          <Navbar class="relative z-10" variant={selectedVariants.value}>
            <div q:slot="start">Menu</div>
            <div q:slot="center">
              <button class="btn btn-ghost text-xl">Qwik Bits daisyUI</button>
            </div>
            <div q:slot="end">Github</div>
          </Navbar>
          <div class="z-0  absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/4 h-8 w-20 bg-gradient-to-r from-primary to-secondary"></div>
          <div class="z-0 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-1/4 h-8 w-20 bg-gradient-to-r from-accent to-primary"></div>
        </div>
      </PreviewComponent>
    </>
  );
});
