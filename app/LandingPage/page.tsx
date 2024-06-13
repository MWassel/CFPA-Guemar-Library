"use client";
import { useState } from "react";
import BookSearchComp from "../Components/bookSearchComp";
import MostPopularBooksComp from "../Components/mostPopularBooksComp";
import RegisterUserComp from "../Components/registerUserComp";
import LoginComp from "../Components/loginComp";
import { Span } from "next/dist/trace";

export default function LandingPage() {
  const [isRegister, setIsRegister] = useState(false);
  const updateIsRegister = (newState: boolean) => setIsRegister(!isRegister);
  return (
    <>
      <div className="container mx-auto">
        <div className=" grid grid-cols-3 sm:grid-cols-3 m-10 mt-28">
          <div className=" flex flex-col col-span-2 w-full gap-8">
            <BookSearchComp />
            <MostPopularBooksComp />
          </div>
          <div className=" ml-8 col-span-1">
            {isRegister ? (
              <RegisterUserComp updateIsRegister={updateIsRegister} />
            ) : (
              <LoginComp updateIsRegister={updateIsRegister} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
