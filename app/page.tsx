"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BatteryCharging,
  CalendarDays,
  Sun,
  CalendarClock,
} from "lucide-react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firebase_DB } from "@/config/FirebaseConfig";
import { DataTable } from "@/components/data-table";
import { Logging, columns } from "@/components/colums";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data, setData] = useState<Logging[]>();
  const [monitoring, setMonitoring] = useState<any>();
  const [tanggal, setTanggal] = useState<any>();
  const [time, setTime] = useState<any>();

  useEffect(() => {
    const Ref = collection(firebase_DB, "tabel");
    const filter = query(Ref, where("tanggal", "==", "8-10-2023"));
    const subs = onSnapshot(filter, (snapshot) => {
      const data: Logging[] = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          no: docData.no,
          waktu: docData.waktu,
          intensitasCahaya: docData.intensitasCahaya,
          daya: docData.daya,
          ket: docData.ket,
          id: doc.id,
        };
      });
      setData(data);
      console.log(data);
    });

    const Ref2 = collection(firebase_DB, "monitoring");
    const docs = doc(Ref2, "1");
    const subs2 = onSnapshot(docs, (snapshot) => {
      const data = snapshot.data();
      setMonitoring(data);
    });

    //time
    const interval = setInterval(() => {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const day = time.getDate();
      const month = time.getMonth();
      const year = time.getFullYear();

      const formatTime = `${hours}:${minutes}:${seconds}`;
      const formatDate = `${day}-${month}-${year}`;
      setTanggal(formatDate);
      setTime(formatTime);
    }, 1000);

    return () => {
      subs();
      subs2();
    };
  }, []);

  return (
    <>
      <div className="mx-auto py-auto">
        <div className="flex justify-between p-20  py-10 pb-5 items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              SOLAR PANEL MONITORING
            </h2>
            <p className="text-muted-foreground">
              Power Absorption and Maintenance
            </p>
            <p></p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CalendarDays width={30} height={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-center">
                Calendar
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 w-[80%] mx-auto pb-4 pt-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Date / Time</CardTitle>
              <CalendarClock />
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              <p className="border-b">{date?.toDateString()}</p>
              <p>{time}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Light Intensity
              </CardTitle>
              <Sun />
            </CardHeader>
            <CardContent className="text-4xl font-bold">
              {monitoring?.intensitasCahaya}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Power</CardTitle>
              <BatteryCharging />
            </CardHeader>
            <CardContent className="text-4xl font-bold">
              {monitoring?.daya}
            </CardContent>
          </Card>
        </div>
        <div className="w-[80%] mx-auto border-solid border-2 rounded-md">
          {/* <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20px] text-center border-r">
                  NO
                </TableHead>
                <TableHead className="w-[200px] text-center border-r">
                  Time
                </TableHead>
                <TableHead className="w-[250px] text-center border-r">
                  Light Intensity
                </TableHead>
                <TableHead className="w-[250px] text-center border-r">
                  Power
                </TableHead>
                <TableHead className="text-center">Information</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((data: any) => (
                <TableRow key={data.id}>
                  <TableCell className="text-center border-r">
                    {data.no}
                  </TableCell>
                  <TableCell className="text-center border-r">
                    {data.waktu}
                  </TableCell>
                  <TableCell className="text-center border-r">
                    {data.intensitasCahaya}
                  </TableCell>
                  <TableCell className="text-center border-r">
                    {data.daya}
                  </TableCell>
                  <TableCell className="text-center">{data.ket}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <DataTable columns={columns} data={data || []} />
        </div>
      </div>
    </>
  );
}
