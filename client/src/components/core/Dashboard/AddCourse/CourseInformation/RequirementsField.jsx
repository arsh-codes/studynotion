import React, { useState } from "react";

export default function RequirementsField() {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  function handleAddRequirement() {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  }
  function removeRequirement(index) {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList = updatedRequirementList;
  }
  return (
    <div className="flex flex-col gap-15">
      <label className="text-richblack-5 text-sm">
        Requirements
        <span className="text-sm leading-snug text-pink-200"> *</span>
      </label>
      <input
        type="text"
        {...register("requirements", {
          required: "Requirements are required",
        })}
        className="bg-richblack-700 outline-richblack-700 text-richblack-5 rounded-lg p-3"
        placeholder="List course requirements"
      />
      {errors.requirements && (
        <span className="text-xs text-pink-200">
          {errors.requirements.message}
        </span>
      )}
    </div>
  );
}
