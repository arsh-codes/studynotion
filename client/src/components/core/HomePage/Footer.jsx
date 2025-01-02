import Logo from "../../../assets/logo/logoFullLight.png";
import FooterLinkGroup from "./FooterLinkGroup";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

export default function MyFooter() {
  return (
    <section className="flex flex-col items-center justify-center bg-richblack-800">
      {/* wrapper */}
      <div className="mx-auto flex w-11/12 flex-col gap-8 px-28 py-12">
        {/* top container */}
        <div className="relative flex gap-12">
          {/* left section */}
          <section className="flex w-1/2 justify-evenly">
            {/* left column 1 */}
            <div className="flex flex-col gap-3">
              <img src={Logo} alt="StudyNotion Website Logo" />
              <FooterLinkGroup title="Company" />
              <div className="flex cursor-pointer gap-3 text-lg text-richblack-400 transition-all duration-100 hover:text-richblack-50">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google"
                >
                  <FaGoogle />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* left column 2 */}
            <div className="flex flex-col gap-9">
              <FooterLinkGroup title="Resources" />
              <FooterLinkGroup title="Support" />
            </div>

            {/* left column 3 */}
            <div className="flex flex-col gap-9">
              <FooterLinkGroup title="Plans" />
              <FooterLinkGroup title="Community" />
            </div>
          </section>
          {/* <div className="absolute left-1/2 my-auto h-0 w-1/2 origin-top-left rotate-90 border border-richblack-700"></div> */}

          {/* right section */}
          <section className="flex w-1/2 justify-evenly border-l border-richblack-600">
            <FooterLinkGroup title="Subjects" />
            <FooterLinkGroup title="Languages" />
          </section>
        </div>

        {/* bottom container */}
        <div className="flex w-11/12 items-center justify-between border-t border-richblack-600 py-4">
          <div className="cursor-pointer text-sm text-richblack-400 hover:text-richblack-50">
            Privacy Policy
          </div>
          <div className="text-center text-sm text-richblack-400">
            Made with ❤️ CodeHelp © 2023 Studynotion
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="h-[538px] justify-start items-start gap-[52px] inline-flex">
  <div className="grow shrink basis-0 h-[362px] justify-start items-start gap-3 flex">
    <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-3 inline-flex">
      <div className="w-40 h-8 relative  overflow-hidden">
        <img className="w-8 h-8 left-0 top-0 absolute" src="https://via.placeholder.com/32x32" />
        <img className="w-8 h-8 left-0 top-[236.80px] absolute" src="https://via.placeholder.com/32x32" />
      </div>
  <div className="w-[538px] self-stretch origin-top-left rotate-90 border border-[#2c333f]"></div>
  <div className="grow shrink basis-0 h-[538px] justify-start items-start gap-3 flex">
    <div className="grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex">
      <div className="self-stretch text-[#afb2bf] text-base font-semibold font-['Inter'] leading-normal">Subjects</div>
       */
}
