import ProductImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common/commonSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.features);
  console.log(featureImageList);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  // const [currentEditedId, setCurrentEditedId] = useState(null);

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      console.log("data", data);
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast.success(data.payload.message);
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      {/* image upload component */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        setUploadedImageUrl={setUploadedImageUrl}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full"
        disabled={imageLoadingState || !imageFile}
      >
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList?.length > 0
          ? featureImageList?.map((item) => (
              <div className="">
                <img src={item.image} alt="image" className="" />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
