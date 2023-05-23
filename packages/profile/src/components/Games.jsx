import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => {
  return (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow">
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h1 className="mt-2 text-lg text-white">{title}</h1>
        <p className="mt-2 text-sm md:w-9/12 text-white">{subtitle}</p>
      </div>
    </div>
  )
}

const Services = () => {
  return (

    


    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
    
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 p-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
        <div className="flex flex-col flex-1 justify-start items-center">
        <ServiceCard
          
          title={<h3 className='text-white text-3xl text-center my-2'>
              Game Stats
            </h3>}
          subtitle={ 
          <div className="relative max-w-lg p-8 justify-items-center border bg-black border-gray-100 shadow-xl rounded-xl">
          <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-purple-600 font-medium text-xs">
            
          </span>
    
          <div className="mt-4 text-gray-200 sm:pr-8 ">
           
    
            <h5 className="mt-4 text-xl font-bold text-gray-300">Stats become available when you play</h5>
    
            <p className="mt-2 text-sm">
              N/A
            </p>
          </div>
        </div>}
        />
        
      </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-start items-center">
        <ServiceCard
          
          title={<h3 className='text-white text-3xl text-center my-2'>
              Matches played 
            </h3>}
          subtitle=
          { 
          <div className="relative max-w-lg p-8 ml-20 justify-items-center border bg-black border-gray-100 shadow-xl rounded-xl">
          <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-purple-600 font-medium text-xs">
            
          </span>
    
          <div className="mt-4 text-gray-200 sm:pr-8 ">
            
            <h5 className="mt-4 text-xl font-bold text-gray-300">Matches become available when you play</h5>
    
            <p className="mt-2 text-sm">
              N/A
            </p>
          </div>
        </div>}
        />
        
      </div>
    </div>
  )
}

export default Services