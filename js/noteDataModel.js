export default function createNote(data) {
  const { title, text, type } = data;
  const date = new Date(Date.now());

  return {
    id: Date.now(),
    date: date.toDateString(),
    title: title.toString(),
    text: text.toString(),
    type: type.toString(),
    dates: "",
  };
}
