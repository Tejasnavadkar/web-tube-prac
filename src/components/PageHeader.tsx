import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react"
import logo from "../assets/Logo.png"
import { Button } from "./Button"
import { useState } from "react"
import { useSideBarContext } from "../context/SideBarContext"


function PageHeader(){

    const {toggle} = useSideBarContext()

    const [showSearchBar,setShowSearchBar] = useState(false)
    return<>
    <div className="flex justify-between gap-10 px-6 mt-4 mb-6 w-full">
      <div className={`flex gap-2 items-center ${showSearchBar ? "hidden": "flex"} `}>
        <Button variant={"ghost"} size={"icon"}>
        <Menu onClick={toggle} />
        </Button>
       <a href="/">
       <img className="h-6" src={logo} alt="" />
       </a>
      </div>

      <form className={`md:flex  gap-4 flex-grow justify-center items-center ${showSearchBar ? "flex" : "hidden md:flex"}`}>
      
      {showSearchBar && (
        <div>
            <Button onClick={() =>setShowSearchBar(false)} variant={"ghost"} size={"icon"}>
                <ArrowLeft/>
            </Button>
        </div>
      )}

      <div className="flex flex-grow max-w-[600px] items-center   ">
         <input type="text" placeholder="Search.." className="w-full rounded-l-full py-2 px-4 border border-secondary-border shadow-inner shadow-secondary-Default" />
         <Button className=" px-4 py-2 rounded-r-full border border-secondary-border" >
            <Search/>
         </Button>
         </div>
         <Button size={"icon"}>
            <Mic/>
         </Button>
      </form>

      <div className={`flex flex-shrink-0 gap-2 ${showSearchBar ? "hidden" : "flex" }`}>
      <Button onClick={()=>{setShowSearchBar(true)}} variant={"ghost"} size={"icon"} className="md:hidden">
                <Search/>
            </Button>
            <Button variant={"ghost"} size={"icon"} className="md:hidden">
                <Mic/>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
                <Upload/>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
                <Bell/>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
                <User/>
            </Button>
      </div>
    </div>
    </>

}

export default PageHeader