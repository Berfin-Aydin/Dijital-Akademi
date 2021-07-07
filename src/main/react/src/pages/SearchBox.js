import React from "react";
import "./SearchBox.css"
import { Button } from "@material-ui/core";
export default class SearchBox extends React.Component {
  render() {
    return (
      <div class="container">
        <br />
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8">
            <form class="card card-sm">
              <div class="card-body row no-gutters align-items-center">
                <div class="col-auto">
                  <i class="fas fa-search h4 text-body"></i>
                </div>

                <div class="col">
                  <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords" />
                </div>

                <div class="col-auto">
                  <button class="btn btn-lg btn-success" type="submit">ARA</button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>

    )
  }
}