import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './routes/(home)/index.tsx';
import DevelopedbyedFollowalong from './routes/developedbyedFollowalong/index.tsx';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Home />}
        />

        <Route
          path='developedbyed-followalong'
          element={<DevelopedbyedFollowalong />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
