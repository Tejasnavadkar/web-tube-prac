// import { ComponentProps } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./Button"
import { useEffect, useRef, useState } from "react"


type CategoryProps = {
    categories:string[],
    selectedCategory:string,
    onSetCategory:(category:string)=> void


} 
        
function CategaoryPills({categories,selectedCategory,onSetCategory}:CategoryProps ){

    const[showLeftArrow,setShowLeftArrow] = useState(true)
    const[showRightArrow,setShowRightArrow] = useState(true)

    const containerRef = useRef<HTMLDivElement>(null)
   const totalTranslations = 200
    const [translate,setTranslate] = useState(0)
    console.log("translate",translate)

    // useEffect(()=>{
    //     if(containerRef.current == null) return

    //     console.log("translateeffect---",translate)
    //     const observer = new ResizeObserver((entries)=>{
    //         const container = entries[0]?.target
    //         if(container == null) return
    //         setShowLeftArrow(translate > 0)
    //         setShowRightArrow(translate + container.clientWidth < container.scrollWidth) // here agr displaywidth kam hai full width se to true
    //     })
    //     observer.observe(containerRef.current)

    //     return ()=> observer.disconnect()

    // },[translate,categories])


    //The useEffect code you proposed works perfectly fine in scenarios where the scroll position (translate) and the list of categories (categories) 
    //without resizeobserver() it use when container changes size dynamically without depending (translate) or (category) state

    useEffect(()=>{  
            if(containerRef.current == null) return 
        setShowLeftArrow(translate > 0)
        setShowRightArrow(translate + containerRef.current.clientWidth < containerRef.current.scrollWidth)

    },[translate,categories])

    return <>
    <div className="relative overflow-x-hidden " ref={containerRef}>
        <div className={`flex whitespace-nowrap gap-3 w-[max-content] `} style={{transform:`translateX(-${translate}px)`}}> 
            {categories.map((item)=>{ return <Button variant={`${selectedCategory == item ? "Dark": "default" }`} className={`py-1 px-3 rounded-lg whitespace-nowrap`} onClick={()=>onSetCategory(item)} >{item}</Button> })}
        </div>
        {showLeftArrow &&  <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-50% from-white to-transparent w-24 h-full ">
            <Button onClick={()=>{
                setTranslate((current)=>{
                    const newTranslate = current - totalTranslations
                    if(newTranslate <=0) return 0
                    return newTranslate
                 })
            }} variant={"ghost"} size={"icon"} className="h-full aspect-square w-auto">
            <ChevronLeft/>
            </Button>
        </div> }
       

        {showRightArrow && <div className="absolute flex justify-end right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l  from-white from-50% to-transparent w-24 h-full ">
            <Button onClick={()=>{
               setTranslate((current)=>{
                  if(containerRef.current == null) return current

                const newTranslate = current + totalTranslations;
                const fullwidth = containerRef.current?.scrollWidth
                const clientwidth = containerRef.current?.clientWidth
                if(newTranslate + clientwidth >= fullwidth) {
                    
                    return fullwidth - clientwidth
                }
                return newTranslate
               })
            }} variant={"ghost"} size={"icon"} className="h-full aspect-square w-auto">
            <ChevronRight/>
            </Button>
        </div>}
    </div>
    </>
}

export default CategaoryPills