import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaPlus } from 'react-icons/fa';
import NavbarIn from '@/components/NavbarIn';

const ItemTypes = {
  TASK: 'task',
};

const Column = ({ status, children }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: () => ({ status }),
  });

  return (
    <div ref={drop} className="w-full p-4 bg-[#4A5568] rounded-lg shadow-md min-h-[200px] text-white">
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      {children}
    </div>
  );
};

const Task = ({ task, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { ...task },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveTask(item.id, dropResult.status);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 mb-4 bg-white rounded-lg shadow-md ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-500">{task.description}</p>
    </div>
  );
};

const ProjectPage = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'Backlog' },
    { id: 2, title: 'Task 2', description: 'Description 2', status: 'To Do' },
    { id: 3, title: 'Task 3', description: 'Description 3', status: 'Doing' },
    { id: 4, title: 'Task 4', description: 'Description 4', status: 'Done' },
    { id: 5, title: 'Task 5', description: 'Description 1', status: 'Backlog' },
    { id: 6, title: 'Task 6', description: 'Description 2', status: 'To Do' },
    { id: 7, title: 'Task 7', description: 'Description 3', status: 'Doing' },
    { id: 8, title: 'Task 8', description: 'Description 4', status: 'Done' },
    { id: 9, title: 'Task 9', description: 'Description 1', status: 'Backlog' },
    { id: 10, title: 'Task 10', description: 'Description 2', status: 'To Do' },
    { id: 11, title: 'Task 11', description: 'Description 3', status: 'Doing' },
    { id: 12, title: 'Task 12', description: 'Description 4', status: 'Done' },
    { id: 13, title: 'Task 13', description: 'Description 1', status: 'Backlog' },
    { id: 14, title: 'Task 14', description: 'Description 2', status: 'To Do' },
    { id: 15, title: 'Task 15', description: 'Description 3', status: 'Doing' },
    { id: 16, title: 'Task 16', description: 'Description 4', status: 'Done' },
  ]);

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <NavbarIn />
      <div className="bg-[#2D3748] min-h-screen text-white">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 mt-10">Project</h1>
          <div className="grid grid-cols-5 gap-4">
            {['Backlog', 'To Do', 'Doing', 'Done', 'Approved'].map((status) => (
              <Column key={status} status={status}>
                {tasks.filter((task) => task.status === status).map((task) => (
                  <Task key={task.id} task={task} moveTask={moveTask} />
                ))}
              </Column>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ProjectPage;
