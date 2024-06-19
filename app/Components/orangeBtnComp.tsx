import React from "react";

export default function OrangeBtnComp({ isSubmitting }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className=" w-full rounded-full px-4 py-2 text-white bg-orangeCard"
    >
      {isSubmitting ? "إنتظر" : "حفظ"}
    </button>
  );
}
