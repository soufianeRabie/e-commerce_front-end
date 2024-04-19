import { DataTable } from '../DataTable.jsx'
import { useEffect, useState } from 'react'
import { DataTableColumnHeader } from '../DataTableColumnHeader.jsx'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CircleX, Trash2Icon } from 'lucide-react'
import { useAuth } from '../../../Context/GlobalState.jsx'
import { Link } from 'react-router-dom'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  Sheet,
  SheetTitle,
  SheetTrigger,
} from '../../ui/sheet.jsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog.jsx'
import ParentUpsertForm from '../../Form/OrderUpserForm.jsx'
import EditProduct from '../../Admin/Product/EditProduct.jsx'
import { ApiServices } from '../../../services/axiosServices.js'
import { Library } from '../../../Library/Library.jsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog.jsx'
import { UpdateOrderStatus } from '../../Form/UpdateOrderStatus.jsx'
export default function DeliveryList({ DeliveryId }) {
  const { dispatch, deliveries } = useAuth()
  const [data, setData] = useState([])

  console.log(deliveries)

  const AdminDeliveryColumns = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="N*commande" />
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="email" />
      },
    },
    {
      accessorKey: 'first_name',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="first name" />
      },
    },
    {
      accessorKey: 'last_name',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="last name" />
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="status" />
      },
    },
    {
      accessorKey: 'address',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="address" />
      },
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="phone" />
      },
    },
    {
      accessorKey: 'city',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="city" />
      },
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="amount" />
      },
    },

    // {
    //   accessorKey: 'quantity',
    //   header: ({ column }) => {
    //     return <DataTableColumnHeader column={column} title="quantity" />
    //   },
    // },

    // {
    //   accessorKey: 'formatted_updated_at',
    //   header: ({ column }) => {
    //     return <DataTableColumnHeader column={column} title="Updated at" />
    //   },
    //   cell: ({ row }) => {
    //     const date = row.getValue('formatted_updated_at')
    //     return <div className="text-right font-medium">{date}</div>
    //   },
    // },
    {
      id: 'actions',
      cell: ({ row }) => {
        const { id, email, status } = row.original
        const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
        return (
          <div className={'flex gap-x-1 '}>
            <Link to={`/admin/deliveries/${id}`}>
              <Button size={'sm'} variant={'destructive'}>
                details
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger>
                <Button size={'sm'} variant={''}>
                  update status
                </Button>
              </DialogTrigger>
              <DialogContent className={'w-full mx-auto'}>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    <span className={'text-lg text-red-600'}>
                      {' '}
                      This will permanently update status All orders of this
                      delivery
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <UpdateOrderStatus
                  id={id}
                  type={'delivery'}
                  currentStatus={status}
                />
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={'sm'} variant={'destructive'}>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure to delete
                    <span className={'font-bold'}>
                      {' '}
                      {/*{firstname} {lastname}*/}
                    </span>{' '}
                    ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className={'text-lg'}>
                      {' '}
                      This action cannot be undone.
                    </span>
                    <span className={'text-red-600 text-lg font-mono'}>
                      {' '}
                      This will permanently delete All orders of this delivery{' '}
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      const deletingLoader = toast.loading(
                        'Deleting in progress.',
                      )

                      try {
                        const response = await ApiServices.deleteDelivery(id)
                        toast.dismiss(deletingLoader)
                        if (response?.status === 200) {
                          dispatch({
                            type: 'DELETE_DELIVERY',
                            payload: {
                              id: id,
                            },
                          })
                          setData(data.filter((delivery) => delivery.id !== id))
                          toast.success('delivery deleted', {
                            description: `delivery deleted successfully`,
                            icon: <Trash2Icon />,
                          })
                        }
                      } catch (err) {
                        toast.dismiss(deletingLoader)
                        toast.success('delivery not deleted', {
                          description: `delivery was not deleted try again after a while`,
                          icon: <CircleX />,
                        })
                      }
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      },
    },
  ]
  useEffect(() => {
    if (DeliveryId) {
       setData(deliveries.filter((delivery) => delivery.id === DeliveryId))
    }else
    {
        setData(deliveries)
    }
  }, [deliveries])
  return (
    <>
      <DataTable
        columns={AdminDeliveryColumns}
        data={data}
        filterBy={'status'}
        messageFilter={'filter by status'}
      />
    </>
  )
}
