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
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/signup",
        { name, email, password },
        config
      );

      toast.success("🦄 Registration Successful!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

     // localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      toast.error(`Error Occurred! ${error.response.data.message}`, {
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
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className="text-white-50 mb-5">
                Please enter your details to create an account!
              </p>
              <form
                onSubmit={handleSubmit}
                className="w-100 d-flex flex-column align-items-center"
              >
                <MDBInput
                  wrapperClass="mb-4 w-75"
                  labelClass="text-white"
                  label="Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={name}
                  onChange={handleNameChange}
                />
                <MDBInput
                  wrapperClass="mb-4 w-75"
                  labelClass="text-white"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={handleEmailChange}
                />
                <MDBInput
                  wrapperClass="mb-4 w-75"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <MDBInput
                  wrapperClass="mb-4 w-75"
                  labelClass="text-white"
                  label="Confirm Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <MDBBtn
                  outline
                  className="px-5"
                  color="white"
                  size="lg"
                  type="submit"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Registering..." : "Register"}{" "}
                  {/* Show loading text */}
                </MDBBtn>
              </form>
              <div className="d-flex flex-row mt-3 mb-5 justify-content-center">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="twitter" size="lg" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="m-3"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="google" size="lg" />
                </MDBBtn>
              </div>
              <div>
                <p className="mb-0">
                  Already have an account?{" "}
                  <a href="/" className="text-white-50 fw-bold">
                    Login
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
};

export default Registration;
