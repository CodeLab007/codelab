import '../scss/globals.css';
import type { AppProps } from 'next/app';
import '@codelab/ui/scss/main.scss'
export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return <AnyComponent {...pageProps} />;
}
