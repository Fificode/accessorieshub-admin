import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Image from 'next/image';



interface ImageUploadProps {
value: string[];
onChange: (value: string) => void;
onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onChange, onRemove, value}) => {

const onUpload = (result: any) => {
    onChange(result.info.secure_url)
}

  return (
    <div>
        <div className='mb-4 flex flex-wrap items-center gap-4'>
            {value.map((url, index) => (
                <Image src={url} key={index} alt="collections" className='object-cover rounded-lg' width={200} height={200}/>
            ))}
        </div>
        <CldUploadWidget uploadPreset="xakxhrxk" onUploadAdded={onUpload}>
  {({ open }) => {
    return (
      <Button onClick={() => open()} className='bg-[#303030] text-white hover:bg-black ml-[10px] rounded-[5px]'>
        <Plus className='w-4 h-4 mr-2'/>
        Upload an Image
      </Button>
    );
  }}
</CldUploadWidget>
</div>
  )
}

export default ImageUpload