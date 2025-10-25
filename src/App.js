import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';

import ListPage from './pages/ListPage.jsx';
import AddPage from './pages/AddPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import EditPage from './pages/EditPage.jsx';
import IndexPage from './pages/IndexPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import GraduatePage from './pages/GraduatePage.jsx';

function App() {
  return (
    <div>
      <Routes>
        {/* 초기 페이지 */}
        <Route path="/" element={<IndexPage />} />

        <Route element={<Layout />}>
          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/edit/:id" element={<EditPage />} /> 
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/graduate" element={<GraduatePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;