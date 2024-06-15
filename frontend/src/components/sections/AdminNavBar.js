import React, { useEffect, useState } from "react";

import {
  MDBContainer,
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

const AdminNavBar = () => {
  const [showNav, setShowNav] = useState(false);
  
const { profileView ,toggleProfileView} = ChatState();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    navigate("/adminlogin");
  };

  
  useEffect(()=>{
    const handleResize = ()=>{
      console.log("resize")
      setShowNav(false);
    } 
    window.addEventListener('resize',handleResize)
    return window.removeEventListener('resize',handleResize)
  },[])

  return (
    <>
      <MDBNavbar expand="lg" dark bgColor="primary" className="mb-4">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/admindashboard">
            <MDBIcon fas icon="tasks" className="me-2" />
            Admin Dashboard
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
                    <div onClick={toggleProfileView} style={{paddingBottom:"7px"}}>Profile</div>
                    <div onClick={handleLogout}>logout</div>
                  </div>
                </>
              )}
            </div>
          </MDBNavbarToggler>
          <MDBCollapse navbar>
            <MDBNavbarNav className="ms-auto d-flex align-items-center">
              <div className="navbarradmin  me-2">
                <MDBNavbarItem className="d-flex align-items-center  me-2 pointer">
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
                        style={{ fontSize: "1.5rem", padding: "0.5rem" }}
                      />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem
                        className="profile_tag "
                        style={{ cursor: "pointer" }}
                        onClick={toggleProfileView}
                      >
                        My Profile
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        className="logout_tag"
                        style={{ cursor: "pointer" }}
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
    </>
  );
};

export default AdminNavBar;
