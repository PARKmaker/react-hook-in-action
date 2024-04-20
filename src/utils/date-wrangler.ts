export function addDays(date: Date, daysToAdd: number) {
  const clone = new Date(date.getTime());

  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
}

export function getWeek(forDate: Date, daysOffset = 0) {
  const date = addDays(forDate, daysOffset);

  // 새 날짜의 요일 인덱스를 구함, 예를 들어 화요일은 2
  const day = date.getDay();

  return {
    date,
    // 화요일이라면 2일 앞으로 시프트
    start: addDays(date, -day),

    // 화요일이라면 4일 뒤로 시프트
    end: addDays(date, 6 - day),
  };
}
