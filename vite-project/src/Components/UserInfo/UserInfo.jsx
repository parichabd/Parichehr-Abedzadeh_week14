import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInfo.module.css";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

function UserInfo({ onAdd, editData }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    user: "",
    email: "",
    job: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    user: "",
    email: "",
    job: "",
    phone: "",
  });
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (editData) {
      setData({
        user: editData.user,
        email: editData.email,
        job: editData.job,
        phone: editData.phone,
      });
      setSelectedImg(editData.img);
    }
  }, [editData]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!data.user) {
      tempErrors.user = "Username is required";
      isValid = false;
    } else if (data.user.length < 7) {
      tempErrors.user = "Username must be at least 7 characters";
      isValid = false;
    } else if (!/[0-9!@#$%^&*]/.test(data.user)) {
      tempErrors.user = "Username must include at least one number or symbol";
      isValid = false;
    } else {
      tempErrors.user = "";
    }

    if (!data.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    } else {
      tempErrors.email = "";
    }

    if (!data.job) {
      tempErrors.job = "Job is required";
      isValid = false;
    } else {
      tempErrors.job = "";
    }

    if (!data.phone) {
      tempErrors.phone = "Phone is required";
      isValid = false;
    } else if (data.phone.toString().length < 10) {
      tempErrors.phone = "Phone must be at least 10 digits";
      isValid = false;
    } else {
      tempErrors.phone = "";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const uploadHandler = () => {
    if (validate()) {
      if (!selectedImg) {
        alert("Please select an avatar image!");
        return;
      }
      onAdd({ ...data, img: selectedImg });
      navigate("/");
    }
  };

  const cancelHandler = () => {
    setData({ user: "", email: "", job: "", phone: "" });
    setErrors({ user: "", email: "", job: "", phone: "" });
    setSelectedImg(null);
  };

  return (
    <div className={styles.parentInforUser}>
      <h1 className={styles.headeUserInfo}>
        {editData ? "Edit Contact" : "Add Contact"}
      </h1>
      <p className={styles.paragUserInfo}>
        {editData
          ? "Update the form below to edit the contact."
          : "Fill out the form below to add a new contact."}
      </p>

      <div className={styles.parentUserInfoPartTwo}>
        <div className={styles.inputInfo}>
          <label>
            User Name:
            <p style={{ fontSize: "10px", color: "green" }}>
              7 characters, include number & symbol ✔
            </p>
            <input
              type="text"
              name="user"
              placeholder="Alex3&9"
              value={data.user}
              onChange={changeHandler}
            />
          </label>
          {errors.user && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.user}</p>
          )}

          <label>
            Email:
            <input
              type="text"
              name="email"
              placeholder="abc@gmail.com"
              value={data.email}
              onChange={changeHandler}
            />
          </label>
          {errors.email && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.email}</p>
          )}

          <label>
            Job:
            <input
              type="text"
              name="job"
              placeholder="Mechanic"
              value={data.job}
              onChange={changeHandler}
            />
          </label>
          {errors.job && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.job}</p>
          )}

          <label>
            Phone:
            <input
              type="number"
              name="phone"
              placeholder="0123456789"
              value={data.phone}
              onChange={changeHandler}
            />
          </label>
          {errors.phone && (
            <p style={{ color: "red", fontSize: "10px" }}>{errors.phone}</p>
          )}
        </div>

        <div style={{ display: "grid", gap: "8px", margin: "15px 0" }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`avatar-${index}`}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border:
                  selectedImg === img ? "3px solid blue" : "1px solid gray",
                cursor: "pointer",
              }}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={uploadHandler}
        style={{
          padding: "12px",
          borderRadius: "10px",
          margin: "8px",
          backgroundColor: "green",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {editData ? "Update" : "Upload"}
      </button>
      <button
        onClick={cancelHandler}
        style={{
          padding: "12px",
          borderRadius: "10px",
          margin: "8px",
          backgroundColor: "red",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default UserInfo;
