import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './routes/(home)/index.tsx';
import DevelopedbyedFollowalong from './routes/developedbyedFollowalong/index.tsx';
import MouseFollow from './routes/mouseFollow/index.tsx';
import BufferGeometryDemo from './routes/bufferGeometryDemo/index.tsx';

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

        <Route
          path='mouse-follow'
          element={<MouseFollow />}
        />

        <Route
          path='buffer-geometry-demo'
          element={<BufferGeometryDemo />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
