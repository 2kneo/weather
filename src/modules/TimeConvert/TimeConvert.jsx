export const TimeConvert = (dateUNIX) => {
  const a = new Date(dateUNIX * 1000);
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Майя",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = "0" + a.getUTCHours();
  const min = "0" + a.getUTCMinutes();
  const sec = "0" + a.getUTCSeconds();

  return `${date} ${month} ${year} ${hour.substr(-2)}:${min.substr(
    -2
  )}:${sec.substr(-2)}`;
};
