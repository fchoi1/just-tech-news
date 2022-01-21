const { format_date, format_plural, format_url } = require('../utils/helpers');

test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');
  expect(format_date(date)).toBe('3/20/2020');
});

test('format_plural() returns a date string', () => {
  expect(format_plural('tiger', 2)).toBe('tigers');
  expect(format_plural('Lion', 1)).toBe('Lion');
});

test('format_url() returns a date string', () => {
  const urlList = [
    'http://test.com/page/1',
    'https://www.coolstuff.com/abcdefg/',
    'https://www.google.com?q=hello'
  ];
  expect(format_url(urlList[0])).toBe('test.com');
  expect(format_url(urlList[1])).toBe('coolstuff.com');
  expect(format_url(urlList[2])).toBe('google.com');
});
