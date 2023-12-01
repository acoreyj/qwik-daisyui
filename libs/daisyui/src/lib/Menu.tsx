import { type QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';
import { cx, cva, VariantProps } from 'cva';
import { DaisyLink, DaisyLinkProps } from './DaisyLink';
import { DaisyCityLink, DaisyCityLinkProps } from './DaisyCityLink';
export type ULProps = QwikIntrinsicElements['ul'];
const cvaFn = cva({
  base: 'menu',
  variants: {
    size: {
      xs: 'menu-xs',
      sm: 'menu-sm',
      md: 'menu-md',
      lg: 'menu-lg',
    },
    orientation: {
      horizontal: 'menu-horizontal',
      vertical: 'menu-vertical',
    },
  },
});
export type MenuItemProps = {
  label: string;
  useQwikCityLink?: boolean;
} & (DaisyLinkProps | DaisyCityLinkProps);

export type MenuProps = {
  variant?: VariantProps<typeof cvaFn>;
  title?: string;
  hasTitle?: boolean;
  items?: MenuItemProps[];
} & ULProps;

export const Menu = component$((props: MenuProps) => {
  return (
    <>
      <ul
        aria-role="menubar"
        {...props}
        class={cx(props.class, cvaFn(props.variant))}
      >
        {props.title || props.hasTitle ? (
          <li class="menu-title">
            <Slot name="title" />
            {props.title ? <span>{props.title}</span> : null}
          </li>
        ) : null}
        <Slot />
        {props?.items?.map((item, i) => (
          <li aria-role="menuitem" key={i}>
            {item.useQwikCityLink ? (
              <DaisyCityLink {...item}>{item.label}</DaisyCityLink>
            ) : (
              <DaisyLink {...item}>{item.label}</DaisyLink>
            )}
          </li>
        ))}
        <Slot name="end" />
      </ul>
    </>
  );
});
