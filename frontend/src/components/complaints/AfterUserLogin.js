import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../sections/UserNavBar";
import { ChatState } from "../../context/ChatProvider";
import Profile from "../sections/Profile";

const AfterUserLogin = () => {
  const [complaints, setComplaints] = useState([]);
  const {profileView} = ChatState();
 // console.log(profileView);

  const [showNav, setShowNav] = useState(false);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Pending" || complaint.status === "pending"
  ).length;
  const completedComplaints = complaints.filter(
    (complaint) => complaint.status === "Completed"
  ).length;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const { data } = await axios.get(
          "http://localhost:5000/api/complain",
          config
        );
        // console.log(data);
        setComplaints(data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    fetchComplaints();
  }, [user]);

  return (
    <MDBContainer fluid className="p-4">
      {<UserNavBar />}

      {profileView ? (
        <Profile complaints={complaints} user={user} />
      ) : (
        <MDBRow className="justify-content-center">
          <MDBCol md="10">
            {complaints.length === 0 ? (
              <div className="text-center text-white my-5">
                <h1>Hurrah! There are no complaints</h1>
                <MDBIcon far icon="smile" size="3x" className="mt-3" />
              </div>
            ) : (
              <>
                <h1 className="mb-4 text-white text-center">Your Complaints</h1>
                <MDBRow className="g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
                  {complaints.map((complaint) => (
                    <MDBCol key={complaint.id}>
                      <MDBCard className="bg-dark text-white h-100 complaint-card">
                        <MDBCardBody>
                          <MDBCardTitle>{complaint.title}</MDBCardTitle>
                          <MDBCardText>{complaint.description}</MDBCardText>
                          <div className="mt-3">
                            <MDBCardText className="mb-1">
                              <small className="text-muted">
                                Category: {complaint.category}
                              </small>
                            </MDBCardText>
                            <MDBCardText className="mb-1">
                              <small className="text-muted">
                                Date:{" "}
                                {new Date(
                                  complaint.complain_date
                                ).toLocaleDateString()}
                              </small>
                            </MDBCardText>
                            <MDBCardText>
                              <small
                                className={`text-muted status-badge ${
                                  complaint.status === "Pending" ||
                                  complaint.status === "pending"
                                    ? "pending"
                                    : complaint.status === "Completed" ||
                                      complaint.status === "completed"
                                    ? "completed"
                                    : ""
                                }`}
                              >
                                Status: {complaint.status}
                              </small>
                            </MDBCardText>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))}
                </MDBRow>
              </>
            )}
          </MDBCol>
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default AfterUserLogin;
