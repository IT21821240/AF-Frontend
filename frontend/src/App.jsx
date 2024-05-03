import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/routes'; 
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <div className="w-full min-h-screen ">
        <Header />
        <main className='flex-1 bg-blend-color-dodge'>
             <ToastContainer />
              <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
