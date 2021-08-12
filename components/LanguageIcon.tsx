import { ReactElement } from 'react';
import CsharpIcon from './icons/csharp';
import CssIcon from './icons/css';
import DartIcon from './icons/dart';
import FlutterIcon from './icons/flutter';
import HaskellIcon from './icons/haskell';
import JavaIcon from './icons/java';
import JavascriptIcon from './icons/javascript';
import JestIcon from './icons/jest';
import LambdaIcon from './icons/lambda';
import MysqlIcon from './icons/mysql';
import NextjsIcon from './icons/nextjs';
import PhpIcon from './icons/php';
import PostgresqlIcon from './icons/postgresql';
import ReactIcon from './icons/react';
import ReduxIcon from './icons/redux';
import ScalaIcon from './icons/scala';
import TailwindcssIcon from './icons/tailwindcss';
import TypescriptIcon from './icons/typescript';
import UnityIcon from './icons/unity';
import VueIcon from './icons/vue';
import WordpressIcon from './icons/wordpress';

export default function LanguageIcon({
  language,
}: {
  language: string;
}): ReactElement {
  const getLanguageIcon = (): JSX.Element => {
    switch (language) {
      case 'csharp':
        return <CsharpIcon />;
      case 'css':
        return <CssIcon />;
      case 'dart':
        return <DartIcon />;
      case 'flutter':
        return <FlutterIcon />;
      case 'functional-programming':
        return <LambdaIcon />;
      case 'haskell':
        return <HaskellIcon />;
      case 'java':
        return <JavaIcon />;
      case 'javascript':
        return <JavascriptIcon />;
      case 'jest':
        return <JestIcon />;
      case 'mysql':
        return <MysqlIcon />;
      case 'nextjs':
        return <NextjsIcon />;
      case 'php':
        return <PhpIcon />;
      case 'postgresql':
        return <PostgresqlIcon />;
      case 'react':
        return <ReactIcon />;
      case 'redux':
        return <ReduxIcon />;
      case 'scala':
        return <ScalaIcon />;
      case 'tailwindcss':
        return <TailwindcssIcon />;
      case 'typescript':
        return <TypescriptIcon />;
      case 'unity':
        return <UnityIcon />;
      case 'vue':
        return <VueIcon />;
      case 'wordpress':
        return <WordpressIcon />;

      default:
        return <></>;
    }
  };
  return <>{getLanguageIcon()}</>;
}
