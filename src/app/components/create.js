"use client";
import { Form } from "../components/form";

const Create = () => {
  return (
    <div className="form">
      <div>
        <h1 className="form-title">Create</h1>
        <div>
          <Form currentPage={"create"} />
        </div>
      </div>
    </div>
  );
};
export default Create;
