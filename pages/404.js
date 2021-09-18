import { Link, } from 'react-router-dom';

export default function FourOhFour({ location }) {
  return <>
    <h1>
      404 - Page Not Found;
    </h1>
    <h2 style={{ fontWeight: 'strong' }}>Sorry but the page{' '}
      {location.pathname.substring(1)} could not be found</h2>{' '}
    <Link to="/">
      Home
    </Link>
  </>
}
