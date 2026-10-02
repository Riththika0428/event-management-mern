import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<h1>Events Page (Coming Soon)</h1>} />
          <Route path="/events/:id" element={<h1>Event Details Page (Coming Soon)</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;