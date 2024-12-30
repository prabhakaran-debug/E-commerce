import { data } from "jquery";
import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Address() {

  const location = useLocation();
  const { state } = location;
  const P_id = state?.product_id;
  console.log(P_id)
  const [address, setAddress] = useState([]); 
  const [addressdetails,setAddressDetails]=useState(null);
  const [selecteddata,setSelecteddata] = useState('');
  const [formData, setFormData] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    country: "",
  });
  const navigate = useNavigate();

 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const saveAddress = async (event) => {
    event.preventDefault();

    
    const { houseNo, street, city, state, country } = formData;
    if (!houseNo || !street || !city || !state || !country) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/address/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save address");
      }

      const data = await response.json();
      alert("Address saved successfully!");
      console.log("Server Response:", data);

      
      setFormData({
        houseNo: "",
        street: "",
        city: "",
        state: "",
        country: "",
      });

      
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
      alert("An error occurred while saving the address.");
    }
  };



  const updateAddress = async (event) => {
    event.preventDefault();
    
    if (!addressdetails?.id) {
      console.error("Address ID is missing");
      alert("Address ID is missing.");
      return;
    }
    
    const { houseNo, street, city, state, country } = addressdetails;
    if (!houseNo || !street || !city || !state || !country) {
      alert("All fields are required!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/address/put/${addressdetails.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressdetails),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update address");
      }
  
      const data = await response.json();
      alert("Address updated successfully!");
      fetchAddresses();  // Reload addresses after update
    } catch (error) {
      console.error("Error updating address:", error);
      alert("An error occurred while updating the address.");
    }
  };
  



  // Fetch the addresses
  const fetchAddresses = () => {
    fetch("http://localhost:5000/api/address")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAddress(data); // Assuming `data` is an array
      })
      .catch((error) => console.error("Error fetching address:", error));
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const radioChange = (e) => {
    const value = e.target.value;
    setSelecteddata(value);
    console.log(value);
  }

  const idData = () =>{
    navigate('/Preview',{state:{address_id:selecteddata,product_id:P_id}})
    console.log(selecteddata)
  }

  const deleteAddress = (id) => {
    console.log("ID:", id);
  
    fetch(`http://localhost:5000/api/address/delete/${id}`, {
      method: "DELETE",
    })
    fetchAddresses();
  };
  
  const handleEditAddress = async (id) => {
      const response = await fetch(`http://localhost:5000/api/address/${id}`);
      console.table("response :"+response);
      const data = await response.json();
      console.log("AddressDetails :"+data);
      setAddressDetails(data); 
      
  };
  console.log(addressdetails)

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails({ ...addressdetails, [name]: value });
  };
console.log(addressdetails)
 
  
  return (
    <>
      <button
        className="btn btn-primary xl add-card"
        data-toggle="modal"
        data-target="#addAddress"
      >
        Add Address
      </button>

      {/*add addtess Modal */}
      <div className="modal fade" id="addAddress" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Address</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <form onSubmit={saveAddress}>
              <div className="modal-body">
                <label className="form-label">House No</label>
                <input
                  name="houseNo"
                  type="text"
                  placeholder="Enter the house number"
                  className="form-control"
                  value={formData.houseNo}
                  onChange={handleInputChange}
                />
                <label className="form-label">Street</label>
                <input
                  name="street"
                  type="text"
                  placeholder="Enter the street"
                  className="form-control"
                  value={formData.street}
                  onChange={handleInputChange}
                />
                <label className="form-label">City</label>
                <input
                  name="city"
                  type="text"
                  placeholder="Enter the city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <label className="form-label">State</label>
                <input
                  name="state"
                  type="text"
                  placeholder="Enter the state"
                  className="form-control"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <label className="form-label">Country</label>
                <input
                  name="country"
                  type="text"
                  placeholder="Enter the country"
                  className="form-control"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* edit address modal */}
      <div className="modal fade" id="editAddress" role="dialog">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Edit Address</h4> {/* Update Title */}
        <button type="button" className="close" data-dismiss="modal">
          &times;
        </button>
      </div>
      <form onSubmit={updateAddress}>
        <div className="modal-body">
          <label className="form-label">House No</label>
          <input
            name="houseNo"
            type="text"
            placeholder="Enter the house number"
            className="form-control"
            value={addressdetails?.houseNo || ""}
            onChange={handleEditInputChange}
          />
          
          <label className="form-label">Street</label>
          <input
            name="street"
            type="text"
            placeholder="Enter the street"
            className="form-control"
            value={addressdetails?.street || ""}
            onChange={handleEditInputChange}
          />
          <label className="form-label">City</label>
          <input
            name="city"
            type="text"
            placeholder="Enter the city"
            className="form-control"
            value={addressdetails?.city || ""}
            onChange={handleEditInputChange}
          />
          <label className="form-label">State</label>
          <input
            name="state"
            type="text"
            placeholder="Enter the state"
            className="form-control"
            value={addressdetails?.state || ""}
            onChange={handleEditInputChange}
          />
          <label className="form-label">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Enter the country"
            className="form-control"
            value={addressdetails?.country || ""}
            onChange={handleEditInputChange}
          />
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
      </div>


      <form>
        <h2>Select an Address</h2>
        {address.map((value) => (
          <div key={value.id}>
              <input
                type="radio"
                name="address"
                value={value.id} 
                onChange={radioChange}
             />
              {value.houseNo}, {value.street}, {value.city}, {value.state},{" "}
              {value.country}
              <button
                  className="btn btn-warning"
                  data-toggle="modal"
                  data-target="#editAddress"
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleEditAddress(value.id); 
                  }}
              >
                  Edit
              </button>


                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAddress(selecteddata);
                  }}
                >
                  Delete
                </button>

          </div>
        ))}
      </form>
      
     
      <button className="btn btn-primary" onClick={idData}>Delivery here</button>
      
    </>

  );
}

export default Address;
