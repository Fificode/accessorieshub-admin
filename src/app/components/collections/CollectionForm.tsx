"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "../custom-ui/ImageUpload";
import Delete from "../custom-ui/Delete";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
});

interface CollectionFormProps {
  initialData?: CollectionType | null;
}
interface DeleteProps {
  id: string;
}

const CollectionForm: React.FC<CollectionFormProps> = ({initialData}) => {
  const router = useRouter();
const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: "",
    },
  });

 const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
  if(e.key === "Enter"){
    e.preventDefault();
  }
 }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   try {
setLoading(true);
const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections";
const res = await fetch(url,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }
)

if(res.ok){
  setLoading(false);
  toast.success(`Collection created ${initialData ? "updated" : "created"}`);
  window.location.href = "/dashboard/collections";
router.push("/dashboard/collections");
}
   }
   catch(err){
console.log("[collections_POST]", err);
toast.error("Something went wrong, Please try again");
   }
  };
 
  return (
    <div className="p-10 min-h-screen ">
      {initialData ? (
        <div className="flex items-center justify-between">
        <p className="text-[20px] font-[600]">Edit Collection</p>
        <Delete id={initialData._id}/>
        </div>
        ) : (<p className="text-[20px] font-[600]">Create Collection</p>)}
      <Separator className="mt-4 mb-7 bg-[#C2C2C2]" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} onKeyDown={handleKeyPress}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} rows={5} onKeyDown={handleKeyPress}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
          <Button type="submit" className="bg-[#64330D] text-white text-[16px] leading-[11px] rounded-[5px] hover:bg-[#303030]">Submit</Button>
          <Button type="button" className="bg-[#64330D] text-white text-[16px] leading-[11px] rounded-[5px] hover:bg-[#303030]" onClick={() => router.push("/collections")}>Discard</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
