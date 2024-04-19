'use client'

import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useRef } from 'react'
import { useAuth } from '../Context/GlobalState.jsx'


  // {
  //   title: 'Hover Card',
  //   href: '/docs/primitives/hover-card',
  //   description:
  //     'For sighted users to preview content available behind a link.',
  // },
  // {
  //   title: 'Progress',
  //   href: '/docs/primitives/progress',
  //   description:
  //     'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  // },
  // {
  //   title: 'Scroll-area',
  //   href: '/docs/primitives/scroll-area',
  //   description: 'Visually or semantically separates content.',
  // },
  // {
  //   title: 'Tabs',
  //   href: '/docs/primitives/tabs',
  //   description:
  //     'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  // },
  // {
  //   title: 'Tooltip',
  //   href: '/docs/primitives/tooltip',
  //   description:
  //     'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  // },
// ]

export function NavigationMenuDemo({components}) {
  const { user, dispatch, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout(navigate, dispatch)
    dispatch({
      type: 'EMPTY_BASKET',
      user: null,
    })
  }

  return (
    <NavigationMenu >
      <NavigationMenuList className={''}>
        <NavigationMenuItem  >
          <NavigationMenuTrigger className={'dark:text-white text-black'}>
            {user?.firstName || user?.email}
          </NavigationMenuTrigger >
          <NavigationMenuContent >
            <ul className="grid w-[300px] gap-3 p-4 md:grid-col ">
              {components.map((component , key) => (
                <ListItem key={key}
                  key={component.title}
                  title={component.title}
                  href={component.href}
                ></ListItem>
              ))}

              <div
                onClick={handleLogout}
                className={
                  ' cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                }
              >
                <button className={'text-sm font-medium leading-none'}>
                  Logout
                </button>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = ({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={`${props?.href}`}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
ListItem.displayName = 'ListItem'
