'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useUpdateStatus } from '../Hooks/useUpdateStatus.js'
import { toast } from 'sonner'
import { CheckIcon, CircleX, Loader } from 'lucide-react'
import { DialogClose } from '../ui/dialog.jsx'
import { useAuth } from '../../Context/GlobalState.jsx'

const FormSchema = z.object({
  status: z.string({
    required_error: 'Please select an status to display.',
  }),
})

export function UpdateOrderStatus({ id, type, currentStatus }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  })
  const { updateStatus, isError, isLoading, success, error } = useUpdateStatus()
  const allStatus = ['completed', 'confirmed', 'pending', 'annulled']
  const [vailableStatus, setVailableStatus] = useState(
    allStatus.filter((st) => st !== currentStatus),
  )
  const [status, setStatus] = useState()
  const { dispatch } = useAuth()
  useEffect(() => {
    if (success) {
      if (type === 'delivery') {
        dispatch({
          type: 'UPDATE_DELIVERY_STATUS',
          payload: {
            id,
            status,
          },
        })
      }
      if (type === 'order') {
        dispatch({
          type: 'UPDATE_ORDER_STATUS',
          payload: {
            id,
            status,
          },
        })
      }
      console.log('dumped')
      toast.success('updated successfully', {
        description: 'the status was updated successfully',
        icon: <CheckIcon />,
      })
    }
    if (isError) {
      toast.error('something went wrong', {
        description: error,
        icon: <CircleX />,
      })
    }
  }, [error, success, isError])
  const onSubmit = async (data) => {
    setStatus(data?.status)
    const updateStatusToast = toast.loading('updating status in progress...')
    await updateStatus(data?.status, id, type)
    toast.dismiss(updateStatusToast)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-4/5 mx-auto space-y-6"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vailableStatus.map((st, key) => (
                    <SelectItem key={key} value={st}>
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>choice an action </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={'w-full mx-auto'}>
          {!success ? (
            <Button className={'w-full'} disabled={isLoading} type="submit">
              {' '}
              {isLoading && (
                <span className={'animate-spin'}>
                  <Loader />
                </span>
              )}
              {!isLoading ? 'update' : 'updating...'}
            </Button>
          ) : (
            <DialogClose className={'w-full'}>
              <Button type={'reset'} className={'w-full'}>
                close
              </Button>
            </DialogClose>
          )}
        </div>
      </form>
    </Form>
  )
}
