import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./MyMap'), {
  ssr: false
});

export default Map;
