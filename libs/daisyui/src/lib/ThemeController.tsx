import { component$ } from '@builder.io/qwik';

export const ThemeController = component$(() => {
  return (
    <>
      <input type="checkbox" value="qb-dark" class="toggle theme-controller" />
    </>
  );
});
