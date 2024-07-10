"use client";
import React from "react";
import Link from 'next/link'
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (<Link href={`/dashboard/collections/${row.original._id}`} className="hover:text-red-500"><p>{row.original.title}</p></Link>),
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
