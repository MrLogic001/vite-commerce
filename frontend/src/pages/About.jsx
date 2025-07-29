import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="about_us_image"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Do note that the usage of these program are legal in most countries
            outside the United States, IF and ONLY IF you own a full copy of the
            program - then you may use these program for backup purposes, and
            only that. It remains to be seen how affected you are of the End
            User License Agreements (EULAs). They can't supersede domestic laws,
            remember that. According to the "DMCA ACT" in the Unites States, you
            have no rights to circumvent a copy protection. Beware, they will
            punish you harder than if you stole
          </p>
          <p>      Do note that the usage of these program are legal in most countries
            outside the United States, IF and ONLY IF you own a full copy of the
            program - then you may use these program for backup purposes, and
            only that. It remains to be seen how affected you are of the End
            User License Agreements (EULAs). They can't supersede domestic laws,
            remember that.</p>
            <b className="text-gray-800">OUR MISSION</b>
            <p>      Do note that the usage of these program are legal in most countries
            outside the United States, IF and ONLY IF you own a full copy of the
            program - then you may use these program for backup purposes, and
            only that. </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">It remains to be seen how affected you are of the End
            User License Agreements (EULAs). They can't supersede domestic laws,
            remember that.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">It remains to be seen how affected you are of the End
            User License Agreements (EULAs). They can't supersede domestic laws,
            remember that.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">It remains to be seen how affected you are of the End
            User License Agreements (EULAs). They can't supersede domestic laws,
            remember that.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
