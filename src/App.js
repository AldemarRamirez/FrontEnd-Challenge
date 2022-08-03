import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Consulta from './pages/Consulta';
import Almacenar from './pages/Almacenar';
import NotFoundPage from './pages/NotFoundPage';
import Navegacion from './componentes/Navegacion';
import Home from './pages/Home';
import './App.css'
import './spinkit.css'

// Rutas del proyecto
export default function App() {
  return (
    <BrowserRouter>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/consulta" element={<Consulta/>}/>
        <Route path="/almacenar" element={<Almacenar/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
