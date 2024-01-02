import {
  QwikChangeEvent,
  Slot,
  component$,
  useSignal,
  useStore,
  useTask$,
} from '@builder.io/qwik';
import { Checkbox, DaisyLink, Select } from '@qwikbits/daisyui';
import { CodeBlock } from './code-block/code-block';
import type { QRL, Component as QwikComponent } from '@builder.io/qwik';

export type Props = {
  componentId: string;
  genieComponent?: QwikComponent<{
    class?: string;
    variant?: Record<string, string | undefined>;
    modifiers?: Record<string, boolean>;
  }>;
  componentTemplate$: QRL<(variants: string, modifiers: string) => string>;
  variants?: Record<string, Record<string, string | undefined>>;
  modifiers?: Record<string, string>;
  selectedVariants?: Record<string, string | undefined>;
  onSelectedVariantsChange$?: QRL<
    (selectedVariants: Record<string, string | undefined>) => void
  >;
  onSelectedModifiersChange$?: QRL<
    (selectedModifiers: Record<string, boolean>) => void
  >;
  hideDefaultComponent?: boolean;
  componentClass?: string;
  daisyHref?: string;
};
export const PreviewComponent = component$((props: Props) => {
  const code = useSignal('');
  const {
    variants,
    modifiers,
    componentId,
    componentTemplate$,
    hideDefaultComponent,
  } = props;
  const GenieComponent = props.genieComponent;

  const auto = useSignal(false);
  const variantKeys = Object.keys(variants || {});
  const selectedVariantsDefault =
    props.selectedVariants ||
    Object.keys(variants || {}).reduce<Record<string, string | undefined>>(
      (acc, key) => {
        acc[key] = undefined;
        return acc;
      },
      {}
    );
  const selectedVariants = useStore(selectedVariantsDefault);
  const selectedModifiers = useStore<Record<string, boolean>>({});
  const modifiersKeys = Object.keys(modifiers || {});

  useTask$(({ track }) => {
    track(selectedVariants);
    if (props.onSelectedVariantsChange$) {
      props.onSelectedVariantsChange$(selectedVariants);
    }
  });
  useTask$(({ track }) => {
    track(selectedModifiers);
    if (props.onSelectedModifiersChange$) {
      props.onSelectedModifiersChange$(selectedModifiers);
    }
  });
  useTask$(async ({ track }) => {
    track(() =>
      Object.values(selectedVariants).concat(
        Object.values(selectedModifiers).map((v) => v.toString())
      )
    );
    code.value = await componentTemplate$(
      JSON.stringify(selectedVariants),
      JSON.stringify(selectedModifiers)
    );
  });

  // Inside the component
  useTask$(({ track, cleanup }) => {
    const delay = 1000;
    track(() => auto.value);
    let intervalId: NodeJS.Timeout | undefined;
    if (auto.value) {
      let keyIndex = 0;
      let selectionIndex = 0;
      let optionIndex = -1;
      intervalId = setInterval(() => {
        if (optionIndex > -1) {
          selectedModifiers[modifiersKeys[optionIndex]] = true;
          const currIndex = optionIndex;
          setTimeout(() => {
            selectedModifiers[modifiersKeys[currIndex]] = false;
          }, delay);
          optionIndex = (optionIndex + 1) % modifiersKeys.length;
          if (optionIndex === 0) {
            optionIndex = -1;
          }
        } else {
          const key = variantKeys[keyIndex];
          if (key && variants) {
            const selectedVariantKeys = Object.keys(
              variants[key as keyof typeof variants]
            );
            const variantKey = selectedVariantKeys[selectionIndex];
            selectedVariants[key] = variantKey;
            selectionIndex = (selectionIndex + 1) % selectedVariantKeys.length;
            if (selectionIndex === 0) {
              const currKey = key;
              setTimeout(() => {
                selectedVariants[currKey] = selectedVariantKeys[0];
              }, delay);
              keyIndex = (keyIndex + 1) % Object.keys(variants).length;
              if (keyIndex === 0) {
                optionIndex = 0;
              }
            }
          } else {
            optionIndex = 0;
          }
        }
      }, delay); // Changes every second
    } else {
      clearInterval(intervalId);
    }
    // Clear interval on component unmount
    cleanup(() => clearInterval(intervalId));
  });

  return (
    <>
      <div
        class="component-preview not-prose text-base-content flex flex-col gap-4"
        id={componentId}
      >
        <div class="">
          <h5 class="font-bold">
            <a class="" href={`#${componentId}`}>
              <span class="opacity-20"># </span>
              {componentId}
            </a>
          </h5>
          {props.daisyHref ? (
            <div class="gap-2">
              <DaisyLink
                class="inline-flex gap-1 items-center font-mono bg-clip-text text-transparent text-lg bg-gradient-to-r from-[#1ad1a5] to-[#ff9903]"
                target="_blank"
                referrerPolicy="no-referrer"
                href={props.daisyHref}
                modifiers={{ hover: true }}
              >
                daisyUI docs
                <span class="icon-[lucide--external-link] text-[#1ad1a5]" />
              </DaisyLink>
            </div>
          ) : null}
        </div>
        {GenieComponent && (variants || modifiers) ? (
          <div class="form-control ">
            <label class="label cursor-pointer justify-start gap-8">
              <span class="label-text">Auto Preview:</span>
              <Checkbox bind:checked={auto}></Checkbox>
            </label>
          </div>
        ) : null}
        <div class="grid md:grid-cols-2 lg:grid-cols-4 items-center gap-4">
          {variants && Object.keys(variants).length > 0
            ? Object.keys(variants).map((key) => {
                const variantOptions = variants[key as keyof typeof variants];
                return (
                  <div key={key} class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text">{key}:</span>
                      <Select
                        modifiers={{ border: true }}
                        onChange$={(e) =>
                          (selectedVariants[key] = e.target.value)
                        }
                        key={key}
                        value={selectedVariants[key]}
                      >
                        <option disabled selected={!selectedVariants[key]}>
                          {key}
                        </option>
                        {Object.keys(variantOptions).map((option) => {
                          return (
                            <option
                              key={option}
                              value={option}
                              selected={option === selectedVariants[key]}
                            >
                              {option}
                            </option>
                          );
                        })}
                      </Select>
                    </label>
                  </div>
                );
              })
            : null}
          {modifiers && modifiersKeys.length > 0
            ? (modifiersKeys as (keyof typeof modifiers)[]).map((key) => {
                return (
                  <div key={key} class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text">{key}:</span>
                      <Checkbox
                        checked={selectedModifiers[key]}
                        onChange$={(e: QwikChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            selectedModifiers[key] = true;
                          } else {
                            selectedModifiers[key] = false;
                          }
                        }}
                        value={key}
                      ></Checkbox>
                    </label>
                  </div>
                );
              })
            : null}
        </div>

        <Slot name="note" />
        <div class="flex flex-col gap-16">
          <div
            class="p-8 rounded-2xl"
            style={{
              background:
                'repeating-linear-gradient(45deg, var(--fallback-b1,oklch(var(--b1)/1)), var(--fallback-b1,oklch(var(--b1)/1)) 10px, var(--fallback-n,oklch(var(--n)/1)) 10px, var(--fallback-n,oklch(var(--n)/1)) 20px)',
            }}
          >
            {GenieComponent && !hideDefaultComponent ? (
              <GenieComponent
                class={props.componentClass}
                variant={selectedVariants}
                modifiers={selectedModifiers}
              >
                <Slot />
                <Slot name="component" />
              </GenieComponent>
            ) : null}
            <Slot name="additional" />
          </div>
        </div>

        <CodeBlock
          wrapperClass="mockup-code bg-[#fff] dark:bg-[#011627]"
          class="font-mono"
          language="jsx"
          code={code.value}
        />
      </div>
    </>
  );
});
