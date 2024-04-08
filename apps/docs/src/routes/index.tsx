import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { DaisyCityLink } from '@qwikbits/daisyui';
import { CodeBlock } from '~/components/code-block/code-block';

export default component$(() => {
  return (
    <div class="flex flex-col gap-16">
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
          <h3>
            <a href="/components/" class="hover:underline">
              daisyUI
            </a>
          </h3>
          <h5>
            The most popular component library for Tailwind CSS as Qwik
            components.
          </h5>
          <p>
            Including all the themes, options and modififers daisyUI provides.
          </p>
          <CodeBlock
            class="font-mono"
            language="javascript"
            code={'npm install @qwikbits/daisyui @qwikbits/utils'}
          />
          <DaisyCityLink
            class="btn max-w-max btn-primary self-end no-underline "
            href="/components/"
          >
            {' '}
            View Components
          </DaisyCityLink>
        </div>
        <div class="flex flex-col gap-8 h-full">
          <h3>Utils</h3>
          <h5>Utilities and other helpers for Qwik</h5>
          <p>
            Create components with variables and modifiers, fix 100vh on iPhone
            and more!
          </p>

          <div class="mt-auto">
            <CodeBlock
              class="font-mono"
              language="javascript"
              code={'npm install @qwikbits/utils'}
            />
          </div>
          <p>
            For example, use <span>Qwik Bits Variants</span> to make simple
            declaritive components styles such as:
          </p>

          <CodeBlock
            class="font-mono"
            language="javascript"
            code={
              '<Button variant={{"theme":"primary"}} modifiers={{"outline":true,"glass":true,"no-animation":false}}}>Button</Button>'
            }
          />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Bits',
  meta: [
    {
      name: 'description',
      content: 'Qwik UI Library',
    },
  ],
};
