import { GrFormNext } from "react-icons/gr";
import { LuIndianRupee } from "react-icons/lu";
import React from "react";
import RequirementsField from "./RequirementsField";
import { useForm } from "react-hook-form";
import { useState } from "react";
export default function CourseInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [thumbnail, setThumbnail] = useState(null);
  const [value, setValue] = useState("");
  const onSubmit = (data) => {
    console.log(data);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnail(URL.createObjectURL(file));
  };
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="outline-richblack-700 bg-richblack-800 black-800 flex flex-col gap-6 overflow-hidden rounded-lg p-6 outline"
    >
      {/* Course Title */}
      <div className="flex flex-col gap-1.5">
        <label className="text-richblack-5 text-sm">
          Course Title
          <span className="text-sm leading-snug text-pink-200"> *</span>
        </label>
        <input
          {...register("courseName", {
            required: "Course title is required",
          })}
          className="bg-richblack-700 outline-richblack-700 text-richblack-5 rounded-lg p-3"
          placeholder="Enter Course Title"
        />
        {errors.courseName && (
          <span className="text-xs text-pink-200">
            {errors.courseName.message}
          </span>
        )}
      </div>

      {/* Course Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-richblack-5 text-sm">
          Course Description
          <span className="text-sm leading-snug text-pink-200"> *</span>
        </label>
        <textarea
          {...register("courseDescription", {
            required: "Course description is required",
          })}
          className="bg-richblack-700 outline-richblack-700 text-richblack-5 rounded-lg p-3"
          placeholder="Enter Description"
        />
        {errors.courseDescription && (
          <span className="text-xs text-pink-200">
            {errors.courseDescription.message}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1.5">
        <label className="text-richblack-5 text-sm">
          Price
          <span className="text-sm leading-snug text-pink-200"> *</span>
        </label>
        <div className="relative flex w-full items-center">
          <div className="absolute left-2">
            <LuIndianRupee />
          </div>

          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            className="bg-richblack-700 outline-richblack-700 text-richblack-5 w-full rounded-lg px-8 py-3"
            placeholder="Enter Price"
          />
        </div>

        {errors.price && (
          <span className="text-xs text-pink-200">{errors.price.message}</span>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <label className="text-richblack-5 text-sm">
          Category
          <span className="text-sm leading-snug text-pink-200"> *</span>
        </label>
        <select
          value={selectedCategory}
          {...register("category", { required: "Category is required" })}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`bg-richblack-700 outline-richblack-600 rounded-lg p-3 text-sm ${
            selectedCategory === "" ? "text-richblack-300" : "text-richblack-5"
          }`}
        >
          <option value="" disabled hidden>
            Choose a Category
          </option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
        {errors.category && (
          <span className="text-xs text-pink-200">
            {errors.category.message}
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <label className="text-richblack-5 text-sm">
          Tags <span className="text-sm leading-snug text-pink-200"> *</span>
        </label>
        <input
          {...register("tags", { required: true })}
          className="bg-richblack-700 outline-richblack-700 text-richblack-5 rounded-lg p-3"
          placeholder="Enter Tags separated by commas"
        />
      </div>

      {/* Course Thumbnail Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-richblack-5 text-sm">
          Course Thumbnail
          <span className="text-sm leading-snug text-pink-200"> *</span>
        </label>
        <div className="bg-richblack-700 outline-richblack-700 border-richblack-600 flex flex-col items-center gap-2 rounded-lg border border-dashed px-3 py-8">
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="h-20 w-32 rounded object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="hidden"
            id="thumbnailUpload"
          />
          <label
            htmlFor="thumbnailUpload"
            className="cursor-pointer text-yellow-50"
          >
            Browse
          </label>
          <p className="text-xs text-[#999daa]">Max 6MB each</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex flex-col gap-1.5">
        <label className="text-richblack-5 text-sm">
          Benefits
          <span className="text-sm leading-snug text-pink-200"> *</span>
        </label>
        <textarea
          {...register("benefits", { required: "Benefits are required" })}
          className="bg-richblack-700 outline-richblack-700 text-richblack-5 rounded-lg p-3"
          placeholder="List Benefits of the Course"
        />
        {errors.benefits && (
          <span className="text-xs text-pink-200">
            {errors.benefits.message}
          </span>
        )}
      </div>

      {/* Requirements */}
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
  
      />
    

      {/* Submit Button */}
      <button
        type="submit"
        className="text-richblack-700 mt-4 flex w-fit flex-row items-center justify-center gap-1 self-end rounded-lg bg-yellow-50 p-3 font-bold hover:bg-yellow-100"
      >
        <p>Next</p>

        <GrFormNext className="size-4" />
      </button>
    </form>
  );
}
