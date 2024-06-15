import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../../context/ChatProvider";

const ComplaintForm = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
 // const { user } = ChatState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { title, description, category } = formData;
    if (!title || !description || !category) {
      toast.info("Please fill all the fields", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    console.log(formData);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/complain/register",
        formData,
        config
      );

      toast.success("🦄 Complaint Registered Successfully!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setFormData({
        title: "",
        description: "",
        category: "",
      });
      navigate('/usercomplaints');
      setLoading(false);
    } catch (error) {
      toast.error("Failed to register complaint", {
        position: "bottom",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid>
      <div className="d-flex justify-content-start mt-3">
        <MDBBtn outline color="white" size="lg" onClick={() => navigate(-1)}>
          <MDBIcon fas icon="arrow-left" className="me-2" />
          Back
        </MDBBtn>
      </div>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "600px" }} // Adjust maxWidth for wider fields
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">
                Register Complaint
              </h2>
              <p className="text-white-50 mb-5">
                Please enter the complaint details below!
              </p>
              <form
                onSubmit={handleSubmit}
                className="w-100 d-flex flex-column align-items-center"
              >
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  labelClass="text-white"
                  label="Title"
                  id="formTitle"
                  type="text"
                  size="lg"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <MDBTextArea
                  wrapperClass="mb-4 w-100"
                  labelClass="text-white"
                  label="Description"
                  id="formDescription"
                  rows={6} // Make the description field bigger
                  size="lg"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  labelClass="text-white"
                  label="Category"
                  id="formCategory"
                  type="text"
                  size="lg"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
                <div className="d-flex justify-content-center w-100">
                  <MDBBtn
                    outline
                    className="px-5"
                    color="white"
                    size="lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
};

export default ComplaintForm;
