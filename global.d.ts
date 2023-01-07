declare global {
    namespace React {
        interface FunctionComponent<P = {}> {
            getInitialProps(): void;
        }
    }
}

