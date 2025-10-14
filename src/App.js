import { Routes, Route, Navigate } from 'react-router-dom';

import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import IndexPage from './pages/IndexPage';

function App() {
  return (
    <div>
      <h1>test</h1>
      <hr />
      <Routes>
        {/* 초기 페이지 */}
        <Route path="/" element={<IndexPage />} />

        <Route path="/list" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/edit/:id" element={<EditPage />} /> 
      </Routes>
    </div>
  );
}

export default App;