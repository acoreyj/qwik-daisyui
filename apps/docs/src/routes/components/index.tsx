import { $, component$, useVisibleTask$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import SelectPreview from '~/components/previewComponents/SelectPreview';
import CheckboxPreview from '~/components/previewComponents/CheckboxPreview';
import TogglePreview from '~/components/previewComponents/TogglePreview';
import NavbarPreview from '~/components/previewComponents/NavbarPreview';
import DaisyLinkPreview from '~/components/previewComponents/DaisyLinkPreview';
import CardPreview from '~/components/previewComponents/CardPreview';
import TooltipPreview from '~/components/previewComponents/TooltipPreview';
import ButtonPreview from '~/components/previewComponents/ButtonPreview';
export default component$(() => {
  const components = [
    'Button',
    'DaisyLink',
    'Card',
    'Select',
    'Checkbox',
    'Toggle',
    'Tooltip',
    'Navbar',
  ];
  const goTo = $((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = -125;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + offset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });

  const active = useSignal<string | null>(null);

  const activeClass =
    'inline-block bg-gradient-to-r from-accent via-primary to-secondary dark:from-accent from-25% via-50% to-75% dark:via-secondary dark:to-accent bg-clip-text !text-transparent';
  useVisibleTask$(() => {
    const io = new window.IntersectionObserver((entries) => {
      const intersectingEntries = entries.filter(
        (entry) => entry.isIntersecting
      );
      console.log(intersectingEntries.map((entry) => entry.target.id));
      if (intersectingEntries.length) {
        active.value = intersectingEntries[0]?.target.id.replace('-header', '');
      }
    });
    for (const component of components) {
      io.observe(document.getElementById(`${component}-header`)!);
    }
  });
  return (
    <div class="grid grid-cols-1 lg:grid-cols-[max-content_1fr] pt-4 relative">
      <ul class="menu w-40 rounded-box fixed top-28">
        {components.map((component) => (
          <li key={component}>
            <a
              onClick$={(e) => {
                e.preventDefault();
                goTo(component);
              }}
              class={`text-lg ${active.value === component ? activeClass : ''}`}
              href={`#${component}`}
            >
              {component}
            </a>
          </li>
        ))}
      </ul>
      <div class="flex flex-col gap-6 ml-40">
        <ButtonPreview />
        <DaisyLinkPreview />
        <CardPreview />
        <SelectPreview />
        <CheckboxPreview />
        <TogglePreview />
        <TooltipPreview />
        <NavbarPreview />
      </div>
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
