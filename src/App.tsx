import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";
import TasksPage from "./features/tasks/pages/TasksPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <TasksPage />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;