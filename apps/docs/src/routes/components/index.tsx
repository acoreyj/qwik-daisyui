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
      const y = element.getBoundingClientRect().top + window.scrollY + offset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });

  const active = useSignal<string | null>('Button');

  const activeClass =
    'inline-block bg-gradient-to-r from-accent via-primary to-secondary dark:from-accent from-25% via-50% to-75% dark:via-secondary dark:to-accent bg-clip-text !text-transparent';

  useVisibleTask$(() => {
    const elements: HTMLElement[] = [];
    const main = document.getElementsByTagName('main')?.[0];
    const mainRect = main?.getBoundingClientRect();
    const scrollListener = () => {
      const intersector = document.getElementById('intersector');
      if (intersector && getComputedStyle(intersector).display === 'block') {
        if (elements.length === 0) {
          components.forEach((component) => {
            const element = document.getElementById(`${component}-header`);
            if (element) {
              elements.push(element);
            }
          });
        }
        const intersectorRect = intersector.getBoundingClientRect();
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.top < intersectorRect.bottom) {
            active.value = element.id.replace('-header', '');
          }
        });
        if (
          mainRect &&
          window.scrollY + window.innerHeight > mainRect.height - 25
        ) {
          active.value = components[components.length - 1];
        } else if (window.scrollY < intersectorRect.height / 2) {
          active.value = components[0];
        }
      }
    };
    scrollListener();
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  });
  return (
    <>
      <div class="grid grid-cols-1 lg:grid-cols-[max-content_1fr] pt-4 relative">
        <div class="lg:hidden mt-20"></div>
        <div
          class="hidden invisible fixed bg-base-100 top-0 left-0 lg:block h-96 w-full mt-20"
          id="intersector"
        ></div>
        <ul class="menu hidden lg:block lg:w-40 rounded-box lg:fixed lg:top-28">
          {components.map((component) => (
            <li key={component}>
              <a
                onClick$={(e) => {
                  e.preventDefault();
                  goTo(component);
                  setTimeout(() => {
                    active.value = component;
                  }, 50);
                }}
                class={`text-lg ${
                  active.value === component ? activeClass : ''
                }`}
                href={`#${component}`}
              >
                {component}
              </a>
            </li>
          ))}
        </ul>
        <div class="flex flex-col gap-6 lg:ml-40">
          <p class="bg-warning text-warning-content text-xl p-8 font-bold">
            Regrettably, there appear to be complications with the Qwik
            production build to Cloudflare, resulting in this page not being
            functional.
          </p>
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
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Bits - daisyUI Components',
  meta: [
    {
      name: 'description',
      content: 'Qwik Bits daisyUI Components',
    },
  ],
};
