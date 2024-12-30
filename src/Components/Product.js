import React, { useEffect, useState } from "react";
import "./product.css";
import { Link } from "react-router-dom";

function Product() {
  const [datas, setDatas] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 

  const dataGet = () => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setDatas(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    dataGet();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };


  const handleFileChange = (e) => {
    setImage(e.target.files[0]); 
    // console.log(image);
    
  };

  const handleEditClick = (product) => {
    setIsEditing(true); 
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,

    });
  };
 

  const handleAddClick = () => {
    setIsEditing(false); 
    setFormData({ id: "", name: "", price: "", category: "" });
    setImage(null);
  };

  const saveProduct = (event) => {
    event.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("price", formData.price);
    formDataObj.append("category", formData.category);
    // console.log( formData.category);
    // console.log(image);
    
    if (image) {
      formDataObj.append("image", image); 
      console.log(image);
      console.log(formDataObj)
    }
   
   
    const url = formData.id
      ? `http://localhost:5000/api/product/put/${formData.id}` 
      : "http://localhost:5000/api/product/insert";

    const method = formData.id ? "PUT" : "POST"; 

    fetch(url, {
      method: method,
      body: formDataObj,
    })
      .then((response) => response.json())
      .then(() => {
        dataGet();
        setFormData({ id: "", name: "", price: "", category: "" }); 
        setImage(null); 
      })
      .catch((error) => console.error("Error saving product:", error));
  };

  const deleteProduct = (id) => {
    // if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/api/product/delete/${id}`, {
        method: "DELETE",
      })
        .then(() => dataGet())
        .catch((error) => console.error("Error deleting product:", error));
    // }
  };

  return (
    <div className="App">
      
      <button
        className="btn btn-primary xl add-card"
        data-toggle="modal"
        data-target="#addProductModal"
        onClick={handleAddClick}
      >
        Add Product
      </button>

      {/* Add Product Modal */}
      <div
        className="modal fade"
        id="addProductModal"
        role="dialog"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Product</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <form onSubmit={saveProduct} encType="multipart/form-data">
              <div className="modal-body">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label>Price</label>
                <input
                  name="price"
                  type="text"
                  className="form-control"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">--select--</option>
                  <option value="Formals">Formals</option>
                  <option value="Casual">Casual</option>
                </select>
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                  
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add Product
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

      {/* Edit Product Modal */}
      <div
        className="modal fade"
        id="editProductModal"
        role="dialog"
        aria-labelledby="editProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Product</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <form onSubmit={saveProduct} encType="multipart/form-data">
              <div className="modal-body">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label>Price</label>
                <input
                  name="price"
                  type="text"
                  className="form-control"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">--select--</option>
                  <option value="Formals">Formals</option>
                  <option value="Casual">Casual</option>
                </select>
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                  src=""
                />
              </div>
              <div className="modal-footer ">
                <button type="submit" className="btn btn-primary">
                  Save Changes
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

      {/* Product Table */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td>{data.category}</td>
              <td>
                {data.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${data.image}`}
                    alt={data.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <Link to={`/view/${data.id}`} className="btn btn-info">
                  View
                </Link>
                <button
                  className="btn btn-warning"
                  data-toggle="modal"
                  data-target="#editProductModal"
                  onClick={() => handleEditClick(data)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(data.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
