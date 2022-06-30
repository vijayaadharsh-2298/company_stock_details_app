import { Route, Routes } from "react-router";
import AddCompanyView from "./components/AddCompanyView";
import TableView from "./components/TableView";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TableView />} />
        <Route path="/AddCompany" element={<AddCompanyView />} />
      </Routes>
    </div>
  );
};

export default App;
