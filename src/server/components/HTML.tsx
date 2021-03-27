import { ReactElement } from 'react';

type Props = {
    children: any;
    links: Array<ReactElement<{}>>;
    helmetContext: any;
    scripts: Array<ReactElement<{}>>;
    state: string;
    styles?: Array<ReactElement<{}>>;
    language?: string;
};

// @ts-ignore
const HTML = ({
    children,
    links = [],
    scripts = [],
    state = '{}',
    styles = undefined,
    helmetContext: { helmet },
    language = 'en-GB',
}: Props) => (
    <html lang={language}>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {helmet.base.toComponent()}
            {helmet.title.toComponent()}
            {styles}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {helmet.script.toComponent()}
            {links}
            <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    // TODO: Add jsesc/stringify here
                    // see: https://twitter.com/HenrikJoreteg/status/1143953338284703744
                    __html: `window.__PRELOADED_STATE__ = ${state}`,
                }}
            />
        </head>
        <body>
            {/* eslint-disable-next-line react/no-danger */}
            <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
            {scripts}
        </body>
    </html>
);

export default HTML;
