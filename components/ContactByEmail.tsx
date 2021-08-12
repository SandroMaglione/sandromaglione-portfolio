import { ReactElement } from 'react';

export default function ContactByEmail(): ReactElement {
  return (
    <a
      href="mailto:lass.maglio@gmail.com"
      className="fixed inline-flex hover-sm z-50 items-center px-6 py-3 text-sm sm:text-base font-black tracking-widest text-white bg-[#0366d6] border border-transparent rounded-3xl bottom-8 sm:right-10 right-1/2 transform translate-x-1/2 sm:translate-x-0 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span>Contact me</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 ml-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        />
      </svg>
    </a>
  );
}
