"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import BookSearchComp from "../Components/bookSearchComp";
import { Span } from "next/dist/trace";

type Inputs = {
  fullname: string;
  username: string;
  password: string;
  email: string;
  sex: string;
  specialization: string;
  profile_pic: File;
};

type loginInputs = {
  username: string;
  password: string;
};

export default function LandingPage() {
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
    formData.append("fullname", data.fullname);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("sex", data.sex);
    formData.append("specialization", data.specialization);
    formData.append("profile_pic", data.profile_pic[0]);

    await fetch("/api/user", {
      method: "POST",
      body: formData,
    });
  };

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
    <>
      <div>
        <BookSearchComp />
        <div className="w-1/4 flex flex-col rounded-3xl bg-lightBlueCard shadow-xl p-4">
          {isRegister ? (
            <form onSubmit={handleSubmit(onsubmit)}>
              <h2 className=" text-center font-bold text-xl">أنشئ حساب</h2>
              <div>
                <input
                  {...register("fullname", { required: true })}
                  type="text"
                  placeholder="Full Name"
                />
                {errors.fullname && <span>This field is required</span>}
              </div>
              <div>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="Username"
                />
                {errors.username && <span>This field is required</span>}
              </div>
              <div>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                />
                {errors.password && <span>This field is required</span>}
              </div>
              <div>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="E-mail"
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div>
                <select {...register("sex", { required: true })}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.sex && <span>This field is required</span>}
              </div>
              <div>
                <select {...register("specialization", { required: true })}>
                  <option value="DB">DB</option>
                  <option value="GRH">GRH</option>
                </select>
                {errors.specialization && <span>This field is required</span>}
              </div>
              <div>
                <input
                  {...register("profile_pic", { required: true })}
                  type="file"
                  accept="image/*"
                />
                {errors.profile_pic && <span>This field is required</span>}
              </div>
              <button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading" : "Submit"}
              </button>
              <p>
                لديك حساب بالفعل ؟{" "}
                <span
                  onClick={() => setIsRegister(false)}
                  style={{ cursor: "pointer", color: "orange" }}
                >
                  سجل دخولك
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onsubmitLogin)}>
              <h2 className=" text-center font-bold text-xl">تسجيل الدخول</h2>
              <div className=" text-right">
                <input
                  className="w-full h-8 rounded-full px-4 py-2 mt-8 mb-6 focus:outline-none focus:ring-1 bg-white text-black text-right"
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
              <p className="text-center mt-4">
                ليس لديك حساب؟{" "}
                <span
                  onClick={() => setIsRegister(true)}
                  style={{
                    cursor: "pointer",
                    color: "orange",
                  }}
                >
                  إشترك
                </span>
              </p>
            </form>
          )}
        </div>
        <div>
          <p>---------------------------------</p>
          <h2>Most Popular Books :</h2>
        </div>
      </div>
    </>
  );
}
