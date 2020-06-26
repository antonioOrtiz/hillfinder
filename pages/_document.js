import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            src="https://widget.cloudinary.com/v2.0/global/all.js"
            type="text/javascript"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
