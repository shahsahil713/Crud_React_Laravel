import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

const Listing = () => {
    const [categories, setcategories] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);
    const [alert_msg, Setalert_msg] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/category").then(response => {
            setcategories(response.data.data);
            setActivePage(response.data.current_page);
            setItemsCountPerPage(response.data.per_page);
            setTotalItemsCount(response.data.total);
        });
    }, []);

    const handlePageChange = pageNumber => {
        axios
            .get("http://localhost:8000/api/category?page=" + pageNumber)
            .then(response => {
                setcategories(response.data.data);
                setItemsCountPerPage(response.data.per_page);
                setTotalItemsCount(response.data.total);
                setActivePage(response.data.current_page);
            });
        setActivePage(pageNumber);
    };

    const onDelete = category_id => {
        axios
            .delete("http://localhost:8000/api/category/" + category_id)
            .then(response => {
                var cats = categories;

                for (var i = 0; i < cats.length; i++) {
                    if (cats[i].id == category_id) {
                        cats.splice(i, 1);
                        setcategories(cats);
                        // this.setState({ categories: categories });
                    }
                }

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
                <SuccessAlert message={"Record Deleted Successfully"} />
            ) : null}
            {alert_msg == "error" ? (
                <ErrorAlert message={"Error Occured While Deleting Record"} />
            ) : null}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#Id</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => {
                        return (
                            <tr key={category.id}>
                                <th scope="row">{category.id}</th>
                                <td>{category.name}</td>
                                <td>
                                    {category.active == 1
                                        ? "Active"
                                        : "Inactive"}
                                </td>
                                <td>{category.created_at}</td>
                                <td>{category.updated_at}</td>
                                <td>
                                    <Link
                                        className="btn btn-sm btn-info"
                                        to={`/category/edit/${category.id}`}
                                    >
                                        Edit
                                    </Link>{" "}
                                    &nbsp;
                                    <a
                                        href="#"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            onDelete(category.id);
                                        }}
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        </div>
    );
};

export default Listing;
