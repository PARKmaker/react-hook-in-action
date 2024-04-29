import { shortISO } from "./date-wrangler.ts";

export default async function getData(url: string) {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw Error("There was a problem fetching data.");
  }
  return await resp.json();
}

export function getBookings(
  bookableId: number,
  startDate: Date,
  endDate: Date,
) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const query = `bookableId=${bookableId}` + `&date=${start}&date=${end}`;

  return getData(`${urlRoot}?${query}`);
}
