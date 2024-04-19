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

import { ApiServices } from '../../../services/axiosServices.js'


export default function ComplaintsList() {
  const { dispatch, complaints } = useAuth()
    console.log(complaints)
  const [data, setData] = useState([])

  console.log(complaints)

  const AdminComplaintColumns = [
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="N*Complaint" />
      },
    },
    {
      accessorKey: 'user.email',
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
      accessorKey: 'user.firstName',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="first name" />
      },
    },
    {
      accessorKey: 'user.lastName',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="last name" />
      },
    },
    {
      accessorKey: 'message',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="message" />
      },
    },
    {
      accessorKey: 'user.phone',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="phone" />
      },
    },
    {
      accessorKey: 'user.city',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="city" />
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
          console.log(row)
        const { id, user :{firstName , email , lastName} } = row.original
          console.log(firstName)
        const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
        return (
          <div className={'flex gap-x-1 '}>
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
                    YOU JUST KNOW YOU DELETE THIS COMPLAINT {' '}
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
                        const response = await ApiServices.deleteComplaint(id)
                        toast.dismiss(deletingLoader)
                        if (response?.status === 200) {
                          dispatch({
                            type: 'DELETE_COMPLAINT',
                            payload: {
                              id: id,
                            },
                          })
                          setData(
                            data.filter((complaint) => complaint.id !== id),
                          )
                          toast.success('complaint deleted', {
                            description: `complaint deleted successfully`,
                            icon: <Trash2Icon />,
                          })
                        }
                      } catch (err) {
                        toast.dismiss(deletingLoader)
                        toast.success('complaint not deleted', {
                          description: `complaint was not deleted try again after a while`,
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
    {
      setData(complaints)
    }
  }, [complaints])
  return (
    <>
      <DataTable
        columns={AdminComplaintColumns}
        data={data}
        filterBy={'user_id'}
        messageFilter={'filtered by user id '}
      />
    </>
  )
}
