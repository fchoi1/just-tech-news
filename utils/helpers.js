module.exports = {
  // prettier-ignore
  format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new 
    Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plural: (word, amount) => (amount > 1 ? `${word}s` : word),
  format_url: (url) =>
    url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0]
};
