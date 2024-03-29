import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useUserContext } from "../hooks/useUserContext";

import UseUserApi from "../hooks/useUserApi";

export const Form = ({ currentPage }) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [profileImage, SetProfileImage] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);
  const [description, setDescription] = useState("");
  const { prefillUser, page } = useUserContext();
  const { createUser, editUser } = UseUserApi();
  const [ImageError, setImageError] = useState();

  useEffect(() => {
    if (prefillUser) {
      setName(prefillUser.name);
      SetProfileImage(prefillUser.profile_picture);
      setBirthdate(prefillUser.birthdate);
      setActiveStatus(prefillUser.active_status);
      setDescription(prefillUser.description);
    }
  }, [prefillUser]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleCheckBox = () => {
    const checkbox = document.getElementById("checkbox");
    setActiveStatus(checkbox.checked);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setPictureFile(acceptedFiles[0]);
    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    SetProfileImage(imageUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (event) => {
    setImageError(null);
    console.log("doing");
    event.preventDefault();

    if (!pictureFile) {
      setImageError("ERRRR");
      return;
    }

    const formData = new FormData();
    formData.append("file", pictureFile);
    const user = {
      name,
      birthdate: formatDate(birthdate),
      description,
      active_status: activeStatus,
      profile_picture: formData,
    };
    if (page == "create") {
      createUser(user);
    } else {
      editUser(user, prefillUser.id);
    }
    console.log("done");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="form-input"
          required
        />
      </div>
      {ImageError && (
        <div style={{ backgroundColor: "red" }}>Please choose and image</div>
      )}
      <div>
        <label>Profile Picture:</label>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="dragdrop">
            {profileImage ? (
              <Image src={profileImage} alt="Profile Image" layout="fill" />
            ) : isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop some files here, or click to select files</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <label>Birthdate:</label>
        <DatePicker
          selected={birthdate}
          onChange={(date) => setBirthdate(date)}
          dateFormat="MM-dd-yyyy"
        />
      </div>
      <div id="active-status">
        <label>Active Status:</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={activeStatus}
          onChange={() => handleCheckBox()}
        />
      </div>
      <div>
        <label>Description: </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>
      <button
        className="button submit"
        type="submit"
        style={{ color: "green" }}
      >
        Submit
      </button>
    </form>
  );
};
