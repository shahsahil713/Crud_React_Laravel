import React from "react";
import Listing from "./Listing";
import Add from "./Add";
import Edit from "./Edit";
import { Link, Route } from "react-router-dom";

function About() {
    return (
        <div>
            <div>
                <hr />
                <Link to="/category/add" className="btn btn-success">
                    Add
                </Link>{" "}
                &nbsp;
                <Link to="/category" className="btn btn-warning">
                    Display
                </Link>
                <Route exact path="/category/add" component={Add} />
                <Route exact path="/category" component={Listing} />
                <Route exact path="/category/edit/:id" component={Edit} />
            </div>
        </div>
    );
}

export default About;
