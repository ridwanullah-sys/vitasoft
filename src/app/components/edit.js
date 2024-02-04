"use client";
import { useEffect, useState } from "react";
import { Form } from "../components/form";

const Edit = () => {
  return (
    <div className="form">
      <div>
        <h1 className="form-title">Edit</h1>
        <div>
          <Form currentPage={"edit"} />
        </div>
      </div>
    </div>
  );
};
export default Edit;
