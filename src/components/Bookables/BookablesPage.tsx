import BookablesView from "./BookablesView.tsx";
import { Route, Routes } from "react-router-dom";
import BookableEdit from "./BookableEdit.tsx";
import BookableNew from "./BookableNew.tsx";

export default function BookablesPage() {
  return (
    <Routes>
      <Route path="/:id" element={<BookablesView />} />
      <Route path="/" element={<BookablesView />} />
      <Route path="/:id/edit" element={<BookableEdit />} />
      <Route path="/new" element={<BookableNew />} />
    </Routes>
  );
}
