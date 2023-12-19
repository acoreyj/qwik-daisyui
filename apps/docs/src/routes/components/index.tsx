import { QwikChangeEvent, component$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Select, selectConfig, Checkbox } from '@qwikbits/daisyui';
import { CodeBlock } from '~/components/code-block/code-block';

export default component$(() => {
  const variants = selectConfig.variants;
  const variantKeys = Object.keys(variants).reduce<
    Record<string, string | undefined>
  >((acc, key) => {
    acc[key] = undefined;
    return acc;
  }, {});
  const selectValues = useStore(variantKeys);
  const options = useStore<Record<string, boolean>>({});
  return (
    <>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 items-center  gap-4">
        {Object.keys(variants).map((key) => {
          const variantOptions = variants[key as keyof typeof variants];
          return (
            <div key={key} class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">{key}:</span>
                <Select
                  options={{ border: true }}
                  onChange$={(e) => (selectValues[key] = e.target.value)}
                  key={key}
                >
                  <option disabled selected>
                    {key}
                  </option>
                  {Object.keys(variantOptions).map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </Select>
              </label>
            </div>
          );
        })}
        {(
          Object.keys(
            selectConfig.options
          ) as (keyof typeof selectConfig.options)[]
        ).map((key) => {
          return (
            <div key={key} class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">{key}:</span>
                <Checkbox
                  onChange$={(e: QwikChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      options[key] = true;
                    } else {
                      options[key] = false;
                    }
                  }}
                  value={key}
                ></Checkbox>
              </label>
            </div>
          );
        })}
      </div>

      <div class="flex flex-col gap-16">
        <div
          class="p-8 rounded-2xl"
          style={{
            background:
              'repeating-linear-gradient(45deg, var(--fallback-b1,oklch(var(--b1)/1)), var(--fallback-b1,oklch(var(--b1)/1)) 10px, var(--fallback-n,oklch(var(--n)/1)) 10px, var(--fallback-n,oklch(var(--n)/1)) 20px)',
          }}
        >
          <Select variant={selectValues} options={options}>
            <option disabled selected>
              Title
            </option>
            <option>Test 1</option>

            <option>Test 2</option>
          </Select>
        </div>
      </div>

      <CodeBlock
        class="font-mono"
        language="markup"
        code={`<Select variant={${JSON.stringify(
          selectValues
        )}} options={${JSON.stringify(options)}}>
  <option disabled selected>
    Title
  </option>
  <option>Test 1</option>

  <option>Test 2</option>
</Select>`}
      />
      <div>
        <div
          class="component-preview not-prose text-base-content my-6 lg:my-12"
          id="Checkbox"
        >
          <div class="pb-2 text-sm font-bold">
            <h5>
              <a class="" href="#Checkbox">
                <span class="opacity-20">#</span>Checkbox
              </a>
            </h5>
          </div>{' '}
          <div class="grid">
            <div class="tabs tabs-lifted z-10 -mb-[var(--tab-border)] justify-self-start">
              <button class="tab tab-active [--tab-bg:var(--fallback-b1,oklch(var(--b1)))]">
                Preview
              </button>{' '}
              <button class="tab [--tab-border-color:transparent]">HTML</button>{' '}
              <button class="tab [--tab-border-color:transparent]">JSX</button>{' '}
              <div class="tab [--tab-border-color:transparent]"></div>
            </div>{' '}
            <div class="bg-base-300 rounded-b-box rounded-se-box relative overflow-x-auto">
              <div
                class="preview border-base-300 bg-base-100 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"
                style=""
              >
                <Checkbox />
              </div>
            </div>{' '}
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <h3>Checkbox</h3>
          <h5></h5>
          <div>
            <Checkbox />

            <Checkbox checked />

            <Checkbox variant={{ theme: 'primary' }} />
          </div>
          daisyUI Docs
        </div>
      </div>
    </>
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
