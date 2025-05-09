import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Registration from '../screens/Registration';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* <Route path="/visao_geral" element={<VisaoGeral />} /> */}
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;

