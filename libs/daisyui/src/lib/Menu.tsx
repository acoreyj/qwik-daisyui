import { type QwikIntrinsicElements, component$, Slot } from '@builder.io/qwik';
import { cx, cva, VariantProps } from 'cva';
import { Component as DaisyLink, Props as DaisyLinkProps } from './DaisyLink';
import {
  Component as DaisyCityLink,
  Props as DaisyCityLinkProps,
} from './DaisyCityLink';
export type ULProps = QwikIntrinsicElements['ul'];
export const config = {
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
};
const cvaFn = cva(config);
export type MenuItemProps = {
  label: string;
  useQwikCityLink?: boolean;
} & (DaisyLinkProps | DaisyCityLinkProps);

export type Props = {
  variant?: VariantProps<typeof cvaFn>;
  title?: string;
  hasTitle?: boolean;
  items?: MenuItemProps[];
} & ULProps;

export const Component = component$((props: Props) => {
  const { variant, title, hasTitle, items, ...rest } = props;
  return (
    <>
      <ul role="menubar" {...rest} class={cx(props.class, cvaFn(variant))}>
        {title || hasTitle ? (
          <li class="menu-title">
            <Slot name="title" />
            {title ? <span>{title}</span> : null}
          </li>
        ) : null}
        <Slot />
        {items?.map((item, i) => (
          <li role="menuitem" key={i}>
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
