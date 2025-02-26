import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Components/css/Header.css";
import { Dropdown, Modal, Button } from "react-bootstrap"; 
import profile from "../Components/image/profile.jfif"; 

function Header() {
    const [role_name, setRole_name] = useState('');
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);

    const role_id = localStorage.getItem('role_id');
    
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername)
        if (role_id) {
            fetch(`http://localhost:5000/api/role/${role_id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Role Data:", data);
                    setRole_name(data.role_name);
                })
                .catch((error) => console.error("Error fetching role:", error));
        }
    }, [role_id]);

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const showProfile = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="header-container">
            <div className="logo">
                <h3 className="gradient-logo">E-COMMERCE</h3>
            </div>
            <ul className="hul">
                <li className="hli">
                    <Link className="header-a" to="/">Home</Link>
                </li>
                <li className="hli">
                    <Link className="header-a" to="/address">Address</Link>
                </li>
                <li className="hli">
                    <Link className="header-a"
                     to={{ pathname: "/Order" }} 
                    state={{username:username}}
                    >My Order</Link>
                </li>

                {role_name === "admin" && (
                    <>
                        <li className="hli">
                            <Link className="header-a" to="/product">Products</Link>
                        </li>
                        <li className="hli">
                            <Link className="header-a" to="/User">Users</Link>
                        </li>
                        <li className="hli">
                            <Link className="header-a" to="/Dashboard">Dashboard</Link>
                        </li>
                    </>
                )}

                <Dropdown align="middle" className="ml-3 drop-div">
                    <Dropdown.Toggle variant="link" id="dropdown-avatar">
                        <img
                            src={profile}
                            className="rounded-circle"
                            height="25"
                            alt="User Avatar"
                            loading="lazy"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={showProfile}>My Profile</Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* Profile Modal */}
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>My Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Username :</strong> {username}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ul>
        </div>
    );
}

export default Header;
