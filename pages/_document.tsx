import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentProps,
    DocumentContext,
    DocumentInitialProps
} from 'next/document'
import createEmotionServer from "@emotion/server/create-instance"
import {EmotionCache} from "@emotion/react";
import {ReactNode} from 'react'
import App, {AppType} from "next/app";
import createEmotionCache from "../utils/createEmotionCache"

interface EmotionalDocumentProps extends DocumentProps {
    emotionStyleTags: ReactNode[]
}


interface EmotionalDocumentInitialProps extends DocumentInitialProps {
    emotionStyleTags: ReactNode[]
}


export default function MyDocument(props: EmotionalDocumentProps) {
    return (
        <Html lang="en">
            <Head title="Create Next App">
                {props.emotionStyleTags}
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<EmotionalDocumentInitialProps> => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: AppType | React.ComponentType<{ emotionCache: EmotionCache }>) =>
                function EnhanceApp(props) {
                    return <App {...props} emotionCache={cache} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(" ")}`}
            key={style.key}
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
