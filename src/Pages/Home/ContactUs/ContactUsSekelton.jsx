const ContactUsSekelton = () => {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-8 px-8 py-10 my-8 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-[#05A081] bg-opacity-10 animate-pulse">
      {/* Left Side Skeleton */}
      <div className="flex flex-col justify-between">
        <div className="space-y-4">
          {/* Skeleton for Title */}
          <div className="skeleton h-10 w-3/4 rounded"></div>
          {/* Skeleton for Subtitle */}
          <div className="skeleton h-6 w-2/3 rounded"></div>
        </div>
        {/* Skeleton for Image */}
        <div className="skeleton p-6 h-52 md:h-64 rounded"></div>
      </div>

      {/* Right Side Skeleton (Form) */}
      <div className="space-y-6">
        {/* Skeleton for Full Name Input */}
        <div>
          <div className="skeleton h-4 w-1/4 mb-2 rounded"></div>
          <div className="skeleton h-12 w-full rounded"></div>
        </div>
        {/* Skeleton for Email Input */}
        <div>
          <div className="skeleton h-4 w-1/4 mb-2 rounded"></div>
          <div className="skeleton h-12 w-full rounded"></div>
        </div>
        {/* Skeleton for Message Input */}
        <div>
          <div className="skeleton h-4 w-1/4 mb-2 rounded"></div>
          <div className="skeleton h-24 w-full rounded"></div>
        </div>
        {/* Skeleton for Button */}
        <div className="skeleton h-12 w-full rounded"></div>
      </div>
    </div>
  );
};

export default ContactUsSekelton;
