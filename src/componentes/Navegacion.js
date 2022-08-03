import { NavLink } from "react-router-dom";
import './navegacion.css'

// Se genera la barra de navegacion
export default function Navbar(){
    return(
        <div className='barra_navegacion disable-select'>
            <li className='barra_navegacion_item1'>
                <NavLink className={({isActive})=> isActive ? "selecionado" : "no_selecionado"} to='/consulta'> Consulta </NavLink>
            </li>
            <li className='barra_navegacion_item2'>
                <NavLink className={({isActive})=> isActive ? "selecionado" : "no_selecionado"} to='/almacenar'> Almacenar </NavLink>
            </li>
        </div>
    )
}