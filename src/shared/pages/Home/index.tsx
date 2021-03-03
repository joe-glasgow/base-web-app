import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Features from 'shared/components/Features';
import { setLocale } from 'store/app/actions';
import { Locale } from 'store/app/types';
import StyledButton from 'components/StyledButton';

const App: React.FC<any> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleLocaleChange = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setLocale(e.currentTarget.value as Locale));
        },
        [dispatch]
    );

    return (
        <>
            <Features />
            <h2>{t('i18n-example')}</h2>
            <StyledButton>Hello!</StyledButton>
            <p>
                <button value="de_DE" onClick={handleLocaleChange}>
                    Deutsch
                </button>
                <button value="en_US" onClick={handleLocaleChange}>
                    English
                </button>
            </p>
        </>
    );
};

export default App;
