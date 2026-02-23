import './App.css'
import Header from './features/tasks/components/Header.tsx'
import Hero from './features/tasks/components/Hero.tsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Hero />
    </div>
  );
}

export default App;
