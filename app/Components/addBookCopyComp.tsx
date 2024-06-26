"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import OrangeBtnComp from "./orangeBtnComp";

type bookCopyInputs = {
  copyId: number;
  bookId: string;
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
    formData.append("bookId", data.bookId);
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
    <div className=" h-full w-full rounded-3xl bg-lightBlueCard shadow-md p-4 items-center">
      <p className=" text-center font-bold text-2xl mt-4 mb-8 ">اضافة نسخة</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="w-full h-8 rounded-full py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            type="number"
            name="copyId"
            placeholder="
            معرف النسخة"
            {...register("copyId")}
          />
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full py-2 px-4 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            type="text"
            name="bookId"
            placeholder="معرف الكتاب"
            {...register("bookId")}
          />
        </div>
        <OrangeBtnComp isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
