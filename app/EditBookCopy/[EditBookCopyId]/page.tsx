"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import OrangeBtnComp from "../../Components/orangeBtnComp";

interface bookCopyData {
  copy_id: number;
  book_id: string;
}

type bookCopyInputs = {
  copyId: number;
  bookId: string;
};

export default function EditBookCopyId({ params }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<bookCopyInputs>();

  const [errorMessage, setErrorMessage] = useState("");
  const [bookCopyData, setbookCopyData] = useState<bookCopyData | null>(null);

  // buggy - need to fix (id isn't being recived correctly)
  const getBookCopyData = async () => {
    const id = params.EditbookCopyId;
    console.log(id);
    const response = await fetch(`/api/getBookCopyData?id=${id}`);
    const data = await response.json();
    setbookCopyData(data);
  };
  const onSubmit: SubmitHandler<bookCopyInputs> = async (data) => {
    const formData = new FormData();
    formData.append("copyId", data.copyId.toString());
    formData.append("bookId", data.bookId);
    const id = params.EditbookCopyId;
    const response = await fetch(`/api/editBookCopyData?id=${id}`, {
      method: "PUT",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      alert("File uploaded successfully");
    } else {
      alert("File upload failed");
    }
  };

  useEffect(() => {
    getBookCopyData();
  }, []);
  return (
    <div className=" container mx-auto">
      <div className=" h-full w-full rounded-3xl bg-lightBlueCard shadow-md p-4 items-center">
        <p className=" text-center font-bold text-2xl mt-40 mb-8 ">
          اضافة نسخة
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="w-full h-8 rounded-full py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
              defaultValue={bookCopyData?.copy_id}
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
              defaultValue={bookCopyData?.book_id}
              type="text"
              name="bookId"
              placeholder="معرف الكتاب"
              {...register("bookId")}
            />
          </div>
          <OrangeBtnComp isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
}
