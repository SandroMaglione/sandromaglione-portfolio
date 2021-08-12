import { ReactElement } from 'react';

export default function CopyrightNotice(): ReactElement {
  return (
    <footer className="sm:px-4">
      <p className="text-sm font-light text-[#586069]">
        Copyright &#169; 2021 -{' '}
        <a
          href="https://www.sandromaglione.com/"
          target="_blank"
          rel="noreferrer"
          className="text-[#0366d6] hover:underline"
        >
          Sandro Maglione
        </a>
      </p>
    </footer>
  );
}
