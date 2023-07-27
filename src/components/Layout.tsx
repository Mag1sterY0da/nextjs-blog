import Head from 'next/head';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <link rel='icon' href='/next.svg' />
        <title>{title}</title>
      </Head>
      <Header />
      {children}
    </>
  );
}
