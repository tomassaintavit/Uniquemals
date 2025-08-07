import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorldMap from './components/WorldMap';
import NavigationBar from './components/Navbar';
import Country from './components/Country';


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
      </Routes>
      
    </Router>
  );
}

export default App;
