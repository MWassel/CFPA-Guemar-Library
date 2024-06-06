"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type authorInputs = {
  authorName: string;
  authorNationality: string;
  authorBirthdate: Date;
  authorField: string;
};

export default function AddAuthorComp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<authorInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit: SubmitHandler<authorInputs> = async (data) => {
    const formData = new FormData();
    formData.append("authorName", data.authorName);
    formData.append("authorNationality", data.authorNationality);
    const authorBirthdate = new Date(data.authorBirthdate);
    formData.append("authorBirthdate", authorBirthdate.toISOString());
    formData.append("authorField", data.authorField);

    const response = await fetch("http://localhost:3000/api/addAuthor", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      alert("Form uploaded successfully");
    } else {
      alert("Form upload failed");
    }
  };
  return (
    <div className=" container">
      <p>Add Author: </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("authorName", { required: true })}
            type="text"
            name="authorName"
            id=""
            placeholder="Author Name"
          />
        </div>
        <div>
          <input
            {...register("authorNationality")}
            type="text"
            name="authorNationality"
            id=""
            placeholder="Author Nationality (optional)"
          />
        </div>

        <div>
          <input
            {...register("authorBirthdate")}
            type="date"
            name="authorBirthdate"
            id=""
            placeholder="Author Birthdate (optional)"
          />
        </div>

        <div>
          <input
            {...register("authorField")}
            type="text"
            name="authorField"
            id=""
            placeholder="authorField (optional)"
          />
        </div>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading" : "Add Author"}
        </button>
      </form>
    </div>
  );
}
