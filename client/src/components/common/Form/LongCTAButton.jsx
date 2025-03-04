import { Link } from "react-router-dom";

/**
 * LongCTAButton - A reusable call-to-action button component.
 *
 * @param {string} type - Button type (only used if the component is a <button>).
 * @param {string} linkTo - URL to navigate when clicked.
 * @param {React.ReactNode} children - Button content.
 */
export default function LongCTAButton({ type, children, linkTo, ...rest }) {
  return linkTo ? (
    // If `linkTo` exists, use `Link` for navigation
    <Link to={linkTo}>
      <button
        className="text-richblack-900 flex w-full cursor-pointer items-center justify-center rounded-lg bg-yellow-50 p-3 text-base font-medium shadow-md hover:bg-yellow-100 active:scale-[99%]"
        {...rest}
      >
        {children}
      </button>
    </Link>
  ) : (
    // Otherwise, render a normal button
    <button
      type={type || "button"} // Default to "button" if no type is provided
      className="text-richblack-900 flex w-full cursor-pointer items-center justify-center rounded-lg bg-yellow-50 p-3 text-base font-medium shadow-md hover:bg-yellow-100 active:scale-[99%]"
      {...rest}
    >
      {children}
    </button>
  );
}
