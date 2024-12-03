import { useState } from 'react'
import './App.css'
import PageHeader from './components/PageHeader'
import VideoGrid from './components/VideoGrid'
import CategaoryPills from './components/CategaoryPills'
import { categories,videos } from './Data'
import Sidebar from './components/Sidebar'
import {ContextProvider} from "../src/context/SideBarContext"

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <>
    <ContextProvider>
    <div className='flex max-h-screen max-w-full flex-col'>
      <PageHeader/>
      <div className='grid grid-cols-[auto,1fr] flex-grow-1'>
          <Sidebar/>
        <div className='overflow-x-hidden z-10 px-8 pb-4 '>
          <div className='sticky top-0 bg-white pb-4 '>
            <CategaoryPills categories={categories} selectedCategory={selectedCategory} onSetCategory={setSelectedCategory} />
          </div>

          <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
          {videos.map((elem)=> <VideoGrid key={elem.id} {...elem} />)}
          
          </div>
       
        </div>

      </div>

    </div>
    </ContextProvider>
   
    </>
  )
}

export default App
