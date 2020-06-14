import React, { useState } from "react";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

const Add = () => {
    const [category_name, setCategoryName] = useState([]);
    const [alert_msg, Setalert_msg] = useState();

    const onChangeCategoryName = e => {
        setCategoryName(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        const category = {
            category_name: category_name
        };

        axios
            .post("http://localhost:8000/api/category", category)
            .then(response => {
                Setalert_msg("success");
            })
            .catch(error => {
                Setalert_msg("error");
            });

        setCategoryName("");
    };

    return (
        <div>
            <hr />
            {alert_msg == "success" ? (
                <SuccessAlert message={"Record Inserted Successfully"} />
            ) : null}
            {alert_msg == "error" ? (
                <ErrorAlert message={"Error Occured While Inserting Record"} />
            ) : null}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="category_name">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={category_name}
                        onChange={onChangeCategoryName}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
        </div>
    );
};

export default Add;
