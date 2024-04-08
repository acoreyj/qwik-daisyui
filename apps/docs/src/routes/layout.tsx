import {
  component$,
  createContextId,
  Signal,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import Header from '../components/header/header';
import { routeLoader$ } from '@builder.io/qwik-city';
import { isBrowser } from '@builder.io/qwik/build';
import { VHElement } from '@qwikbits/utils';
export const ThemeContext =
  createContextId<Signal<boolean>>('docs.theme-context');
export default component$(() => {
  const serverTheme = useTheme();
  const lightMode = useSignal<boolean | null>(
    serverTheme.value === 'light' ||
      (isBrowser && !window.matchMedia) ||
      (isBrowser &&
        !window.matchMedia('(prefers-color-scheme: dark)').matches) ||
      null
  );

  useVisibleTask$(() => {
    let cookies: Record<string, string> = {};
    if (!serverTheme?.value) {
      cookies = document.cookie.split(';').reduce((acc, c) => {
        const [key, value] = c.trim().split('=');
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
    }
    const theme = serverTheme?.value || cookies.theme;
    if (theme === 'light') {
      lightMode.value = true;
    } else if (theme === 'dark') {
      lightMode.value = false;
    } else {
      lightMode.value =
        !window.matchMedia ||
        !window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });
  useVisibleTask$((ctx) => {
    ctx.track(() => lightMode.value);
    document.cookie = `theme=${lightMode.value ? 'light' : 'dark'};`;
  });
  useContextProvider(ThemeContext, lightMode);
  return (
    <main>
      <VHElement
        class={{
          dark: !lightMode.value,
          light: !!lightMode.value,
        }}
        data-theme={lightMode.value ? 'qb-light' : 'qb-dark'}
      >
        <Header />
        <section class="px-6 z-10 pt-8">
          <Slot />
        </section>
      </VHElement>
    </main>
  );
});

export const useTheme = routeLoader$(({ cookie }) => {
  const theme = cookie.get('theme');
  return theme?.value;
});
