"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type bookCopyInputs = {
  copyId: number;
  bookId: number;
};

export default function AddBookCopyComp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<bookCopyInputs>();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<bookCopyInputs> = async (data) => {
    const formData = new FormData();
    formData.append("copyId", data.copyId.toString());
    formData.append("bookId", data.bookId.toString());
    const response = await fetch("http://localhost:3000/api/addBookCopy", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (result.success) {
      alert("File uploaded successfully");
    } else {
      alert("File upload failed");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="number"
            name="copyId"
            placeholder="
            copyId"
            {...register("copyId")}
          />
        </div>
        <div>
          <input
            type="number"
            name="bookId"
            placeholder="bookId"
            {...register("bookId")}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
