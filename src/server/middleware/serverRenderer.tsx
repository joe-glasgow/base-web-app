import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import IntlProvider from '../../shared/i18n/IntlProvider';
import App from '../../shared/App';
import Html from '../components/HTML';

const helmetContext = {};
const routerContext = {};

const serverRenderer: any = () => (
    req: express.Request & { store: Store },
    res: express.Response
) => {
    const sheets = new ServerStyleSheets();
    const content = renderToString(
        sheets.collect(
            <Provider store={res.locals.store}>
                <Router location={req.url} context={routerContext}>
                    <IntlProvider>
                        <HelmetProvider context={helmetContext}>
                            <ThemeProvider theme={{}}>
                                <App />
                            </ThemeProvider>
                        </HelmetProvider>
                    </IntlProvider>
                </Router>
            </Provider>
        )
    );
    const css = sheets.toString();
    const state = JSON.stringify(res.locals.store.getState());

    return res.send(
        '<!doctype html>' +
            renderToString(
                <Html
                    materialCSS={css}
                    css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
                    helmetContext={helmetContext}
                    scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
                    state={state}
                >
                    {content}
                </Html>
            )
    );
};

export default serverRenderer;
