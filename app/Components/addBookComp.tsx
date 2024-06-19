"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import OrangeBtnComp from "./orangeBtnComp";

type bookInputs = {
  bookId: number;
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
    formData.append("bookId", data.bookId.toString());
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
    <div className=" h-full w-full rounded-3xl bg-lightBlueCard shadow-md p-4 items-center">
      <p className=" text-center font-bold text-2xl mt-4 mb-8 ">اضافة كتاب</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("bookId", { required: true })}
            type="string"
            name="bookId"
            id=""
            placeholder="معرف الكتاب"
          />
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("authorId", { required: true })}
            type="number"
            name="authorId"
            id=""
            placeholder="معرف المؤلف"
          />
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("bookTitle", { required: true })}
            type="text"
            name="bookTitle"
            id=""
            placeholder="عنوان الكتاب"
          />
        </div>

        <div>
          <input
            className="w-full h-8 rounded-full  py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("PublishingYear")}
            type="number"
            name="PublishingYear"
            id=""
            placeholder="سنة النشر (خياري)"
          />
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("PagesNumber")}
            type="number"
            name="PagesNumber"
            id=""
            placeholder="عدد الصفحات (خياري)"
          />
        </div>

        <input
          className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
          {...register("PublishingHouse")}
          type="text"
          name="PublishingHouse"
          id=""
          placeholder="دار النشر (خياري)"
        />
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("AboutBook")}
            type="text area"
            name="AboutBook"
            id=""
            placeholder="نبذة عن الكتاب (خياري)"
          />
        </div>
        <div>
          <select
            {...register("Category")}
            className="w-full h-9 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            title="تصنيف الكتاب"
          >
            <option value="رويات و قصص">رويات و قصص</option>
            <option value="آدب">آدب</option>
            <option value="رياضة">رياضة</option>
            <option value="دين">دين</option>
            <option value="تاريخ">تاريخ</option>
            <option value="علوم">علوم</option>
            <option value="سياسة">سياسة</option>
            <option value="مال و أعمال">مال و أعمال</option>
            <option value="فلسفة">فلسفة</option>
            <option value="علم النفس و تطوير الذات">
              علم النفس و تطوير الذات
            </option>
            <option value="السيرة الذاتية و المذكرات">
              السيرة الذاتية و المذكرات
            </option>
            <option value="لغات">لغات</option>
            <option value="قانون">قانون</option>
            <option value="تكنولوجيا">تكنولوجيا</option>
            <option value="صحافة و إعلام">صحافة و أعلام</option>
            <option value="طب و صحة">طب و صحة</option>
            <option value="الأسرة و الطفل">الأسرة و الطفل</option>
            <option value="تسلية">تسلية</option>
            <option value="فنون">فنون</option>
            <option value="كتب أطفال">كتب أطفال</option>
            <option value="السفر و الترحال">السفر و الترحال</option>
            <option value="ميثالوجيا و أساطير">ميثالوجيا و أساطير</option>
            <option value="مراجع و أبحاث">مراجع و أبحاث</option>
          </select>
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("CopysNumber")}
            type="number"
            name="CopysNumber"
            id=""
            placeholder="عدد النسخ (خياري)"
          />
        </div>
        <div className=" flex flex-col text-right w-full h-22 rounded-xl px-4 py-2 mb-6 focus:outline-none focus:ring-1 border-white border-2 border-dashed text-white ">
          <input
            className=" file:rounded-3xl file:p-3 file:text-white file:bg-orangeCard file:cursor-pointer w-full h-16 rounded-full px-4 py-2 focus:outline-none focus:ring-1 file:border-none file:ml-7"
            {...register("bookCover")}
            title="غلاف الكتاب"
            type="file"
            name="bookCover"
            id=""
            accept="image/*"
            placeholder="غلاف الكتاب (خياري)"
          />
        </div>

        <OrangeBtnComp isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
