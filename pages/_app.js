import "../styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <main key={router.asPath} className="page-enter">
      <Component {...pageProps} />
    </main>
  );
}
