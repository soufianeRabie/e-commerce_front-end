import { DataTable } from '../DataTable.jsx'
import { useEffect, useRef, useState } from 'react'
import { DataTableColumnHeader } from '../DataTableColumnHeader.jsx'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CheckIcon, CircleX, Trash2Icon } from 'lucide-react'
import { useAuth } from '../../../Context/GlobalState.jsx'
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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog.jsx'
import { UpdateOrderStatus } from '../../Form/UpdateOrderStatus.jsx'
import { useGetOrders } from '../../Hooks/useGetOrders.js'
import { Link } from 'react-router-dom'
import { Input } from '../../ui/input.jsx'
import { Textarea } from '../../ui/textarea.jsx'
export default function OrderList({ SpecifiqueOders: SpecifiqueOdersId }) {
  console.log('new')
  const { dispatch, orders, user } = useAuth()
  const [data, setData] = useState([])

  console.log(orders)

  const AdminProductColumns = [
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="email" />
      },
    },
    {
      accessorKey: 'user_id',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="user id" />
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="status" />
      },
    },
    {
      accessorKey: 'product.title',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="title" />
      },
    },
    {
      accessorKey: 'product.id',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="product id" />
      },
    },
    {
      accessorKey: 'product.price',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="price" />
      },
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="quantity" />
      },
    },
    {
      accessorKey: 'payment_method',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="payment method" />
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
        const { id, email, status, deliveriesId, product_id  , payment_method} = row.original

        const complaintRef = useRef()
        return (
          <>
            {user?.role ===
            parseInt(import.meta.env.VITE_APP_ADMIN_ROLE_NUMBER) ? (
              <div className={'flex gap-x-1 '}>
                <Link
                  className={`${deliveriesId === null && 'cursor-auto'}`}
                  to={`${deliveriesId ? `/admin/delivery/${deliveriesId}` : '#'}`}
                >
                  <Button
                    disabled={!deliveriesId}
                    size={'sm'}
                    variant={'destructive'}
                  >
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
                        This action if donne cannot be undone
                      </DialogDescription>
                    </DialogHeader>
                    <UpdateOrderStatus
                      currentStatus={status}
                      id={id}
                      type={'order'}
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
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
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
                            const response = await ApiServices.deleteOrder(id)
                            toast.dismiss(deletingLoader)
                            if (response?.status === 200) {
                              dispatch({
                                type: 'DELETE_ORDER',
                                payload: {
                                  id: id,
                                },
                              })
                              setData(data.filter((order) => order.id !== id))
                              toast.success('order deleted', {
                                description: `order deleted successfully`,
                                icon: <Trash2Icon />,
                              })
                            }
                          } catch (err) {
                            toast.dismiss(deletingLoader)
                            toast.success('order not deleted', {
                              description: `order was not deleted try again after a while`,
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
            ) : (
              <div>
                <Link className={'mr-1'} to={`/product/${product_id}`}>
                  <Button size={'sm'}>details</Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={'sm'} variant={'destructive'}>
                      make a complaint
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle></AlertDialogTitle>
                      <AlertDialogDescription>
                        <p className={'text-green-600 italic mb-1'}>
                          {' '}
                          we will show your complaint in while dont pass 3 days
                          and we will reply about that or we will call you by
                          one of your social tools make sure your email address
                          and phone number are correct
                        </p>
                        <Textarea
                          ref={complaintRef}
                          placeHolder={
                            'make your complaint with enough details'
                          }
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>cancel </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          const AddComplaintToast = toast.loading(
                            'making a complaint in progress...',
                          )
                          try {
                            const complaint = complaintRef.current?.value
                            const response = await ApiServices.makeComplaint({
                              user_id: user?.id,
                              message: complaint,
                              type: payment_method,
                              orderId: id,
                            })
                            if (response.status === 200) {
                              toast.success('complaint making successfully', {
                                description:
                                  'the complaint making successfully wait our reply in 3 days at maximum',
                                icon: <CheckIcon />,
                              })
                            } else {
                              throw new Error(
                                response?.error?.message ||
                                  'something went wrong',
                              )
                            }
                          } catch (error) {
                            toast.error('making complaint faild', {
                              description:
                                'the complaint dont making please check your connection and try again',
                              icon: <CircleX />,
                            })
                          } finally {
                            toast.dismiss(AddComplaintToast)
                          }
                        }}
                      >
                        send
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </>
        )
      },
    },
  ]
  useEffect(() => {
    if (!SpecifiqueOdersId) {
      setData(orders || [])
    } else {
      setData(
        orders.filter((order) => order?.deliveriesId === SpecifiqueOdersId),
      )
    }
  }, [orders])

  return (
    <>
      {orders?.length > 0 ? (
        <>
          <DataTable
            columns={AdminProductColumns}
            data={data}
            filterBy={'status'}
            messageFilter={'filter by status'}
          />
        </>
      ):
      <div className={'w-full'}>
      <h1 className={"text-3xl w-3/4 text-center mx-auto text-blue-500"}> you dont have any orders yet </h1>
      </div>}
    </>
  )
}
