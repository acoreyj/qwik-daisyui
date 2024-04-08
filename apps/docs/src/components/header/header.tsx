import { component$, useContext, useStore, useTask$ } from '@builder.io/qwik';
import { QwikBitsLogo } from '../icons/qwikbits';
import { Navbar, DaisyLink, Menu, MenuProps } from '@qwikbits/daisyui';
import { ThemeContext } from '../../routes/layout';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const lightMode = useContext(ThemeContext);
  const loc = useLocation();
  const items = useStore<{ menuItems: MenuProps['items'] }>(
    { menuItems: [] },
    {
      deep: false,
    }
  );
  const inactiveClass = 'text-primary dark:text-secondary';
  const activeClass =
    'inline-block bg-gradient-to-r from-accent via-primary to-secondary dark:from-accent from-25% via-50% to-75% dark:via-secondary dark:to-accent bg-clip-text !text-transparent';
  useTask$(({ track }) => {
    track(() => loc.url.pathname);
    items.menuItems = [
      {
        useQwikCityLink: true,
        href: '/',
        class: `p-0 m-2 underline-offset-8 decoration-2 text-lg font-bold ${
          loc.url.pathname === '/' ? activeClass : inactiveClass
        }`,
        label: 'Home',
        modifiers: {
          hover: true,
        },
      },
      {
        useQwikCityLink: true,
        href: '/components/',
        class: `p-0 m-2 underline-offset-8 decoration-2 text-lg font-bold ${
          loc.url.pathname === '/components/' ? activeClass : inactiveClass
        }`,
        label: 'Components',
        modifiers: {
          hover: true,
        },
      },
    ];
  });
  return (
    <>
      <div class="mb-20"></div>
      <header class="fixed top-0 left-0 w-full h-20 z-50">
        <Navbar class="bg-neutral">
          <div q:slot="start">
            <Menu
              variant={{ orientation: 'horizontal' }}
              items={items.menuItems}
            >
              <li role="menuitem" q:slot="end">
                <DaisyLink
                  href="https://github.com/genie-design/qwikbits"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Repo"
                >
                  <div class="icon-[lucide--github] text-3xl" />
                </DaisyLink>
              </li>
            </Menu>
          </div>
          <div q:slot="center">
            <div class="flex flex-col items-center">
              <QwikBitsLogo />
            </div>
          </div>
          <div q:slot="end">
            <Menu variant={{ orientation: 'horizontal' }}>
              <li aria-role="menuitem">
                <label aria-label="Theme Switcher" class="swap swap-rotate">
                  <input bind:checked={lightMode} id="theme" type="checkbox" />
                  <svg
                    class="swap-on fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    class="swap-off fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </li>
            </Menu>
          </div>
        </Navbar>
      </header>
    </>
  );
});
