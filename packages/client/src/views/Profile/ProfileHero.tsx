import { useState } from 'react'

export default function HeroSection8() {
  const data = [
    {
      title: 'STATS ',
      data: 'Your game stats will display here once you start playing',
    },
    {
      title: 'MATCHES ',
      data: 'Matches played will display here once you start playing',
    },
  ]
  const [tab, setTab] = useState(data[0].title)

  const filterdata = data.filter((e) => e.title === tab)
  const active = filterdata[0].title

  return (
  
    
      <><div className=" mt-6 mr-4 items-center mt-50 flex justify-around relative flex-wrap px-5">

      <div className="max-w-xl relative">
        <h1 className="font-semibold text-6xl max-w-md text-left uppercase">
          WELCOME <span>TO YOUR</span>  PROFILE
        </h1>
        <p className="font-bold text-left">
        Here, you can do all the cool stuff from viewing your user card,  playable games, stats to atcually creating your game world in AR ! 
        </p>

      </div>
      <div className=" mt-6 w-80 h-60  rounded-xl">
        <div className="relative block group  ">
          <span className="absolute inset-0 border-2 border-white border-dashed rounded-lg"></span>
          <div className="transition border-2 border-white rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2"style={{
            
              
            backdropFilter: 'saturate(180%) blur(30px)',
            background: ' linear-gradient(to right, rgb(192, 38, 211), rgb(219, 39, 119))',
          }}>
            <div className="p-6 ">
              <p className="mt-4 text-lg font-bold text-white">USER CARD</p>
              <p className="mt-1 text-white text-medium">🎴</p>
            </div>
          </div>
        </div>
      </div>
    </div>
                  
    {/* Game selection section starts */}

    <h3 className=' font-bold text-3xl text-center '>
           Choose a game and start playing !
            </h3>
    {/* TIC TAC TOE */}
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
          <div className="grid gap-5 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
            
    <div className="relative block group  ">
      <span className="absolute inset-0 "></span>
      <div className="transition rounded-lg group-hover:-translate-x-0 group-hover:-translate-y-3">
          <div className="p-5  sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism ">
    <div className="flex flex-col rounded-xl  p-4"
          style={{
            border: ' solid white',
              
            backdropFilter: 'saturate(180%) blur(30px)',
            background: ' #ffffff0d',
          }}
        >
      <img
              src="/src/assets/Tic Tac Toe.png"
              alt="nft-gif"
              width="250"
              height="250"
              className="rounded-xl"
            />

        <div className="h-[1px] w-full bg-white  my-2" />

        
        <button className="text-white relative z-0 rounded-full bg-purple-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded-full after:bg-purple-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
          PLAY
        </button>
        
        </div>
       </div>
      </div>
    </div>
    {/* CHESS */}
        <div className="relative block group  ">
          <span className="absolute inset-0 "></span>
          <div className="transition rounded-lg group-hover:-translate-x-0 group-hover:-translate-y-3">
        <div className="p-5  sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
    <div className="flex flex-col rounded-xl  p-4"
          style={{
            border: 'solid white',
    
            backdropFilter: 'saturate(180%) blur(14px)',
            background: ' #ffffff0d',
          }}
        >
      <img
              src="/src/assets/Chess.png"
              alt="nft-gif"
              width="250"
              height="250"
              className="rounded-xl"
            />

        <div className="h-[1px] w-full bg-white  my-2" />

        
        <button className="text-white relative z-0 rounded-full bg-purple-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded-full after:bg-purple-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
          PLAY
    </button>
        
      </div>
        </div>
        </div>
        </div>
         {/* CHECKERS*/}
        <div className="relative block group  ">
          <span className="absolute inset-0 "></span>
          <div className="transition rounded-lg group-hover:-translate-x-0 group-hover:-translate-y-3">
        <div className="p-5  sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
    <div className="flex flex-col rounded-xl  p-4"
          style={{
            border: 'solid white',
    
            backdropFilter: 'saturate(180%) blur(14px)',
            background: ' #ffffff0d',
          }}
        >
      <img
              src="/src/assets/Checkers.png"
              alt="nft-gif"
              width="250"
              height="250"
              className="rounded-xl"
            />

        <div className="h-[1px] w-full bg-white my-2" />

        
        <button className="text-white relative z-0 rounded-full bg-purple-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded-full after:bg-purple-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
          PLAY
    </button>
        
      </div>
    </div>
  </div>
</div>
        
         {/* PLAY IN AR */}
        <div className="relative block group  ">
          <span className="absolute inset-0 "></span>
          <div className="transition rounded-lg group-hover:-translate-x-0 group-hover:-translate-y-3">
        <div className="p-5  sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
    <div className="flex flex-col rounded-xl  p-4"
          style={{
            border: 'solid white',
    
            backdropFilter: 'saturate(180%) blur(14px)',
            background: ' #ffffff0d',
          }}
        >
      <img
              src="/src/assets/AR.png"
              alt="nft-gif"
              width="250"
              height="250"
              className="rounded-xl"
            />

        <div className="h-[1px] w-full bg-white  my-2" />

        
        <button className="text-white relative z-0 rounded-full bg-purple-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded-full after:bg-purple-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
          PLAY
    </button>
        
       </div>
     </div>
    </div>
   </div>
 
 </div>
</div>

        {/*Game stats & Active Matches Section starts */}
        
        <div className="container flex justify-between ml-10 h-16 mx-auto">
        <div className=" h-60 bg-white max-w-xs mx-2 sm:w-[20rem] rounded-xl">
      <div className="px-10 flex justify-between">
        {data.map((n, index) => {
          return (
            <button
              onClick={() => setTab(n.title)}
              className={`${
                active === n.title
                  ? 'text-black font-bold border-b-purple-800 border-b-2 transition-all  duration-200 ease-in-out'
                  : ''
              } w-[110px] py-2 `}
              key={index}
            >
              {n.title}
            </button>
          )
        })}
      </div>

      <div className="pt-4 px-4">
        {filterdata.map((n, index) => {
          return <div key={index}>{n.data}</div>
        })}
      </div>
    </div>

    <div className="h-60 bg-white max-w-xs mx-2 sm:w-[20rem] rounded-xl">
     
    <div className="text-center ">
              <p className="mt-3 text-lg font-medium text-black">DEVELOP 🛠</p>
              <p className="mt-1 text-xs">Create your own games</p>
            </div>

            <div className="flex items-center justify-center mt-10  mx-auto ">
            <button className="flex items-center justify-center relative  group ">
          <span className="absolute inset-0  bg-purple-500  rounded-lg"></span>
          <div className="transition bg-black relative border-2 rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-2 ">
              <p className="text-xl  text-white font-bold ">START BUILDING🚀</p>
            </div>
          </div>
        </button>
        </div>
       
      
    </div>

    </div>
    <section></section>
      </>
   
  )
}

{/*Miscellaneous Game selection card */}

{/*<div className="p-5  sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
    <div className="flex flex-col rounded-xl  p-4"
          style={{
            border: '0.88px solid',
    
            backdropFilter: 'saturate(180%) blur(14px)',
            background: ' #ffffff0d',
          }}
        >
      <img
              src="/images/Chess.png"
              alt="nft-gif"=
              width="250"
              height="250"
              className="rounded-xl"
            />

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        
          <button
            type="button"
            
            className="text-black w-full mt-2 p-2 border-[1px] border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
          >
            PLAY
          </button>
        
      </div>
        </div>*/}