import React from 'react';
import { BrowserRouter } from 'react-router-dom';
const isServer = typeof window === 'undefined';

export default App => {
  return class AppWithReactRouter extends React.Component {
    static async getStaticProps(appContext) {
      const { ctx } = appContext;
      const { req } = ctx;
      const { locals } = req;

      return {
        originalUrl: req.originalUrl,
        context: locals.context || {}
      };
    }

    render() {
      if (isServer) {
        const { StaticRouter } = require('react-router');

        return (
          <StaticRouter location={this.props.originalUrl} context={this.props.context}>
            <App {...this.props} />
          </StaticRouter>
        );
      }
      return (
        <BrowserRouter>
          <App {...this.props} />
        </BrowserRouter>
      );
    }
  };
};
