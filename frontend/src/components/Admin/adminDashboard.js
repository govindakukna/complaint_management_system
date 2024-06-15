import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import NavBar from "../sections/AdminNavBar";
import { ChatState } from "../../context/ChatProvider";
import Profile from "../sections/Profile";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
 
  const { profileView, toggleProfileView } = ChatState();

  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("adminInfo"));

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${admin?.token}`,
          },
        };

        const { data } = await axios.get(
          "http://localhost:5000/api/admin",
          config
        );
        //   console.log(data[0].complain_date);
        setComplaints(data);
      } catch (error) {
        console.error("Failed to fetch complaints for admin:", error);
      }
    };

    fetchComplaints();
  }, [admin]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/admin/updatecomplainstatus",
        { id, status },
        config
      );

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === id
            ? { ...complaint, status: data.status }
            : complaint
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };


  return (
    <MDBContainer fluid className="p-4 bg-gradient-secondary text-white">
      {<NavBar />}
      {profileView ? 
        <Profile  complaints={complaints} 
        user= {admin} />
       : (
        <MDBRow className="justify-content-center">
          <MDBCol md="10">
            <MDBCard className="bg-dark text-white mb-4">
              <MDBCardBody>
                <h1 className="mb-4">All Complaints</h1>
                <MDBTable responsive>
                  <MDBTableHead light>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {complaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td className="text-info lead">{complaint.id}</td>
                        <td className="text-white lead">{complaint.title}</td>
                        <td className="text-white lead">
                          {complaint.description}
                        </td>
                        <td className="text-white lead">
                          {complaint.category}
                        </td>
                        <td className="text-red lead">
                          {new Date(
                            complaint.complain_date
                          ).toLocaleDateString()}
                        </td>
                        <td className="text-white">{complaint.status}</td>
                        <td>
                          {complaint.status == "pending" ||
                          complaint.status == "Pending" ? (
                            <MDBBtn
                              color="success"
                              size="sm"
                              onClick={() =>
                                handleStatusUpdate(complaint.id, "Completed")
                              }
                            >
                              Mark as Completed
                            </MDBBtn>
                          ) : (
                            <MDBBtn
                              color="primary"
                              size="sm"
                              onClick={() =>
                                handleStatusUpdate(complaint.id, "Pending")
                              }
                              className="me-2"
                            >
                              Mark as Pending
                            </MDBBtn>
                          )}
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default AdminDashboard;
