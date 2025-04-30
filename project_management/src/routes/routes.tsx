import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
// import VisaoGeral from './pages/VisaoGeral';
import Projetos from '../screens/ProjectRegistration';
// import Orcamentos from './pages/Orcamentos';
import Editais from '../screens/Edital';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* <Route path="/visao_geral" element={<VisaoGeral />} /> */}
            <Route path="/projetos" element={<Projetos />} />
            {/* <Route path="/orcamentos" element={<Orcamentos />} /> */}
            <Route path="/edital" element={<Editais />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;

