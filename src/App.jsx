import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import CreateSchedule from "../src/pages/CreateSchedule.jsx";
import Dates from "../src/pages/Dates.jsx";
import WasteTypes from "../src/pages/WasteTypes.jsx";
import SpecialRequirements from "../src/pages/SpecialRequirements.jsx";
import ServiceProvider from "../src/pages/ServiceProvider.jsx";
import Preview from "../src/pages/Preview.jsx";
import Select from "../src/pages/Select.jsx";

 function App () { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateSchedule />} />
        <Route path="/dates" element={<Dates />} />
        <Route path="/waste" element={<WasteTypes />} />
        <Route path="/special" element={<SpecialRequirements />} />
        <Route path="/service" element={<ServiceProvider />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/select" element={<Select />} />
        
    </Routes>
    </Router>
  );
}

export default App;