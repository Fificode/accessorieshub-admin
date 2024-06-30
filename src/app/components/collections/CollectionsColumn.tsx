"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps {
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      })
     
      if(res.ok){
        setLoading(false);
        window.location.href = '/dashboard/collections';
        toast.success('Collection deleted')
      }
      else {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message || 'Something went wrong, Please try again.'}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, Please try again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-600 text-white hover:bg-gray-400">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-gray-400">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 text-white hover:bg-gray-400" onClick={onDelete}>
           Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <p>{row.original.title}</p>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id} />,
  },
];
