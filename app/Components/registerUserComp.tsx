"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface RegisterCompProps {
  updateIsRegister: (newState: boolean) => void;
}

type Inputs = {
  userId: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
  sex: string;
  specialization: string;
  profile_pic: File;
};

export default function RegisterUserComp({ updateIsRegister }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onsubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("fullname", data.fullname);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("sex", data.sex);
    formData.append("specialization", data.specialization);
    formData.append("profile_pic", data.profile_pic[0]);

    const res = await fetch("/api/user", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      router.push("/UserDashboard");
    } else {
      setErrorMessage(result.error);
    }
  };
  return (
    <div className=" h-full w-full rounded-3xl bg-lightBlueCard shadow-md p-4 items-center">
      <form onSubmit={handleSubmit(onsubmit)}>
        <h2 className=" text-center font-bold text-2xl mt-20 mb-8 ">
          أنشئ حساب
        </h2>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("userId", { required: true })}
            type="text"
            placeholder="معرف الطالب"
          />
          {errors.userId && <span>This field is required</span>}
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("fullname", { required: true })}
            type="text"
            placeholder="الإسم الكامل"
          />
          {errors.fullname && <span>This field is required</span>}
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("username", { required: true })}
            type="text"
            placeholder="إسم المستخدم"
          />
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("password", { required: true })}
            type="password"
            placeholder="كلمة المرور"
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div>
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("email", { required: true })}
            type="email"
            placeholder="البريد الالكتروني"
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <select
            className="w-full h-9 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("sex", { required: true })}
          >
            <option value="Male">ذكر</option>
            <option value="Female">أنثى</option>
          </select>
          {errors.sex && <span>This field is required</span>}
        </div>
        <div>
          <select
            className="w-full h-9 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("specialization", { required: true })}
          >
            <option value="Databases">إعلام ألي/ قواعد البيانات</option>
            <option value="GRH">إدارة الموارد البشرية</option>
          </select>
          {errors.specialization && <span>This field is required</span>}
        </div>

        <div className=" flex flex-col text-right w-full h-22 rounded-xl px-4 py-2 mb-6 focus:outline-none focus:ring-1 border-white border-2 border-dashed text-white ">
          <input
            title="إختر صورة لحسابك"
            className=" file:rounded-3xl file:p-3 file:text-white file:bg-orangeCard file:cursor-pointer w-full h-16 rounded-full px-4 py-2 focus:outline-none focus:ring-1 file:border-none"
            {...register("profile_pic", { required: true })}
            type="file"
            accept="image/*"
          />

          {errors.profile_pic && <span>This field is required</span>}
        </div>
        <button
          className="w-full rounded-full px-4 py-2 text-white bg-orangeCard"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "إنتظر" : "إشترك"}
        </button>
        <p className="text-center mt-4 mb-10">
          لديك حساب بالفعل ؟{" "}
          <span
            onClick={() => updateIsRegister()}
            style={{ cursor: "pointer", color: "orange" }}
          >
            سجل دخولك
          </span>
        </p>
      </form>
    </div>
  );
}
