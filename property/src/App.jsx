import { Route, Routes } from 'react-router-dom';
import GsapReveal from './gsap-reveal'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<GsapReveal />} />
        <Route path="/a" element={<GsapReveal />} />
      </Routes>
    </div>
  );
}

export default App;
