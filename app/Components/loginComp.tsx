"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type loginInputs = {
  username: string;
  password: string;
};

interface LoginCompProps {
  updateIsRegister: (newState: boolean) => void;
}

export default function LoginComp({ updateIsRegister }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginInputs>();

  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onsubmitLogin: SubmitHandler<loginInputs> = async (data) => {
    if (data.username === "admin" && data.password === "admin") {
      router.push("/AdminDashboard");
    } else {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        router.push("/UserDashboard");
      } else {
        setErrorMessage(result.error);
      }
    }
  };
  return (
    <div className=" h-full w-full rounded-3xl bg-lightBlueCard shadow-md p-4 items-center">
      <form onSubmit={handleSubmit(onsubmitLogin)}>
        <h2 className=" text-center font-bold text-2xl mt-40 mb-8 ">
          تسجيل الدخول
        </h2>
        <div className=" text-right">
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("username", { required: true })}
            type="text"
            placeholder="اسم المستخدم"
          />
          {errors.username && (
            <span className=" text-orange-50 font-bold mr-4">
              ! هذا الحقل مطلوب
            </span>
          )}
        </div>
        <div className=" text-right">
          <input
            className="w-full h-8 rounded-full px-4 py-2 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
            {...register("password", { required: true })}
            type="password"
            placeholder="كلمة المرور"
          />
          {errors.password && (
            <span className=" text-orange-50 font-bold mr-4">
              ! هذا الحقل مطلوب
            </span>
          )}
        </div>
        <button
          className="w-full rounded-full px-4 py-2 text-white bg-orangeCard"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "إنتظر" : "سجل دخولك"}
        </button>
        <p className="text-red-600">{errorMessage}</p>
        <p className="text-center mt-4 mb-60">
          ليس لديك حساب؟{" "}
          <span
            onClick={() => updateIsRegister()}
            style={{
              cursor: "pointer",
              color: "orange",
            }}
          >
            إشترك
          </span>
        </p>
      </form>
    </div>
  );
}
