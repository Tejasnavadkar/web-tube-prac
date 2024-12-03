import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type contextProviderProps={
    children:ReactNode
}
type createCntextProps = {
    isSmallScreenOpen:boolean,
    isLargeScreenOpen:boolean,
    toggle:()=> void,
    close:()=>void
}


    
   const context = createContext<createCntextProps | null>(null)

   export function useSideBarContext(){
     const value = useContext(context)
     if(value == null) throw Error("cant use outside of SidebarContextProvider")
        return value
}

 export  const ContextProvider = ({children}:contextProviderProps) =>{

    const [isSmallScreenOpen,setSmallScreenOpen] = useState(false)
    const [isLargeScreenOpen,setLargeScreenOpen] = useState(true)

    useEffect(()=>{
        const helper = () =>{   // when small screen side hide
            if(!isScreenSmall()){
                setSmallScreenOpen(false)
            }
        }
        window.addEventListener("resize",helper)
        console.log("insideuseEffect----resize")

        return ()=> window.removeEventListener("resize",helper)
    },[])

    function isScreenSmall(){
        return window.innerWidth < 1024
    }

    const toggle = () =>{
        if(isScreenSmall()){
            setSmallScreenOpen(e=>!e)
        }else{
            setLargeScreenOpen(e=>!e)
        }
    }

    const close = () =>{
          if(isScreenSmall()){
            setSmallScreenOpen(false)
        }else{
            setLargeScreenOpen(false)
        }

    }

    return <context.Provider value={{
        isSmallScreenOpen,
        isLargeScreenOpen,
        toggle,
        close
    }}>
        {children}
    </context.Provider>
   }

