import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
    SheetClose
} from '../../components/ui/sheet'
import {FilterXIcon, Slice} from "lucide-react";
import Sidebar from "@/components/Sidebar/Sidebar.jsx";
import {HiAdjustments} from "react-icons/hi";
import {Button} from "../ui/button.jsx";

export const Shet = ({handleChangeCat , handleFilter}) => {

    return (
    <Sheet >
      <SheetTrigger className={"bg-blue-700 p-3 rounded-xl"}><HiAdjustments className={'inline-block  text-red-600'}/> filter </SheetTrigger>
      <SheetContent side={'bottom'}>
        <SheetHeader>
          <SheetTitle></SheetTitle>Filter as you like
          <SheetDescription>
            filter product by price and category
          </SheetDescription>
            <Sidebar  filter={handleFilter}/>
        </SheetHeader>

      </SheetContent>
    </Sheet>
  )
}
