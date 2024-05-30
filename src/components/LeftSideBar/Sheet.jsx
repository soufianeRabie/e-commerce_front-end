import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '../../components/ui/sheet'
import { LeftSideBar } from './LeftSideBar.jsx'

import logo from "../../assets/images/logo.png"

export const LeftSide = ({ name, user, handleLogout, className }) => {
  return (
    <Sheet>
      <SheetTrigger className={''}>{name}</SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
            <SheetTitle > <div style={{display:"flex",justifyContent:'center'}}><img  src={logo}  style={{width:"130px",height:"130px"}}/></div></SheetTitle>

            <SheetDescription>
                welcome we hope you be great today
            </SheetDescription>
          <LeftSideBar
            user={user}
            handleLogout={handleLogout}
            className={className}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
