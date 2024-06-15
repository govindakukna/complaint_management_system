import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import { ChatState } from "../../context/ChatProvider";

const Profile = ({ complaints ,user}) => {
  

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Pending" || complaint.status === "pending"
  ).length;
  const completedComplaints = complaints.filter(
    (complaint) => complaint.status === "Completed"
  ).length;

  return (
    <MDBRow className="justify-content-center">
      <MDBCol md="10">
        <MDBCard className="profile-card mt-5 shadow-lg">
          <MDBCardBody>
            <div className="text-center mb-4">
              <h3 className="font-weight-bold text-uppercase">
                {user.user.name}
              </h3>
              <p className="text-muted">{user.user.email}</p>
            </div>
            <hr />
            <div className="complaint-stats mb-4">
              <MDBRow>
                <MDBCol md="4">
                  <div className="text-center">
                    <h6 className="font-weight-bold mb-3">
                      Total Registered Complaints
                    </h6>
                    <h4 className="font-weight-bold mb-0 text-primary">
                      {totalComplaints}
                    </h4>
                  </div>
                </MDBCol>
                <MDBCol md="4">
                  <div className="text-center">
                    <h6 className="font-weight-bold mb-3">
                      Pending Complaints
                    </h6>
                    <h4 className="font-weight-bold mb-0 text-warning">
                      {pendingComplaints}
                    </h4>
                  </div>
                </MDBCol>
                <MDBCol md="4">
                  <div className="text-center">
                    <h6 className="font-weight-bold mb-3">
                      Completed Complaints
                    </h6>
                    <h4 className="font-weight-bold mb-0 text-success">
                      {completedComplaints}
                    </h4>
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
            <hr />
            <form>
              <MDBBtn
                type="submit"
                color="primary"
                className="btn-block rounded-pill"
              >
                Reset Password
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default Profile;
