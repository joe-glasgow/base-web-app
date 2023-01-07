import '../styles/globals.css'
import {ThemeProvider} from "@mui/material"
import {CacheProvider, EmotionCache} from "@emotion/react"
import type {AppProps} from 'next/app'
import {theme} from "../utils/theme"
import createEmotionCache from "../utils/createEmotionCache"

const clientSideEmotionCache = createEmotionCache();

interface EmotionalAppProps extends AppProps {
    emotionCache: EmotionCache
}

export default function App ({
                                Component,
                                emotionCache = clientSideEmotionCache,
                                pageProps
                            }: EmotionalAppProps
) {
    return <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    </CacheProvider>
}
