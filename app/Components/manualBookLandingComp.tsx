import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type landingInputs = {
  copyId: number;
  userId: number;
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
    formData.append("userId", data.userId.toString());
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
    <div>
      <h1>Book landing Manual</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="number"
            name="copyId"
            placeholder="Enter copyId"
            {...register("copyId", { required: true })}
          />
        </div>
        <div>
          <input
            type="number"
            name="userId"
            placeholder="Enter userId"
            {...register("userId", { required: true })}
          />
        </div>
        <div>
          <input
            type="date"
            name="returnDate"
            placeholder="Enter returnDate"
            {...register("returnDate", { required: true })}
          />
        </div>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
