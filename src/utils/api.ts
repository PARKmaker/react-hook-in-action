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

export function createItem(url: string, item: any) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((r) => {
    if (!r.ok) {
      throw new Error("There was a problem creating the Item!");
    }
    return r.json();
  });
}

export function editItem(url: string, item: any) {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((r) => {
    if (!r.ok) {
      throw new Error("There was a problem updating the item!");
    }
    return r.json();
  });
}

export function deleteItem(url: string) {
  return fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((r) => {
    if (!r.ok) {
      throw new Error("There was a problem deleting the item!");
    }
    return r.json();
  });
}
