import React from 'react';

import NextHead from 'next/head';
import { string } from 'prop-types';

const Head = props => {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || ''}</title>
      <meta name="theme-color" content="#80e750" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#80e750" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Hillfinders app" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />

      <link rel="icon" href="/styles.css" />
      {/*pwa meta */}
      <meta name="application-name" content="Hillfinders app" />
      <meta name="description" content="Go find a hill!" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#80e750" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://yourdomain.com" />
      <meta name="twitter:title" content="Hillfinders app" />
      <meta name="twitter:description" content="Go find a hill!" />
      <meta name="twitter:image" content="/icons/android-chrome-192x192.png" />
      <meta name="twitter:creator" content="@antonio_ortiz" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Hillfinders app" />
      <meta property="og:description" content="Go find a hill!" />
      <meta property="og:site_name" content="Hillfinders app" />
      <meta property="og:url" content="https://hillfinders.com" />
      <meta
        property="og:image"
        content="https://hillfinders./comstatic/icons/apple-touch-icon.png"
      />
    </NextHead>
  );
};

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
