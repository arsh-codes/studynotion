import Logo from "../../../assets/logo/logoFullLight.png";
import FooterLinkGroup from "./FooterLinkGroup";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

export default function MyFooter() {
  return (
    <section className="bg-richblack-800 flex flex-col items-center justify-center">
      {/* wrapper */}
      <div className="mx-auto flex w-11/12 flex-col gap-8 px-4 py-8 md:px-28 md:py-12">
        {/* top container */}
        <div className="relative flex flex-col gap-12 md:flex-row">
          {/* left section */}
          <section className="flex w-1/2 justify-evenly gap-4">
            {/* left column 1 */}
            <div className="flex flex-col gap-3">
              <img src={Logo} alt="StudyNotion Website Logo" />
              <FooterLinkGroup title="Company" />
              <div className="text-richblack-400 hover:text-richblack-50 flex cursor-pointer gap-3 text-lg transition-all duration-100">
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
          <section className="border-richblack-600 flex w-1/2 justify-evenly border-l">
            <FooterLinkGroup title="Subjects" />
            <FooterLinkGroup title="Languages" />
          </section>
        </div>

        {/* bottom container */}
        <div className="border-richblack-600 flex w-11/12 items-center justify-between border-t py-4">
          <div className="text-richblack-400 hover:text-richblack-50 cursor-pointer text-sm">
            Privacy Policy
          </div>
          <div className="text-richblack-400 text-center text-sm">
            Made with ❤️ CodeHelp © 2023 Studynotion
          </div>
        </div>
      </div>
    </section>
  );
}
