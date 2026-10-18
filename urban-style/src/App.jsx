/** Compone las secciones del sitio; los enlaces del menú usan sus identificadores. */
import Navbar from './components/Navbar';


import './App.css';
// Los nombres con mayúscula en JSX representan componentes importados.
// App compone la página pública; Admin tiene su propia entrada y no se monta aquí.
export default function App() {
  return (
    <>
      <Navbar />
    </>
  );
}
