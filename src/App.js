import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorldMap from './components/WorldMap';
import NavigationBar from './components/Navbar';
import Country from './components/Country';
import AnimalForm from "./components/forms/Animal";


function App() {
  // const handleCountryDetected = (countryName, properties) => {
  //   console.log("País clickeado:", countryName);
  //   // Acá podés hacer navegación o mostrar info
  // };

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<WorldMap /> }/>
        {/* <WorldMap onCountryDetected={handleCountryDetected} /> */}
        <Route path="/country/:name" element={<Country />} />
        <Route path="/animal-form/:name" element={<AnimalForm />} />
        
      </Routes>
      
    </Router>
  );
}

export default App;
