import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div className="relative w-[200px] h-[200px]" key={index}>
            <div className="absolute top-0 right-0 z-10">
              <Button onClick={() => onRemove(url)} size="sm" className="bg-[#E5E5E5] rounded-[20px] m-2 hover:bg-red-500">
                <Trash className="h-4 w-4"/>
              </Button>
            </div>
            <Image
              src={url}
              alt="collections"
              className="object-cover rounded-[10px]"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="xakxhrxk" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              onClick={() => open()}
              className="bg-[#303030] text-white hover:bg-black ml-[10px] rounded-[5px]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
