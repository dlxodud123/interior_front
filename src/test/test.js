import './../test/test.css';
import { useTranslation } from 'react-i18next';

const Test = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return(
        <div>
            <h1>{t('Login')}</h1>
            <p>{t('SignUp')}</p>
            <button onClick={() => changeLanguage('ko')}>한국어</button>
            <button onClick={() => changeLanguage('en')}>English</button>
        </div>     
    )
}

export default Test;