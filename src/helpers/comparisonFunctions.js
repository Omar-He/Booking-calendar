export function getMatchedDays(selectedDay, arrayToFilter, dateProperty) {
  return arrayToFilter.filter((element) => {
    const slotDate = new Date(element[dateProperty]);
    return (
      slotDate.getFullYear === selectedDay.getFullYear &&
      slotDate.getMonth() === selectedDay.getMonth() &&
      slotDate.getDate() === selectedDay.getDate()
    );
  });
}

export function getMatchedHours(defaultHours, allocatedDays, confirmedDays) {
  return defaultHours.map((slot, key) => {
    const allocatedHour = allocatedDays.find(
      (el) =>
        new Date(el.date_time).getHours() === Number(slot.hour.split(":")[0])
    );
    allocatedHour ? (slot.disabled = true) : (slot.disabled = false);

    const confirmedHour = confirmedDays.find(
      (el) =>
        new Date(el.call_date).getHours() === Number(slot.hour.split(":")[0])
    );
    confirmedHour ? (slot.confirmed = true) : (slot.confirmed = false);

    return slot;
  });
}
