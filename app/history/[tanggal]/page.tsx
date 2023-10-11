"use client";
import { Logging } from "@/components/colums";
import { firebase_DB } from "@/config/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    tanggal: string;
  };
}) {
  const [data, setData] = useState<Logging[]>();

  useEffect(() => {
    const Ref = collection(firebase_DB, "tabel");
    const filter = query(Ref, where("tanggal", "==", params.tanggal));
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
  });

  return (
    <div>
      {data?.map((log) => (
        <div key={log.id}>
          <p>No: {log.no}</p>
          <p>Waktu: {log.waktu}</p>
          <p>Intensitas Cahaya: {log.intensitasCahaya}</p>
          <p>Daya: {log.daya}</p>
          <p>Keterangan: {log.ket}</p>
        </div>
      ))}
    </div>
  );
}
