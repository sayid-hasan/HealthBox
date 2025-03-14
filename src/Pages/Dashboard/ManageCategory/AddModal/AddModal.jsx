import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IKContext, IKUpload } from "imagekitio-react";
import BtnWithICon from "../../../../components/NormalBtns/BtnWithIcon";
import { MdAdd } from "react-icons/md";

const AddModal = ({ modal, refetch, setModal }) => {
  const axiosSecure = useAxiosSecure();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // react form hook
  const { register, handleSubmit, watch } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
  // get authentication params for image uplaod in imagekit from server
  // get authentication params for image uplaod in imagekit from server
  const authenticator = async () => {
    try {
      // You can also pass headers and validate the request source in the backend, or you can use headers for any other use case.

      const response = await fetch("http://localhost:5000/get-signature");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      // console.log(data);
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err) => {
    console.log("Error", err);
    setProgress(0);
    setUploading(false);
    toast.error("sorry, looks like something went wrong");
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setProgress(100);
    setUploading(false);
    toast.success("image uploaded successfully");
    setImageUrl(res?.url);
  };
  const onUploadStart = (evt) => {
    console.log("Start", evt);
    if (evt) {
      setUploading(true);
    }
  };
  const onUploadProgress = (progress) => {
    setUploading(false);
    console.log("Progress", progress);
    const percentage = Math.round((progress?.loaded / progress.total) * 98);
    setProgress(percentage);
  };

  //   console.log(scholarship);

  //   console.log(deadline._i);
  //   getdata from onsubmit\
  const onSubmit = async (data) => {
    const { categoryName } = data;
    // console.log(data);
    console.log(imageUrl);
    const categoryData = {
      categoryName,
      categoryImg: imageUrl,
    };
    console.log(categoryData);
    // //   add data on database as category
    try {
      const res = await axiosSecure.post(`/categories`, categoryData);
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your  category successfully inserted",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
        setModal(false);
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Facing error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const subscription = watch(() => {
      // console.log(data);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, imageUrl]);
  return (
    <>
      {modal && (
        <div className="flex justify-center w-full z-10 max-w-2xl relative py-5">
          {/* // <!-- Modal toggle --> */}

          {/* // <!-- Main modal --> */}
          <div
            id="crud-modal"
            tabIndex="-1"
            className=" max-w-2xl mx-auto  overflow-y-auto overflow-x-hidden fixed top-0 right-0 flex  py-5 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)]"
          >
            <div className="relative p-2 w-full max-w-full max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative backdrop-blur-md bg-PrimaryColor/60 border border-SecondaryColor text-SubTextColor rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-bold text-SecondaryColor text-center w-full dark:text-white">
                    Add a Category
                  </h3>
                  {/* close button to do set setmodal false */}
                  <button
                    onClick={() => setModal(false)}
                    type="button"
                    className="text-PrimaryColor bg-SecondaryColor hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex items-center flex-col w-full "
                >
                  <div className="grid items-center gap-4 mb-4 grid-cols-1">
                    {/* catgory name */}
                    <div className="font-Nunito sm:col-span-1">
                      <label
                        htmlFor="categoryName"
                        className="block dark:text-gray-600 text-SecondaryColor font-bold tracking-widest"
                      >
                        Category Name
                      </label>
                      <input
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        {...register("categoryName", {
                          required: "Category is required",
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Add your own category"
                      />
                    </div>
                    {/*  and photo */}
                    {/* ikimage upload */}
                    <div className="font-Nunito sm:col-span-1 ">
                      <label
                        htmlFor="photo"
                        className="block dark:text-gray-600 text-SecondaryColor font-bold tracking-widest"
                      >
                        Your Image
                      </label>
                      <div className="flex justify-start items-center gap-1">
                        <IKContext
                          publicKey={"public_T4zX45oipeTjSumsrvipza8t/Lo="}
                          urlEndpoint={"https://ik.imagekit.io/sayidImage34"}
                          authenticator={authenticator}
                        >
                          <IKUpload
                            required={true}
                            onError={onError}
                            onSuccess={onSuccess}
                            onUploadStart={onUploadStart}
                            onUploadProgress={onUploadProgress}
                            useUniqueFileName={true}
                            isPrivateFile={false}
                            className="file-input bg-PrimaryColor focus:outline-none text-SecondaryColor w-full max-w-xs"
                          />
                        </IKContext>
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            height={"50px"}
                            width={"50px"}
                            alt="select a image"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" w-full flex justify-center mb-7"
                  >
                    <BtnWithICon
                      text={`Add`}
                      classname={`hover:text-SecondaryColor hover:border-SecondaryColor  border hover:bg-PrimaryColor flex-1 `}
                      icon={<MdAdd></MdAdd>}
                    ></BtnWithICon>
                  </button>
                </form>
              </div>
              {/* progress bar */}
              {progress !== 0 && progress !== 100 && (
                <div className=" absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-10 backdrop-blur-sm">
                  {" "}
                  <div
                    className="radial-progress bg-PrimaryColor text-SecondaryColor border-PrimaryColor font-bold border-4"
                    style={{
                      "--value": progress,
                      "--size": "5rem",
                      "--thickness": "10px",
                    }}
                    role="progressbar"
                  >
                    {progress}%
                  </div>
                </div>
              )}
              {/* loading */}
              {uploading && (
                <div className=" absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-10000 backdrop-blur-sm">
                  {" "}
                  <div
                    className="loading loading-bars loading-lg bg-SecondaryColor  border-PrimaryColor font-bold border-4"
                    role=""
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddModal;
