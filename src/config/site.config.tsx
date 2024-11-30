import { Metadata } from 'next';
import logoImg from '@public/Cunsole Logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
// import logoIconImg from '@public/logo-short.svg';
import logoIconImg from '@public/Cunsol Small Icon.svg';
import favicon from '@public/Cunsol Small Icon.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';



enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Cunsole',
  description: `Cunsole.`,
  logo: logoImg,
  // icon: logoIconImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  TODO: favicon

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
      url: '',
      siteName: 'Cunsole', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://cunsolepublic.s3.ap-south-1.amazonaws.com/Page+Logo.svg',
        width: 12000,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
   
  };
};
