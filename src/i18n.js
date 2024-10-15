import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // 리소스 파일을 불러오기 위한 백엔드 플러그인
import LanguageDetector from 'i18next-browser-languagedetector'; // 브라우저 언어 감지

i18n
  // .use(Backend) // 백엔드를 통해 번역 파일 로드
  .use(LanguageDetector) // 브라우저 언어 감지 기능
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // 설정된 언어가 없을 경우 기본 언어
    debug: true, // 개발 시 디버그 정보 출력
    interpolation: {
      escapeValue: false, // React는 자동으로 XSS 보호를 함
    },
    // backend: {
    //   loadPath: '/locales/{{lng}}/translation.json', // 번역 파일의 경로
    //   // loadPath: '/locales/ko/translation.json',
    // },
  });

export default i18n;