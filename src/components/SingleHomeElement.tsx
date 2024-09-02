import React from "react";

interface HomeElementProps {
  icon: any;
  title: string;
  total: number | undefined;
}

const SingleHomeElement = ({ icon, title, total }: HomeElementProps) => {
  return (
    <div className="bg-[#eeeeee] p-4 gap-4 rounded-[8px] flex shadow-lg items-center">
      <div className="w-10">{icon}</div>
      <div className="flex flex-col gap-1 items-center text-xl">
        <p className="font-medium text-description">{title}</p>
        <p className="font-bold font-serif">{total}</p>
      </div>
    </div>
  );
};

export default SingleHomeElement;
