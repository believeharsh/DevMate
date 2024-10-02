import React, { useState, useEffect } from 'react';

const DigitalWatch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className=" bg-[#191919] flex justify-center items-center ">
      <div className="relative w-full  bg-white/5 backdrop-blur-lg  flex justify-around items-center shadow-lg transition duration-500 ease-in-out">
        <div className="flex">
          <div className="flex flex-col items-center m-4 p-5 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
            <p className="text-8xl text-white font-bold">{hours}</p>
          </div>
          <div className="flex flex-col items-center m-4 p-5 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
            <p className="text-8xl text-white font-bold">{minutes}</p>
          </div>
          <div className="flex flex-col items-center m-4 p-5 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
            <p className="text-8xl text-[#8ae3f9] font-bold">{seconds}</p>
          </div>
        </div>
        <div className="absolute top-[60px] right-4 text-3xl text-[#8ae3f9] font-bold">
          {ampm}
        </div>
   
      </div>

    </div>
  );
};

export default DigitalWatch;