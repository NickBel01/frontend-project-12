import leoProfanity from 'leo-profanity';

leoProfanity.loadDictionary('ru');
leoProfanity.loadDictionary('en');

leoProfanity.add([
  'хуй', 'хуя', 'хую', 'хуем', 'хуи', 'хуё', 'хуёк',
  'пизда', 'пизды', 'пизде', 'пизду', 'пиздой',
  'еблан', 'еблана', 'ебланы', 'ебло',
  'долбоеб', 'долбоёб', 'долбоебы',
  'блядь', 'бляди', 'блять', 'бля',
  'сука', 'суки', 'сукой',
  'fuck', 'shit', 'bitch', 'asshole', 'dick', 'cunt',
]);

export const clean = (text) => leoProfanity.clean(text);

export default leoProfanity;
