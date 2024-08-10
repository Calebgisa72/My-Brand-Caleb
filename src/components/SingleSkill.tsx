import React from "react";

const SingleSkill = () => {
  return (
    <div
      className="relative px-5 pt-10 pb-[25px] rounded-[5px] flex flex-col justify-between w-[330px]"
      style={{ background: "linear-gradient(to right, #522272, #1c42a0)" }}
    >
      <img className="w-[50px] absolute top-[-25px]" src="Images/Atom.svg" />
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-2 text-[#f9f9f9]">
          <div className="text-[13px]">3 Years ago</div>
          <span>&#183;</span>
          <div className="text-[13px] text-[rgb(237, 252, 227)]">Proficiency: Advanced</div>
        </div>
        <div className="text-[18px] font-bold text-[#f3eaea]">React</div>
        <div className="text-[#e6e3e3] flex gap-2 items-center text-[14px]">
          React is a popular JavaScript library for building user interfaces,
          particularly single-page applications. Enabling the creation of
          dynamic and interactive web applications with ease
        </div>
      </div>
      <div className="text-[#fbfbfe] text-[15px] font-normal self-end mt-3">Redux, React testing library</div>
    </div>
  );
};

export default SingleSkill;
