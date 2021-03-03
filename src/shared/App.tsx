// import React, { Suspense } from 'react';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import favicon from '../shared/assets/favicon.png';
import routes from './routes';
import css from './App.module.scss';

const App: React.FC<any> = () => {
    const { t } = useTranslation();
    useEffect(() => {
        const jssStyles: any = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        // <Suspense fallback={<div>Loading</div>}>
        <div className={css.wrapper}>
            <Helmet
                defaultTitle="Base Web App"
                titleTemplate="%s – Base Web App"
                link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
            />
            <h1>Base Web App</h1>
            <Switch>
                <Route
                    exact
                    path={routes.home}
                    component={loadable(() => import('./pages/Home'))}
                />
                <Route
                    exact
                    path={routes.page1}
                    component={loadable(() => import('./pages/Page-1'))}
                />
                <Route
                    exact
                    path={routes.page2}
                    component={loadable(() => import('./pages/Page-2'))}
                />
                <Route render={() => '404!'} />
            </Switch>
            <h2>{t('router-headline')}</h2>
            <ul>
                <li>
                    <Link to="/">{t('nav.home')}</Link>
                </li>
                <li>
                    <Link to="/page-1">{t('nav.page-1')}</Link>
                </li>
                <li>
                    <Link to="/page-2">{t('nav.page-2')}</Link>
                </li>
            </ul>
        </div>
        // </Suspense>
    );
};

export default App;
