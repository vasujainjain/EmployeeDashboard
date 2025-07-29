import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#181c23] text-gray-100 transition-colors">
      <Header />
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}