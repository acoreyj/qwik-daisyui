import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Daisyui } from './daisyui';

test(`[Daisyui Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Daisyui />);
  expect(screen.innerHTML).toContain('Daisyui works!');
});
