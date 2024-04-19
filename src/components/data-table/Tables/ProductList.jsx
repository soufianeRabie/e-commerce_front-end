import { DataTable } from '../DataTable.jsx'
import { useEffect, useState } from 'react'
import { DataTableColumnHeader } from '../DataTableColumnHeader.jsx'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
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
export default function ProductList() {
  const { products, dispatch } = useAuth()
  const [data, setData] = useState([products])

  const AdminProductColumns = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="#ID" />
      },
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="title" />
      },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="description" />
      },
    },
    {
      accessorKey: 'category',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="category" />
      },
    },
    {
      accessorKey: 'rating',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="rating" />
      },
    },
    {
      accessorKey: 'price',
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
        const { id, firstname, lastname } = row.original
        const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
        return (
          <div className={'flex gap-x-1 '}>
            <Sheet
              className={'overflow-auto'}
              open={openUpdateDialog}
              onOpenChange={setOpenUpdateDialog}
            >
              <SheetTrigger>
                <Button size={'sm'}>Update</Button>
              </SheetTrigger>
              <SheetContent className={'overflow-auto'}>
                <SheetHeader>
                  <SheetTitle>
                    Update parent {firstname} {lastname}
                  </SheetTitle>
                  <SheetDescription>
                    Make changes to your parent here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetHeader>
                <EditProduct values={row.original} />
              </SheetContent>
            </Sheet>
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
                      {firstname} {lastname}
                    </span>{' '}
                    ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      const deletingLoader = toast.loading(
                        'Deleting in progress.',
                      )

                      const response = await ApiServices.deleteProduct(id)
                      toast.dismiss(deletingLoader)
                      if (response?.status === 200) {
                        dispatch({
                          type: 'DELETE_PRODUCT',
                          payload: {
                            id: id,
                          },
                        })
                        setData(data.filter((product) => product.id !== id))
                        toast.success('product deleted', {
                          description: `product deleted successfully`,
                          icon: <Trash2Icon />,
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
    console.log(products)
    setData(products)
  }, [products])
  return (
    <>
      <DataTable
        columns={AdminProductColumns}
        data={products}
        filterBy={'description'}
        messageFilter={'filter by description'}
      />
    </>
  )
}
