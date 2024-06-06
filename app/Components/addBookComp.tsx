"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type bookInputs = {
  authorId: number;
  bookTitle: string;
  PublishingYear: number;
  PagesNumber: number;
  PublishingHouse: string;
  AboutBook: string;
  Category: string;
  CopysNumber: number;
  bookCover: File;
};

export default function AddBookComp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<bookInputs>();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<bookInputs> = async (data) => {
    const formData = new FormData();
    formData.append("authorId", data.authorId.toString());
    formData.append("bookTitle", data.bookTitle);
    formData.append("PublishingYear", data.PublishingYear.toString());
    formData.append("PagesNumber", data.PagesNumber.toString());
    formData.append("PublishingHouse", data.PublishingHouse);
    formData.append("AboutBook", data.AboutBook);
    formData.append("Category", data.Category);
    formData.append("CopysNumber", data.CopysNumber.toString());
    formData.append("bookCover", data.bookCover[0]);

    const response = await fetch("http://localhost:3000/api/addBook", {
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
      <p>Add Book : </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("authorId", { required: true })}
            type="number"
            name="authorId"
            id=""
            placeholder="Author Id"
          />
        </div>
        <div>
          <input
            {...register("bookTitle", { required: true })}
            type="text"
            name="bookTitle"
            id=""
            placeholder="Book Title"
          />
        </div>

        <div>
          <input
            {...register("PublishingYear")}
            type="number"
            name="bookPublishingYear"
            id=""
            placeholder="Publishing Year (optional)"
          />
        </div>
        <div>
          <input
            {...register("PagesNumber")}
            type="number"
            name="pagesNumber"
            id=""
            placeholder="Pages Number (optional)"
          />
        </div>

        <input
          {...register("PublishingHouse")}
          type="text"
          name="PublishingHouse"
          id=""
          placeholder=" Publishing House (optional)"
        />
        <div>
          <input
            {...register("AboutBook")}
            type="text area"
            name="aboutBook"
            id=""
            placeholder="About Book (optional)"
          />
        </div>
        <div>
          <input
            {...register("Category")}
            type="text"
            name="category"
            id=""
            placeholder="Category (optional)"
          />
        </div>
        <div>
          <input
            {...register("CopysNumber")}
            type="text"
            name="copyNumber"
            id=""
            placeholder="Copy Number (optional)"
          />
        </div>
        <div>
          <input
            {...register("bookCover")}
            type="file"
            name="bookCover"
            id=""
            accept="image/*"
            placeholder="Book Cover (optional)"
          />
        </div>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading" : "Add Book"}
        </button>
      </form>
    </div>
  );
}
