import ProductImageUpload from "@/components/admin/ImageUpload";
import ProductTile from "@/components/admin/Product-tile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, getAllProduct } from "@/store/admin/product";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const Products = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle form submission
    dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
      (data) => {
        console.log(data);
        if (data?.payload?.success) {
          setImageFile(null);
          dispatch(getAllProduct());
          setFormData(initialFormData);
          setOpenCreateProductDialog(false);
          toast.success("Product added Successfully");
        }
      }
    );
  };
  const handleDelete = () => {};
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  console.log("list", productList);

  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <ProductTile
                setFormData={setFormData}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => setOpenCreateProductDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl max-auto text-center mb-3">
              Add New Product
            </SheetTitle>
          </SheetHeader>

          {/* image upload component */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            setUploadedImageUrl={setUploadedImageUrl}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText="Add"
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Products;
