import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeddingInvitation from './components/WeddingInvitation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingInvitation />} />
        <Route path="/admin" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
