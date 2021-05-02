export default function getDayHours() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    if (i.toString().length === 1) {
      hours.push({ hour: "0" + i + ":00" });
    } else {
      hours.push({ hour: i + ":00" });
    }
  }
  return hours;
}
