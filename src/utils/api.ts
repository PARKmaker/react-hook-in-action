export default function getData(url: string) {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error("No Fetch Data");
    }

    return resp.json();
  });
}
