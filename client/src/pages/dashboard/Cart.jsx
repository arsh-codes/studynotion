import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoDotFill } from "react-icons/go";
import Header from "@client/components/core/Dashboard/Header";
import ReactStars from "react-stars";
import Sidebar from "@components/core/Dashboard/Sidebar";
import { removeFromCart } from "@client/redux/slices/cartSlice";
import { render } from "react-dom";
import sampleCoursesData from "@client/data/sampleCoursesData";

export default function Cart() {
  const [totalCoursesInCart, setTotalCoursesInCart] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  // onclick(()=> removeFromCart(course))
  //add stars
  //calculate average from all ratings and pass that to stars as props
  // nnumber of rating = rating and review.length
  // add remove button onclick remove from cart
  // in private route check that only student can go to cart and enrolled courses not instructor
  // create a file for all constants
  // import { ACCOUNT_TYPE } from "@client/utils/constants";
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    setTotalCoursesInCart(sampleCoursesData.length);
    setTotalAmount(
      sampleCoursesData.reduce((acc, course) => acc + course.price, 0),
    );
  }, []); // ✅ Removed sampleCoursesData from dependency array

  return (
    <section className="bg-richblack-900 flex flex-1 flex-row gap-1">
      <Sidebar />
      <div className="text-richblack-300 w-full">
        <Header pageName="My Cart" />

        {/* Courses and payment details */}
        <div className="flex flex-row items-start">
          {/* Course details */}
          <section className="my-8 flex w-full flex-col items-start justify-between rounded-lg p-6 shadow-md">
            {totalCoursesInCart === 0 ? (
              <div className="border-richblack-700 text-richblack-400 w-full border-b p-2 text-xl">
                No courses in your cart.
              </div>
            ) : (
              <div className="w-full">
                <div className="border-richblack-700 text-richblack-400 w-full border-b p-2 text-xl">
                  {totalCoursesInCart} courses in Cart
                </div>
                <div className="grid w-full grid-cols-10 items-start">
                  <section className="col-span-8 flex w-full flex-col py-6 pr-10">
                    {/* Looping through courses */}
                    {sampleCoursesData.map((course, index) => (
                      // Course Card
                      <div
                        key={index}
                        className="text-richblack-50 border-richblack-700 relative grid w-full grid-cols-10 gap-x-5 border-b p-6"
                      >
                        {/* Course Information */}
                        <div className="col-span-8 flex flex-row h-fit items-center gap-5">
                          {/* Course Thumbnail Image */}
                          <img
                            src={course.thumbnailImage}
                            className="size-20 object-cover"
                            // alt={course.title}
                          />

                          {/* Course Details */}
                          <div className="flex flex-col">
                            <p>{course.title}</p>
                            <p className="text-richblack-300">
                              {course.instructorName}
                            </p>

                            {/* Rating and reviews*/}
                            <div className="flex items-center gap-2">
                              <p>{course.averageRating}</p>
                              <ReactStars
                                count={5}
                                value={course.averageRating}
                                size={20}
                                color2={"#ffd700"}
                                edit={false}
                              />
                              <p>{`(${course.reviewCount} reviews)`}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p>{`${course.totalLessons} Lessons`}</p>
                              <GoDotFill />
                              <p>{`${course.video_hours} Hours`}</p>
                              <GoDotFill />
                              <p>{course.difficulty}</p>
                            </div>
                          </div>
                        </div>

                        {/* Course Price */}
                        <div className="text-richblack-200 col-span-2 flex items-center">
                          Rs. {course.price}
                        </div>
                      </div>
                    ))}
                  </section>

                  {/* Total Amount Section */}
                  <section className="bg-richblack-800 outline-richblack-700 hover:outline-richblack-600 col-span-2 inline-flex w-full flex-col items-start justify-start gap-1 rounded-lg p-6 outline outline-offset-[-1px] transition-all">
                    <p className="text-richblack-200 font-semibold">Total:</p>
                    <p className="text-2xl leading-loose font-semibold text-yellow-50">
                      Rs. {totalAmount}
                    </p>
                    <p className="text-richblack-200 text-sm line-through">
                      Rs.3,500
                    </p>
                    <button className="text-richblack-900 mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-yellow-50 p-3 text-base font-medium shadow-md transition-all hover:bg-yellow-100 active:scale-95">
                      Buy Now
                    </button>
                  </section>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
