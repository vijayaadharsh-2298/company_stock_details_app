import { useState } from "react";
import axios from "axios";
import "./addCompanyView.css";

const AddCompanyView = () => {
    const [companyId, setCompanyId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState("");

    const createCompanyDetails = async () => {
        setIsLoading(true);
        const response = await axios.post(
            `http://localhost:3000?companyId=${companyId}`
        );
        if (response.status === 201) {
            setResponseStatus("added");
        } else if (response.status === 200) {
            setResponseStatus("existed");
        } else if (response.status === 400) {
            setResponseStatus("error");
        }
        setIsLoading(false);
    };

    return (
        <div className="add-company-view-component">
            <div className="add-company-section">
                <label className="select-company-label">
                    Select a company name:
                </label>
                <input
                    value={companyId}
                    onChange={e => setCompanyId(e.target.value)}
                    className="company-name-input"
                />
                <button className="company-details-action" onClick={createCompanyDetails}>Submit</button>
            </div>
            <div className="message-box">
                {isLoading
                    ? <p>Loading...</p>
                    : ""
                }
                {
                    responseStatus === "added"
                        ? <p>Company details added!!</p>
                        : responseStatus === "existed"
                            ? <p>Company details already existed.</p>
                            : responseStatus === "error"
                                ? <p>Something went wrong.</p>
                                : ""
                }
            </div>
        </div>
    )
}

export default AddCompanyView;