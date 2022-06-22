import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [companyName, setCompanyName] = useState("INFY");
  const [companyDetails, setCompanyDetails] = useState([]);

  const COMPANY_NAME_DETAILS = [
    { id: "INFY", name: "Infosys" },
    { id: "MSFT", name: "Microsoft" },
    { id: "IBM", name: "IBM" },
  ];

  useEffect(() => {
    if (companyName !== "") {
      getCompanyDetails(companyName);
    }
  }, []);

  const getCompanyDetails = async (companyId) => {
    setCompanyName(companyId);
    const response = await axios.get(
      `http://localhost:3000?companyId=${companyId}`
    );

    if (response.data && Object.keys(response.data).length > 0) {
      setCompanyDetails([response.data]);
    }
  };

  return (
    <div className="App">
      <div className="company-drop-down-list">
        <label className="company-drop-down-label">
          Select a company name:
        </label>{" "}
        <select
          value={companyName}
          onChange={(e) => getCompanyDetails(e.target.value)}
          className="company-drop-down-select"
        >
          {COMPANY_NAME_DETAILS.map((companyDetail) => (
            <option
              value={companyDetail.id}
              className="company-name-option"
              key={companyDetail.id}
            >
              {companyDetail.name}
            </option>
          ))}
        </select>
      </div>
      <div className="company-details-box">
        {!!companyDetails && companyDetails.length === 0 ? (
          <p>Loading...</p>
        ) : (
          companyDetails.map((companyDetail) => (
            <div key={companyDetail.Symbol} className="each-company-details">
              <h3>{companyDetail.Name}</h3>
              <p>{companyDetail.Description}</p>
              <p>{companyDetail.Address}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
