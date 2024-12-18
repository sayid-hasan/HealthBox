const BtnWithICon = ({ icon, position = "right", text, classname }) => {
  return (
    <div
      className={`btn h-auto mt-4 border-transparent hover:bg-PrimaryColor hover:border-SecondaryColor  bg-SecondaryColor text-white font-bold px-4  md:py-4 py-2 text-sm max-w-[180px]   group transition duration-200 flex items-center gap-3 ${classname}`}
    >
      <span className="flex flex-row items-center justify-center group-hover:translate-x-2 transition duration-200  gap-2  ">
        {position === "left" && icon}
        {text}
        {position === "right" && icon}
      </span>
    </div>
  );
};

export default BtnWithICon;
