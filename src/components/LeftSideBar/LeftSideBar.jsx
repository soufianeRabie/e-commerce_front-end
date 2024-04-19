import { cn } from '@/lib/utils'
import { Button } from '../ui/button.jsx'
import {
  ContactIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
} from 'lucide-react'
import { GlobalColorTailwand } from '../../Library/Library.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { SheetClose } from '../ui/sheet.jsx'
import { UserNavigationMenu } from '../../Library/NavigationMenu.jsx'

export function LeftSideBar({ className, user, handleLogout }) {
  const navigate = useNavigate()
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1 ">
            {user ? (
              <SheetClose className={'w-full'}>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <LogOutIcon />
                  <span className={'px-2 '}>
                    {' '}
                    <SheetClose>logout</SheetClose>{' '}
                  </span>
                </Button>
              </SheetClose>
            ) : (
              <SheetClose className={'w-full'}>
                <Button
                  onClick={() => navigate('/login')}
                  variant={'ghost'}
                  className="w-full justify-start"
                >
                  <LogInIcon />

                  <span className={'px-2'}> Login </span>
                </Button>
              </SheetClose>
            )}

            <SheetClose className={'w-full'}>
              {UserNavigationMenu.map((nav) => {
                return (
                  <Button
                    onClick={() => navigate(nav?.href)}
                    variant="ghost"
                    className="w-full justify-start my-2"
                  >
                    {nav?.icon}
                    <span className="px-2">{nav?.title}</span>
                  </Button>
                )
              })}
            </SheetClose>
          </div>
        </div>
      </div>
    </div>
  )
}
