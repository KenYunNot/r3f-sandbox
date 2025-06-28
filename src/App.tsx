import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './routes/(home)/index.tsx';
import DevelopedbyedFollowalong from './routes/developedbyedFollowalong/index.tsx';

import './App.css';
import MouseFollow from './routes/mouseFollow/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />

        <Route path='developedbyed-followalong' element={<DevelopedbyedFollowalong />} />

        <Route path='mouse-follow' element={<MouseFollow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
