"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

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
    <div>
      <p>Add Book : </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("bookId", { required: true })}
            type="string"
            name="bookId"
            id=""
            placeholder="Book Id"
          />
        </div>
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
            name="PublishingYear"
            id=""
            placeholder="Publishing Year (optional)"
          />
        </div>
        <div>
          <input
            {...register("PagesNumber")}
            type="number"
            name="PagesNumber"
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
            name="AboutBook"
            id=""
            placeholder="About Book (optional)"
          />
        </div>
        <div>
          <select {...register("Category")}>
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
            {...register("CopysNumber")}
            type="number"
            name="CopysNumber"
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
