import { Metadata } from 'next';
import logoImg from '@public/Cunsole Logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
// import logoIconImg from '@public/logo-short.svg';
import logoIconImg from '@public/Cunsol Small Icon.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';



enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Cunsole',
  description: `Cunsole.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Cunsole` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Cunsole` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Cunsole', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 12000,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
