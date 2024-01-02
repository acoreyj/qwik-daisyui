import { ClassList, component$, useSignal, useStyles$ } from '@builder.io/qwik';
// Set to global so that prism language plugins can find it.

import prismjs from 'prismjs';
const _global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof global !== 'undefined' && global) ||
  (typeof self !== 'undefined' && self) ||
  (typeof this !== 'undefined' && this) ||
  (typeof window !== 'undefined' && window);
(_global as { PRISM?: typeof prismjs }).PRISM = prismjs;
import jsx from './prism-jsx';
import stylesDark from './prism-night-owl.css?inline';
import styles from './prism-vs.css?inline';
import { Tooltip } from '@qwikbits/daisyui';
interface CodeBlockProps {
  path?: string;
  language?:
    | 'markup'
    | 'css'
    | 'javascript'
    | 'json'
    | 'jsx'
    | 'tsx'
    | 'typescript';
  code: string;
  class?: ClassList;
  codeClass?: ClassList;
  wrapperClass?: ClassList;
}

export const CodeBlock = component$((props: CodeBlockProps) => {
  useStyles$(styles);
  useStyles$(stylesDark);
  let language = props.language;
  if (!language && props.path && props.code) {
    const ext = props.path.split('.').pop();
    language =
      ext === 'js' || ext === 'json'
        ? 'javascript'
        : ext === 'html'
        ? 'markup'
        : ext === 'css'
        ? 'css'
        : undefined;
  }
  if (language && !prismjs.languages[language]) {
    if (language === 'jsx') {
      jsx(prismjs);
    } else {
      language = 'javascript';
    }
  }

  const status = useSignal('');
  if (language && prismjs.languages[language]) {
    const highlighted = prismjs.highlight(
      props.code,
      prismjs.languages[language],
      language
    );
    const className = `language-${language}`;
    return (
      <div class={['code-block relative', props.wrapperClass]}>
        <pre class={[className, props.class]}>
          <code
            class={[className, props.codeClass]}
            dangerouslySetInnerHTML={highlighted}
          />
        </pre>
        <Tooltip
          class=" absolute right-8 top-3"
          tip={status.value === 'success' ? 'Copied!' : 'Copy'}
          variant={{ direction: 'left' }}
        >
          <button
            onClick$={async () => {
              try {
                await navigator.clipboard.writeText(props.code);
                status.value = 'success';
              } catch (err) {
                status.value = 'error';
              }
              setTimeout(() => {
                status.value = '';
              }, 2000);
            }}
            class={[
              'btn btn-square btn-sm',
              {
                'btn-neutral': !status.value,
                'btn-success': status.value === 'success',
                'btn-error': status.value === 'error',
              },
            ]}
          >
            {!status.value ? (
              <div class={['text-xl icon-[lucide--clipboard-copy]']}></div>
            ) : null}
            {status.value === 'success' ? (
              <div class={['text-xl icon-[lucide--clipboard-check]']}></div>
            ) : null}
            {status.value === 'error' ? (
              <div class={['text-xl icon-[lucide--clipboard-x]']}></div>
            ) : null}
          </button>
        </Tooltip>
      </div>
    );
  }
  return null;
});
