"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import OrangeBtnComp from "../../Components/orangeBtnComp";

interface authorData {
  author_id: string;
  author_name: string;
  author_nationality: string;
  author_birthdate: string;
  author_field: string;
}

type authorInputs = {
  authorName: string;
  authorNationality: string;
  authorBirthdate: Date;
  authorField: string;
};

export default function EditAutherId({ params }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<authorInputs>();

  const [errorMessage, setErrorMessage] = useState("");
  const [authorData, setauthorData] = useState<authorData | null>(null);

  const getAutherData = async () => {
    const id = params.EditAutherId;

    const response = await fetch(`/api/getAutherData?id=${id}`);
    const data = await response.json();
    setauthorData(data);
  };
  const onSubmit: SubmitHandler<authorInputs> = async (data) => {
    const formData = new FormData();
    formData.append("authorName", data.authorName);
    formData.append("authorNationality", data.authorNationality);
    formData.append(
      "authorBirthdate",
      new Date(data.authorBirthdate).toISOString()
    );
    formData.append("authorField", data.authorField);

    const id = params.EditAutherId;
    const response = await fetch(`/api/editAutherData?id=${id}`, {
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
    getAutherData();
  }, []);
  return (
    <div className=" container mx-auto">
      <div className=" h-full mt-14 rounded-3xl bg-lightBlueCard shadow-md p-4 items-center justify-center">
        <p className=" text-center font-bold text-2xl mt-4 mb-8 ">
          تعديل الكاتب رقم {authorData?.author_id}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
              {...register("authorName", { required: true })}
              defaultValue={authorData?.author_name}
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
              defaultValue={authorData?.author_nationality}
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
              defaultValue={authorData?.author_field}
              type="text"
              name="authorField"
              id=""
              placeholder="المجال (خياري)"
            />
          </div>

          <OrangeBtnComp isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
}
