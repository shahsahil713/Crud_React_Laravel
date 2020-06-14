import React from "react";
import { Link } from "react-router-dom";
const Error404 = () => {
    return (
        <div>
            <div className="alert alert-danger">
                404 Page Not Found.{" "}
                <Link to="/" className="alert-link">
                    Back To Home
                </Link>
            </div>
        </div>
    );
};

export default Error404;
