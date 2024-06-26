import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import OrangeBtnComp from "./orangeBtnComp";
import ReturnBookComp from "./returnBookComp";

type landingInputs = {
  copyId: number;
  userId: string;
  returnDate: Date;
};

export default function ManualBookLandingComp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<landingInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<landingInputs> = async (data) => {
    const formData = new FormData();
    formData.append("copyId", data.copyId.toString());
    formData.append("userId", data.userId);
    const returnDate = new Date(data.returnDate);
    formData.append("returnDate", returnDate.toISOString());
    const response = await fetch("http://localhost:3000/api/manualLanding", {
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
    <>
      <div className="container mx-auto">
        <div className=" grid grid-cols-2 sm:grid-cols-2 mt-64 self-center gap-8 h-full justify-center items-center">
          <div className=" h-full w-full rounded-3xl bg-lightBlueCard shadow-md p-4 items-center">
            <h1 className=" text-center font-bold text-2xl mt-4 mb-8 ">
              إعارة كتاب
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  className="w-full h-8 rounded-full py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
                  type="number"
                  name="copyId"
                  placeholder="رقم نسخة الكتاب"
                  {...register("copyId", { required: true })}
                />
              </div>
              <div>
                <input
                  className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
                  type="text"
                  name="userId"
                  placeholder="رقم الطالب"
                  {...register("userId", { required: true })}
                />
              </div>
              <div>
                <input
                  className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
                  title="تاريخ العودة"
                  type="date"
                  name="returnDate"
                  placeholder="Enter returnDate"
                  {...register("returnDate", { required: true })}
                />
              </div>
              <OrangeBtnComp isSubmitting={isSubmitting} />
            </form>
          </div>
          <ReturnBookComp />
        </div>
      </div>
    </>
  );
}
