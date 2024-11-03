import localFont from "next/font/local";
import TodoItem from "@/components/todo-item";
import { KeyboardEvent, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type Todo = {
  title: string;
  id: string;
};

export default function Home() {
  const [inputItem, setInputItem] = useState("");
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodoItems([
        ...todoItems,
        { title: inputItem, id: crypto.randomUUID() },
      ]);
      setInputItem("");
    }
  };

  const deleteTodoItem = (id: string) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (editedTitle: string, id: string) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === id ? { ...item, title: editedTitle } : item,
      ),
    );
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-lg">TODO List</h1>
        <input
          className="w-full border"
          value={inputItem}
          onChange={(e) => setInputItem(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {todoItems &&
            todoItems.map((item) => (
              <li key={item.id} className="mb-2">
                <TodoItem
                  title={item.title}
                  id={item.id}
                  deleteTodoItem={deleteTodoItem}
                  handleEditItem={handleEditItem}
                />
              </li>
            ))}
        </ol>
      </main>
    </div>
  );
}
