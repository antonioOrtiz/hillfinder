import {
 Responsive,
} from 'semantic-ui-react'

export function getWidthFactory(isMobileFromSSR) {
 return function () {
  var isSSR = typeof window === "undefined";
  var ssrValue = isMobileFromSSR ? Responsive.onlyMobile.maxWidth : Responsive.onlyTablet.minWidth;
  return isSSR ? ssrValue : window.innerWidth;
 };
};
