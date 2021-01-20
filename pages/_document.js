import React from 'react';
import Document, {
    Head, Html, Main, NextScript,
} from 'next/document';

import { ServerStyleSheets } from '@material-ui/core/styles';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Pacifico%7CMontserrat%7CLancelot%7CMulish%7CRaleway:100,400,400i,700%7CRoboto:300,400,500,700&display=swap"
                />
            </Head>
            <body style={{overflowX: 'hidden'}}>
            <Main />
            <NextScript />
            </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};