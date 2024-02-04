import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useUserContext } from "../hooks/useUserContext";

import UseUserApi from "../hooks/useUserApi";

import dynamic from "next/dynamic";

export const Form = ({ currentPage }) => {
  const Editor = dynamic(() => import("./ckeditor"), { ssr: false });
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [profileImage, SetProfileImage] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionpre, setDescriptionpre] = useState("");
  const { prefillUser, page } = useUserContext();
  const { createUser, editUser } = UseUserApi();
  const [Component, setComponent] = useState();

  useEffect(() => {
    if (prefillUser) {
      setName(prefillUser.name);
      SetProfileImage(prefillUser.profile_picture);
      setBirthdate(prefillUser.birthdate);
      setActiveStatus(prefillUser.active_status);
      setDescriptionpre(prefillUser.description);
    }
  }, [prefillUser]);

  useEffect(() => {}, []);

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
    console.log("doing");
    event.preventDefault();

    // if (!pictureFile) return;

    // const formData = new FormData();
    // formData.append("file", pictureFile);
    const user = {
      name,
      birthdate: "2222-09-09",
      description,
      active_status: activeStatus,
      //   profile_picture: formData,
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
        <Editor
          descriptionpre={descriptionpre}
          setDescription={setDescription}
        />
      </div>
      <button className="button submit" type="submit">
        Submit
      </button>
    </form>
  );
};
