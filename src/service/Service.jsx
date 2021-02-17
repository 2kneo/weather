export const url = (city) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=f988e0df56a587714f8964ffe2e84748&lang=ru`
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};
