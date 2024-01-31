import AppRouter from "./config/Router"
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18nn from './i18n';

function App() {
  const {i18n} = useTranslation();

  return (
    <div dir={i18n.language === 'ur' ? 'rtl' : 'ltr'}>
      <I18nextProvider i18n={i18nn}>
        <AppRouter />
      </I18nextProvider>
    </div>
  )
}

export default App
