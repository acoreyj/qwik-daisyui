import { type QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';
import { cx } from 'cva';
export type NavbarProps = QwikIntrinsicElements['div'];
export const Navbar = component$((props: NavbarProps) => {
  return (
    <>
      <div {...props} class={cx(props.class, 'navbar')}>
        <Slot />
        <div class="navbar-start">
          <Slot name="start" />
        </div>
        <div class="navbar-center">
          <Slot name="center" />
        </div>
        <div class="navbar-end">
          <Slot name="end" />
        </div>
      </div>
    </>
  );
});
