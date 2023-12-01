import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { CodeBlock } from '../components/code-block/code-block';

export default component$(() => {
  return (
    <div class="flex flex-col gap-16 mt-8">
      <div class="flex flex-col items-center">
        <h1 class="w-fit flex items-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-[#18b6f6] to-[#ac7ef4]">
          Qwik Bits
        </h1>
        <p class="font-bold text-3xl text-base-content">
          Your one stop for accessible components and other helpers for Qwik
        </p>
      </div>
      <div class="grid lg:grid-cols-2 gap-16">
        <div class="flex flex-col gap-8">
          <h3>daisyUI</h3>
          <h5>
            The most popular component library for Tailwind CSS as Qwik
            components.
          </h5>
          <h5>
            Highly customizable, to the point of being able to change individual
            element tags that the component creates.
          </h5>
          <p>
            Current components are Collapse, Dialog, Dropdown, Tabs and Toggle
          </p>
          <CodeBlock
            class="font-mono"
            language="javascript"
            code={'npm install @qwikbits/daisyui @qwikbits/utils'}
          />
          Headless UI Docs
        </div>
        <div class="flex flex-col gap-8 h-full">
          <h3>Utils</h3>
          <h5>Utilities and other helpers for Qwik</h5>
          <p>
            Create a Qwik component based on the tag name, serialize class
            props, fix 100vh on iPhone and more!
          </p>
          <div class="mt-auto">
            <CodeBlock
              class="font-mono"
              language="javascript"
              code={'npm install @qwikbits/utils'}
            />
          </div>
          Utils Docs
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
