import {
  ClassList,
  component$,
  useStyles$,
  useStylesScoped$,
} from '@builder.io/qwik';
import prismjs from 'prismjs';
// Set to global so that prism language plugins can find it.
const _global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof global !== 'undefined' && global) ||
  (typeof self !== 'undefined' && self) ||
  (typeof this !== 'undefined' && this) ||
  (typeof window !== 'undefined' && window);
(_global as { PRISM?: typeof prismjs }).PRISM = prismjs;
import 'prismjs/components/prism-jsx'; // needs PRISM global
import stylesDark from './prism-night-owl.css?inline';
import styles from './prism-vs.css?inline';
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
}

export const CodeBlock = component$((props: CodeBlockProps) => {
  useStylesScoped$(styles);
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

  if (language && prismjs.languages[language]) {
    const highlighted = prismjs.highlight(
      props.code,
      prismjs.languages[language],
      language
    );
    const className = `language-${language}`;
    return (
      <div class="code-block">
        <pre class={[className, props.class]}>
          <code
            class={[className, props.codeClass]}
            dangerouslySetInnerHTML={highlighted}
          />
        </pre>
      </div>
    );
  }
  return null;
});
