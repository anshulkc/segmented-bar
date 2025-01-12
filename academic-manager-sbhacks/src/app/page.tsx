'use client'
import { useState } from 'react';
import Link from 'next/link';
import DemoApp from "@/components/Calendar";
import CalendarComponent from "@/components/EventCalendar";
import FetchPhotosButton from "@/components/FetchPhotosButton";
import FileUpload from "@/components/FileUpload";
import FetchCalendarButton from "@/components/FetchCalendarButton";
import Image from "next/image";
import PhotoAnalysis from '@/components/PhotoAnalysis';
import {useRouter} from 'next/navigation';
import Calendar from '@/components/Calendar';
import Dashboard from '@/components/Dashboard';
import SignUp from '@/components/SignUp';

export default function Home() {
  const [showPhotoAnalysis, setShowPhotoAnalysis] = useState(false);

  const togglePhotoAnalysis = () => {
    setShowPhotoAnalysis(prevState => !prevState);
  };

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      <main className="flex flex-col gap-6 justify-center items-center w-full pt-2">
        <Image
          className=""
          src="/logo-transparent-png-removebg-preview.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="w-full max-w-[1800px] mx-auto px-10">
          <Dashboard/>
        </div>
        <div className="flex justify-center w-full">
          <button onClick={togglePhotoAnalysis} className="bg-blue-500 text-white px-4 py-2 rounded flex justify-center">
            {showPhotoAnalysis ? 'Show Less' : 'Show More'}
          </button>
        </div>
        {showPhotoAnalysis && <PhotoAnalysis />}
        <div className="flex justify-center w-full">
          <FetchCalendarButton/>
        </div>
        {/* <SignUp/> */}
      </main>
    </div>
  );
}
