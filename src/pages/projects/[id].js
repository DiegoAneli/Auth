import { useState } from 'react';
import { useRouter } from 'next/router';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavbarIn from '@/components/NavbarIn';
import Link from 'next/link';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowUpIcon,
  VideoCameraIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { FaPlus, FaTimes } from 'react-icons/fa';

const ItemTypes = {
  TASK: 'task',
};

const statusColors = {
  Backlog: 'bg-red-400',
  'To Do': 'bg-purple-400',
  Doing: 'bg-yellow-400',
  Done: 'bg-blue-400',
  Approved: 'bg-green-400',
};

const Column = ({ status, children }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: () => ({ status }),
  });

  return (
    <div ref={drop} className="w-full p-4 min-h-[200px] text-white">
      <h2 className="text-xl font-bold mb-4 text-center">{status}</h2>
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
      className={`p-4 mb-4 rounded-lg shadow-md ${statusColors[task.status]} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-white">{task.description}</p>
    </div>
  );
};

const ProjectPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Backlog' });

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'Backlog' },
    { id: 2, title: 'Task 2', description: 'Description 1', status: 'To Do' },
    { id: 3, title: 'Task 3', description: 'Description 1', status: 'Doing' },
    { id: 4, title: 'Task 4', description: 'Description 1', status: 'Done' },
    { id: 5, title: 'Task 5', description: 'Description 2', status: 'Backlog' },
    { id: 6, title: 'Task 6', description: 'Description 2', status: 'To Do' },
    { id: 7, title: 'Task 7', description: 'Description 2', status: 'Doing' },
    { id: 8, title: 'Task 8', description: 'Description 2', status: 'Done' },
    { id: 9, title: 'Task 9', description: 'Description 3', status: 'Backlog' },
    { id: 10, title: 'Task 10', description: 'Description 3', status: 'To Do' },
    { id: 11, title: 'Task 11', description: 'Description 3', status: 'Doing' },
    { id: 12, title: 'Task 12', description: 'Description 3', status: 'Done' },
    { id: 13, title: 'Task 13', description: 'Description 4', status: 'Backlog' },
    { id: 14, title: 'Task 14', description: 'Description 4', status: 'To Do' },
    { id: 15, title: 'Task 15', description: 'Description 4', status: 'Doing' },
    { id: 16, title: 'Task 16', description: 'Description 4', status: 'Done' },
  ]);

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const handleOpenModal = () => {
    setNewTask({ title: '', description: '', status: 'Backlog' });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    handleCloseModal();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <NavbarIn />
      <div className="bg-[#1F2937] min-h-screen text-white flex">
        <div className={`bg-[#1A202C] text-white p-4 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="flex justify-between items-center mb-4 mt-14">
            {!isCollapsed && <h2 className="text-2xl font-bold">Dashboard</h2>}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white focus:outline-none">
              {isCollapsed ? <ChevronRightIcon className="h-6 w-6" /> : <ChevronLeftIcon className="h-6 w-6" />}
            </button>
          </div>
          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <HomeIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Ritorna ai Progetti</span>}
            </Link>
            <button onClick={handleOpenModal} className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700 w-full text-left">
              <ClipboardDocumentListIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Crea Task</span>}
            </button>
            <Link href="/dashboard/attivita" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <UserGroupIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Teams</span>}
            </Link>
            <Link href="/dashboard/chat" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <UserGroupIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Collaboratori</span>}
            </Link>
            <Link href="/dashboard/caricadocumento" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <UserGroupIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Revisori</span>}
            </Link>
            <Link href="/dashboard/videoconferenza" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <DocumentIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Documenti</span>}
            </Link>
            <Link href="/dashboard/calendario" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <CalendarIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Calendario</span>}
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-4 gap-6 p-4">
            <div
              className="bg-[#2D3748] text-white shadow-md rounded-lg p-4 flex items-center justify-center cursor-pointer mt-14"
              onClick={() => setShowModal(true)}
            >
              <FaPlus className="text-4xl text-gray-400" />
            </div>
          </div>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10">
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl relative">
              <button onClick={handleCloseModal} className="text-gray-200 hover:text-gray-400 absolute top-4 right-4">
                <FaTimes />
              </button>
              <h2 className="text-3xl font-bold mb-4">Crea Task</h2>
              <input
                type="text"
                name="title"
                placeholder="Titolo"
                value={newTask.title}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <textarea
                name="description"
                placeholder="Descrizione"
                value={newTask.description}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              >
                {['Backlog', 'To Do', 'Doing', 'Done', 'Approved'].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <div className="flex justify-end space-x-4">
                <button onClick={handleCloseModal} className="bg-red-500 text-white px-4 py-2 rounded">Annulla</button>
                <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded">Aggiungi</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default ProjectPage;
