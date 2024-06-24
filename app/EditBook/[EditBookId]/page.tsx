"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import OrangeBtnComp from "../../Components/orangeBtnComp";

interface BookData {
  book_id: string;
  author_id: string;
  book_title: string;
  publishing_year: string;
  pages_number: string;
  publishing_house: string;
  about_book: string;
  category: string;
  copys_number: string;
  book_cover: string;
}

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

export default function EditBookId({ params }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<bookInputs>();

  const [errorMessage, setErrorMessage] = useState("");
  const [bookData, setBookData] = useState<BookData | null>(null);

  const getBookData = async () => {
    const id = params.EditBookId;
    const response = await fetch(`/api/getBookData?id=${id}`);
    const data = await response.json();
    setBookData(data);
    console.log(data);
  };

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
    const id = params.EditBookId;
    const response = await fetch(`/api/editBookData?id=${id}`, {
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
    getBookData();
  }, []);
  return (
    <div className=" container mx-auto flex ">
      <div className=" h-full w-full mt-14 rounded-3xl bg-lightBlueCard shadow-md p-4 items-center">
        <p className=" text-center font-bold text-2xl mt-4 mb-8 ">
          تعديل الكتاب رقم {bookData?.book_id}
        </p>
        <div className="grid grid-cols-2 ">
          <div className=" flex justify-center self-center border-2 w-fit ml-20 mb-8 mt-8 ">
            <Image
              src={"/" + bookData?.book_cover}
              width={400}
              height={400}
              alt={bookData?.book_title}
            />
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
                  {...register("bookId", { required: true })}
                  defaultValue={bookData?.book_id}
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
                  defaultValue={bookData?.author_id}
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
                  defaultValue={bookData?.book_title}
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
                  defaultValue={bookData?.publishing_year}
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
                  defaultValue={bookData?.pages_number}
                  type="number"
                  name="PagesNumber"
                  id=""
                  placeholder="عدد الصفحات (خياري)"
                />
              </div>

              <input
                className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
                {...register("PublishingHouse")}
                defaultValue={bookData?.publishing_house}
                type="text"
                name="PublishingHouse"
                id=""
                placeholder="دار النشر (خياري)"
              />
              <div>
                <input
                  className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
                  {...register("AboutBook")}
                  defaultValue={bookData?.about_book}
                  type="text area"
                  name="AboutBook"
                  id=""
                  placeholder="نبذة عن الكتاب (خياري)"
                />
              </div>
              <div>
                <select
                  {...register("Category")}
                  defaultValue={bookData?.category} // Dosn't work
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
                  defaultValue={bookData?.copys_number}
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
                  defaultValue={bookData?.book_cover}
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
        </div>
      </div>
    </div>
  );
}
