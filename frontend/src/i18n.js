import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      header: {
        brand: 'Hexlet Chat',
        logout: 'Выйти',
      },
      login: {
        title: 'Войти',
        username: 'Имя пользователя',
        password: 'Пароль',
        submit: 'Войти',
        noAccount: 'Нет аккаунта?',
        signup: 'Зарегистрироваться',
        error: 'Неверные имя пользователя или пароль',
      },
      signup: {
        title: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтверждение пароля',
        submit: 'Зарегистрироваться',
        hasAccount: 'Уже есть аккаунт?',
        login: 'Войти',
        error: 'Такой пользователь уже существует',
        errorGeneric: 'Ошибка регистрации',
      },
      chat: {
        channels: 'Каналы',
        messages: 'Сообщения',
        selectChannel: 'Выберите канал',
        messagePlaceholder: 'Введите сообщение...',
        loading: 'Загрузка...',
        loadingMessages: 'Загрузка сообщений...',
      },
      modals: {
        addChannel: 'Добавить канал',
        renameChannel: 'Переименовать канал',
        removeChannel: 'Удалить канал',
        channelName: 'Имя канала',
        newName: 'Новое имя',
        removeQuestion: 'Удалить канал?',
        submit: 'Отправить',
        remove: 'Удалить',
        cancel: 'Отмена',
        rename: 'Переименовать',
        validation: {
          required: 'Обязательное поле',
          length: 'От 3 до 20 символов',
          minPassword: 'Не менее 6 символов',
          match: 'Пароли должны совпадать',
        },
      },
      notFound: {
        title: '404',
        text: 'Страница не найдена',
      },
    },
  },
};

i18next.use(initReactI18next).init({
  lng: 'ru',
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
