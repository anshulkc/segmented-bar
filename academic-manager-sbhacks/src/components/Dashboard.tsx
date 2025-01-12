'use client'
import React from 'react'
// import Link from 'next/link'
import FileUpload from './FileUpload'
import Calendar from 'react-calendar'
// import './globals.css'
import { Circle } from 'rc-progress';
import FetchPhotosButton from './FetchPhotosButton';

function Dashboard() {
let percent = 100;
  return (
    <div className='flex flex-col gap-4 w-full'>
        <div className='flex justify-center w-full'>
            <div className='flex flex-col border border-gray-600 rounded-md w-full p-5 gap-10'>
                <p className='text-3xl'>Dashboard</p>
                <FileUpload/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard