import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TableView = () => {
    const [loading, setLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState([]);
    const [responseType, setResponseType] = useState("");

    useEffect(() => {
        getAllCompanyDetails();
    }, []);

    const getAllCompanyDetails = async () => {
        const response = await axios.get(
            `http://localhost:3000/getAllCompanyDetails`
        );
        if (response.status === 200) {
            if (response.data.code === 404) {
                setResponseType("NoFound")
            } else {
                setCompanyDetails(response.data);
                setResponseType("");
            }
        } else if (response.status === 404) {
            setResponseType("NoFound")
        } else if (response.status === 400) {
            setResponseType("Error")
        }
        setLoading(false);
    }

    return (
        loading && companyDetails.length === 0 ? <p className="loading-text">Loading...</p> :
            <div>
                {companyDetails.length > 0 && <div className="table-view-box">
                    <table>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Sector</th>
                            <th>Industry</th>
                            <th>Address</th>
                            <th>AssetType</th>
                        </tr>
                        {
                            companyDetails.map(eachCompanyDetail =>
                                <tr key={eachCompanyDetail.Symbol}>
                                    <td>{eachCompanyDetail.Symbol}</td>
                                    <td>{eachCompanyDetail.Name}</td>
                                    <td>{eachCompanyDetail.Sector}</td>
                                    <td>{eachCompanyDetail.Industry}</td>
                                    <td>{eachCompanyDetail.Address}</td>
                                    <td>{eachCompanyDetail.AssetType}</td>
                                </tr>)
                        }
                    </table>
                </div>}
                <div className="message-box">
                    <button>
                        <Link to="/AddCompany">Add company</Link>
                    </button>
                    {responseType === "NoFound" && <p>No company details found.</p>}
                    {responseType === "Error" && <p>Something went wrong.</p>}
                </div>
            </div>
    )
}

export default TableView;