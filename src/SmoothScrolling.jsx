import React from 'react'

const Sections = () => {
    return (
        <>
            <div className="flex flex-col w-full h-1/2">
                <div className="bg-black text-white font-bold text-2xl ">First</div>
                <div className="bg-black text-white font-bold text-2xl ">Second</div>
                <div className="bg-black text-white font-bold text-2xl ">third</div>
                <div className="bg-black text-white font-bold text-2xl ">Fourth</div>
            </div>
        </>
    )
}

const Header = () => {
    return (
        <>
            <Header className="bg-slate-900 text-white font-thin flex justify-between items-center px-10 py-2">
             <p>First </p>
             <p>Second</p>
             <p>Third</p>
             <p>Fourth</p>
            </Header>
        </>
    )
}

const SmoothScrolling = () => {
  return (
    <div>
      <Header/>
      <Sections/>
    </div>
  )
}

export default SmoothScrolling
