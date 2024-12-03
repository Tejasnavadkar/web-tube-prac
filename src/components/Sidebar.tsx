import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react"
import { Button } from "./Button"
import React, { ElementType, ReactNode,Children as child, useState } from "react"
import { buttonStyles } from "./Button"
import { twMerge } from "tailwind-merge"
import {playlists,subscriptions} from "../Data"
import { useSideBarContext } from "../context/SideBarContext"



function Sidebar(){

     const{isSmallScreenOpen,isLargeScreenOpen} = useSideBarContext()

    return <>
    <aside className={`ml-1 flex flex-col sticky top-0 overflow-y-auto ${isLargeScreenOpen ? "lg:hidden": "lg:flex"}`}>
       <SmallSidebar Icon={Home} title={"Home"} Url={""} />
       <SmallSidebar  Icon={Repeat} title={"Repeat"}  Url={""}/>
       <SmallSidebar  Icon={Clapperboard} title={"Clapperboard"}  Url={""}/>
       <SmallSidebar  Icon={Library} title={"Library"}  Url={""}/>    
    </aside>

    <aside className={`lg:sticky absolute top-0 w-56 overflow-y-auto border border-red-950  bg-white max-h-screen flex-col gap-2 ${isLargeScreenOpen ? "lg:block " : "lg:hidden"} ${isSmallScreenOpen ? "flex z-[999] bg-white" : "hidden"} `}>
        <LargeSideBarSection visibleItemCount = {1}>
            <LargeSideBarItems isActive = {true} Icon={Home} title="Home" Url={""} />
            <LargeSideBarItems isActive = {false} Icon={Clapperboard} title={"Subscription"} Url={""} />       
        </LargeSideBarSection>
        <hr/>

        <LargeSideBarSection visibleItemCount={5}>
            <LargeSideBarItems isActive = {false} Icon={Library} title="Library" Url={""} />
            <LargeSideBarItems isActive = {false} Icon={History} title={"History"} Url={""} />       
            <LargeSideBarItems isActive = {false} Icon={PlaySquare} title={"Your Videos"} Url={""} />
            <LargeSideBarItems isActive = {false} Icon={Clock} title={"Watch Later"} Url={""} /> 
            {playlists.map((item)=>(<LargeSideBarItems Icon={ListVideo} title={item.name} key={item.id} />))}      
        </LargeSideBarSection>
        <hr/>
        
        <LargeSideBarSection>

            {subscriptions.map((item)=> (<LargeSideBarItems Icon={item.imgUrl} title={item.channelName} key={item.id} Url="" />))}
                  
        </LargeSideBarSection>
        <hr/>

        <LargeSideBarSection title="Explore">
          <LargeSideBarItems
            Icon={Flame}
            title="Trending"
            Url="/trending"
          />
          <LargeSideBarItems
            Icon={ShoppingBag}
            title="Shopping"
            Url="/shopping"
          />
          <LargeSideBarItems Icon={Music2} title="Music" url="/music" />
          <LargeSideBarItems
            Icon={Film}
            title="Movies & TV"
            Url="/movies-tv"
          />
          <LargeSideBarItems Icon={Radio} title="Live" url="/live" />
          <LargeSideBarItems
            Icon={Gamepad2}
            title="Gaming"
            Url="/gaming"
          />
          <LargeSideBarItems Icon={Newspaper} title="News" url="/news" />
          <LargeSideBarItems
            Icon={Trophy}
            title="Sports"
            Url="/sports"
          />
          <LargeSideBarItems
            Icon={Lightbulb}
            title="Learning"
            Url="/learning"
          />
          <LargeSideBarItems
            Icon={Shirt}
            title="Fashion & Beauty"
            Url="/fashion-beauty"
          />
          <LargeSideBarItems
            Icon={Podcast}
            title="Podcasts"
            Url="/podcasts"
          />
        </LargeSideBarSection>

    </aside>
    
    </>
}

export default Sidebar

type SmallSidebarProps = {
    Icon:ElementType,
    title:string,
    Url:string
}

 function SmallSidebar({Icon,title,Url}:SmallSidebarProps){

    return <>
    <a href={Url} className={twMerge(buttonStyles({variant:"ghost"}),"py-2 px-1 flex flex-col items-center gap-1")}>
        <Icon className="w-6 h-6"/>
        <div className="text-sm">
            {title}
        </div>
    </a>


    </>
 }

 type LargeSideBarSectionProps={
    children:ReactNode,
    title?:string,
    visibleItemCount?:number
 }

 function LargeSideBarSection({children,title,visibleItemCount = Number.POSITIVE_INFINITY}:LargeSideBarSectionProps){
    const [isExpanded,setIsExpanded] = useState(false)
    console.log("positive infinity",visibleItemCount)
    console.log("children--",children)
    const Allchildren = child.toArray(children).flat()
    const visibleChildren = isExpanded ? Allchildren : Allchildren.slice(0,visibleItemCount)
    const showExpandbleButton = Allchildren.length > visibleItemCount
    const buttonIcon = isExpanded ? ChevronUp : ChevronDown




    return <div>
        {visibleChildren}
        {showExpandbleButton && <Button variant={"ghost"} onClick={()=>{setIsExpanded(e=>!e)}} className="flex gap-2 w-full" >
           <span> {React.createElement(buttonIcon)} </span>
           <span>{isExpanded ? "Show Less" : "Show More"}</span> 
        </Button>}

    </div>
 }


 type LargeSideBarItemsProp = {
    Icon:ElementType | string,
    title:string,
    Url:string,
    isActive:boolean
 }



 function LargeSideBarItems({Icon,title,Url,isActive=false}:LargeSideBarItemsProp){

    return <>
    
    <a href={Url} className={twMerge(buttonStyles({variant:"ghost"}),`flex gap-2 w-full items-center ${isActive ? " font-bold bg-neutral-100 hover:bg-secondary-Default " : undefined} `)}>
       { typeof Icon == "string" ? <img src={Icon} className = "w-6 h-6 rounded-full"  alt="" />  : <Icon className="w-6 h-6/"/>}
        <div>{title}</div>

    </a>

    </>

 }