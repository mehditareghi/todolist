import { useState } from "react";

type Props = {
  title: string;
  id: string;
  deleteTodoItem: (id: string) => void;
  handleEditItem: (title: string, id: string) => void;
};

export default function TodoItem({
  title,
  id,
  deleteTodoItem,
  handleEditItem,
}: Props) {
  const [isDone, setIsDone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditTitle] = useState(title);
  const handleEdit = () => {
    if (isEditing) {
      handleEditItem(editedTitle, id);
    }
    setIsEditing((prev) => !prev);
  };
  return (
    <div className="inline-flex justify-between gap-4">
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="border p-1"
        />
      ) : (
        <span className={`${isDone ? "line-through" : ""}`}>{title}</span>
      )}
      <button
        onClick={() => setIsDone((prev) => !prev)}
        className="px-2 border border-black"
      >
        {isDone ? "Mark as Pending" : "Mark as Done"}
      </button>
      <button onClick={handleEdit} className="px-2 border border-black">
        {isEditing ? "Save" : "Edit"}
      </button>
      <button
        onClick={() => deleteTodoItem(id)}
        className="px-2 border border-black"
      >
        Delete
      </button>
    </div>
  );
}
