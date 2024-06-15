import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBIcon,
  MDBCollapse,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";

const UserNavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const { profileView, toggleProfileView } = ChatState();

  const registerComplain = () => navigate("/registerComplain");

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div>
      <MDBNavbar expand="lg" dark bgColor="primary" className="mb-4">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/usercomplaints">
            <MDBIcon fas icon="tasks" className="me-2" />
            Complaint Management
          </MDBNavbarBrand>
          <MDBNavbarToggler>
            <MDBIcon fas icon="bars" onClick={() => setShowNav(!showNav)} />
            <div style={{ position: "relative" }}>
              {showNav && (
                <>
                  <div
                    style={{
                      background: "white",
                      borderRadius: "5px",
                      position: "absolute",
                      color: "gray",
                      zIndex: "10000",
                      right: "10px",
                      padding: "10px 40px",
                      fontWeight: "400",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      onClick={toggleProfileView}
                      style={{ paddingBottom: "7px" }}
                    >
                      My Profile
                    </div>
                    <div
                      color="light"
                      className="me-3"
                      style={{ paddingBottom: "7px" }}
                      onClick={registerComplain}
                    >
                      New Complaint
                    </div>
                    <div onClick={handleLogout}>logout</div>
                  </div>
                </>
              )}
            </div>
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav className="me-auto d-flex align-items-center ">
              <div className="navbarr">
                <MDBNavbarItem className="d-flex align-items-center">
                  <MDBBtn
                    color="light"
                    className="me-3"
                    onClick={registerComplain}
                  >
                    New Complaint
                  </MDBBtn>
                  <MDBDropdown>
                    <MDBDropdownToggle
                      tag="a"
                      className="nav-link d-flex align-items-center p-0"
                      role="button"
                    >
                      <MDBIcon
                        fas
                        icon="user-circle"
                        className="me-2"
                        style={{ fontSize: "1.5rem" }}
                      />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem
                        className="profile_tag"
                        onClick={toggleProfileView}
                      >
                        My Profile
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        className="logout_tag"
                        onClick={handleLogout}
                      >
                        Logout
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>
              </div>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default UserNavBar;
