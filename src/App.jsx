import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 as uuidv4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
      }
    } catch (e) {
      console.error("Erro ao carregar tarefas do localStorage", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (e) {
      console.error("Erro ao salvar tarefas no localStorage", e);
    }
  }, [tasks]);

  useEffect(() => {
    // Exemplo para futura chamada de API
    // const fetchTasks = async () => {
    //   const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    //   const data = await response.json();
    //   setTasks(data);
    // };
    // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    );
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
       
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
