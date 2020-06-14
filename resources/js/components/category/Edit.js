import React, { useState, useEffect } from "react";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import { useParams } from "react-router-dom";

const Edit = () => {
    let { id } = useParams();

    const [category_name, setCategoryName] = useState([]);
    const [alert_msg, Setalert_msg] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/category/" + id + "/edit")
            .then(response => {
                setCategoryName(response.data.name);
            });
    }, []);

    const onChangeCategoryName = e => {
        setCategoryName(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        const category = {
            category_name: category_name
        };

        axios
            .put("http://localhost:8000/api/category/" + id, category)
            .then(response => {
                Setalert_msg("success");
            })
            .catch(error => {
                Setalert_msg("error");
            });
    };

    return (
        <div>
            <hr />
            {alert_msg == "success" ? (
                <SuccessAlert message={"Record Updated Successfully"} />
            ) : null}
            {alert_msg == "error" ? (
                <ErrorAlert message={"Error Occured While Updating Record"} />
            ) : null}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="category_name">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category_name"
                        value={category_name}
                        onChange={onChangeCategoryName}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Edit
                </button>
            </form>
        </div>
    );
};

export default Edit;
