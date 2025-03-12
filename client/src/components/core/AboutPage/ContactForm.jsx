import { useEffect, useState } from "react";

import PhoneNumberInput from "@components/core/SignupPage/PhoneNumberInput";
import { contactUs } from "@services/operations/contactAPI";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    setLoading(true);
    await dispatch(contactUs(data));
    setLoading(false);
  };

  // Reset form after successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        countryCode: "",
        phoneNumber: "",
        email: "",
        message: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  // Styling classes
  const inputClassName =
    "bg-richblack-700 w-full text-richblack-200 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]";
  const labelClassName = "text-richblack-5 pb-1.5 font-medium";
  const errorClassName = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Name Fields */}
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex w-full flex-col">
          <label htmlFor="firstName" className={labelClassName}>
            First Name
          </label>
          <input
            id="firstName"
            {...register("firstName", { required: "First Name is required" })}
            placeholder="Enter First Name"
            className={inputClassName}
          />
          {errors.firstName && (
            <span className={errorClassName}>{errors.firstName.message}</span>
          )}
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="lastName" className={labelClassName}>
            Last Name
          </label>
          <input
            id="lastName"
            {...register("lastName", { required: "Last Name is required" })}
            placeholder="Enter Last Name"
            className={inputClassName}
          />
          {errors.lastName && (
            <span className={errorClassName}>{errors.lastName.message}</span>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col">
        <label htmlFor="email" className={labelClassName}>
          Email Address
        </label>
        <input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Enter Email Address"
          className={inputClassName}
        />
        {errors.email && (
          <span className={errorClassName}>{errors.email.message}</span>
        )}
      </div>

      <PhoneNumberInput
        register={register}
        errors={errors}
        setValue={setValue}
      />
      {/* Message Field */}
      <div className="flex flex-col pt-4">
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          {...register("message", { required: "Message is required" })}
          placeholder="Enter your message here..."
          className={`${inputClassName} h-24`}
        />
        {errors.message && (
          <span className={errorClassName}>{errors.message.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-richblack-900 flex w-full items-center justify-center rounded-lg bg-yellow-50 p-3 text-base font-medium shadow-md transition duration-200 hover:bg-yellow-100 active:scale-[98%]"
      >
        {loading ? "Sending Message..." : "Send Message"}
      </button>
    </form>
  );
}
