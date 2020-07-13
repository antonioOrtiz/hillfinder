import React from 'react';
import { withRouter } from 'react-router-dom';
import Head from '../components/head';
import HomePage from '../components/HomePage/HomePage.jsx';

var Home = () => (
  <>
    <Head title="Home" />
    <HomePage />
  </>
);

export default withRouter(Home);
