import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToastProvider from './context/ToastContext';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;