"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

export type Logging = {
  id: string;
  no: number;
  waktu: string;
  intensitasCahaya: number;
  daya: number;
  ket: string;
};

// export const Data: Logging[] = [
//   {
//     no: 1,
//     waktu: "2021-10-10 10:10:10",
//     intensitasCahaya: 100,
//     daya: 100,
//     ket: "Normal",
//   },
//   {
//     no: 1,
//     waktu: "2021-10-10 10:10:10",
//     intensitasCahaya: 100,
//     daya: 100,
//     ket: "Normal",
//   },
//   {
//     no: 1,
//     waktu: "2021-10-10 10:10:10",
//     intensitasCahaya: 100,
//     daya: 100,
//     ket: "Normal",
//   },
//   {
//     no: 1,
//     waktu: "2021-10-10 10:10:10",
//     intensitasCahaya: 100,
//     daya: 100,
//     ket: "Normal",
//   },
// ];

export const columns: ColumnDef<Logging>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "waktu",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "intensitasCahaya",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Light Intensity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "daya",
    header: "Power",
  },
  {
    accessorKey: "ket",
    header: "Information",
  },
];
