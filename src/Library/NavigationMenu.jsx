import { ContactIcon, ListOrderedIcon } from 'lucide-react'

export const UserNavigationMenu = [
  {
    title: 'complete orders',
    href: '/orders',
    icon: <ListOrderedIcon />,
  },
  {
    title: 'All orders',
    href: '/orders/complete',
    icon: <ListOrderedIcon />,
  },
  // {
  //   title: 'All orders',
  //   href: '/orders/complete',
  //   icon: <ContactIcon />,
  // },
]
export const AdminNavigationMenu = [
  {
    title: 'orders',
    href: '/admin/orders',
  },
  {
    title: 'products',
    href: '/admin/products',
  },
  {
    title: 'Add Product',
    href: '/addProduct',
  },
  {
    title: 'deliveries',
    href: '/admin/deliveries',
  },
  {
    title: 'complaints',
    href: '/admin/complaints',
  },
]
