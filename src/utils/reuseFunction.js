export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const toMinutes = (time) => {
  let minutes = time.day * 24 * 60 + time.hour * 60 + time.minute;
  return minutes;
};

export const toTime = (minutes) => {
  // Calculate the number of days
  const day = Math.floor(minutes / 1440);

  // Calculate the number of hours
  const hour = Math.floor((minutes % 1440) / 60);

  // Calculate the number of minutes
  const remainingMinute = minutes % 60;

  return {
    day: day,
    hour: hour,
    minute: remainingMinute,
  };
};
