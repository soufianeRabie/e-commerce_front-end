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

export const LeftSide = ({ name, user, handleLogout, className }) => {
  return (
    <Sheet>
      <SheetTrigger className={''}>{name}</SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
            <SheetTitle> <span className={'my-10 block'}>SR.KING👑</span></SheetTitle>

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
