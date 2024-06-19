"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import OrangeBtnComp from "./orangeBtnComp";

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
    <div className=" h-full w-full rounded-3xl bg-lightBlueCard shadow-md p-4 items-center justify-center">
      <p className=" text-center font-bold text-2xl mt-40 mb-8 ">اضافة مؤلف</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("authorName", { required: true })}
            type="text"
            name="authorName"
            id=""
            placeholder="إسم الكاتب"
          />
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("authorNationality")}
            type="text"
            name="authorNationality"
            id=""
            placeholder="جنسية الكاتب (خياري)"
          />
        </div>

        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("authorBirthdate")}
            title="تاريخ الميلاد (خياري)"
            type="date"
            name="authorBirthdate"
            id=""
            placeholder="تاريخ الميلاد (خياري)"
          />
        </div>

        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("authorField")}
            type="text"
            name="authorField"
            id=""
            placeholder="المجال (خياري)"
          />
        </div>

        <OrangeBtnComp isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
