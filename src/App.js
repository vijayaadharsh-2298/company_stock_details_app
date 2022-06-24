import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [companyName, setCompanyName] = useState("INFY");
  const [companyDetails, setCompanyDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const getCompanyDetails = async () => {
    // setCompanyName(companyId);
    const companyDetails = COMPANY_NAME_DETAILS.filter(eachCompanyDetails => eachCompanyDetails.name.toLowerCase() === companyName.toLowerCase());
    if (companyDetails && companyDetails[0] && companyDetails[0].id) {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000?companyId=${companyDetails[0].id}`
      );

      setIsLoading(false);
      if (response.data && Object.keys(response.data).length > 0) {
        setCompanyDetails([response.data]);
      }
    } else {
      alert("No matching company details found!!");
    }
  };

  return (
    <div className="App">
      <div className="company-drop-down-list">
        <label className="company-drop-down-label">
          Select a company name:
        </label>{" "}
        <input
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          className="company-name-input"
        />
        <button className="company-details-action" onClick={getCompanyDetails}>Submit</button>
        {/* <select
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
        </select> */}
      </div>
      <div className="company-details-box">
        {!!companyDetails && companyDetails.length === 0 ? (
          <p>{isLoading ? "Loading..." : "No details found!!"}</p>
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
