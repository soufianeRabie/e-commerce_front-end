'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button.jsx'
import { ApiServices } from '../../services/axiosServices.js'
import { useAuth } from '../../Context/GlobalState.jsx'
import { toast } from 'sonner'
import { CheckIcon, CircleX } from 'lucide-react'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  email: z.string().email().max(50),
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(3).max(30),
  address: z.string().min(8).max(100),
  city: z.string().min(3).max(30),
  phone: z.string().min(10).max(30),
})

export const DeleveryForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      address: '',
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
    },
  })
  const { setValue } = form
  const { user, dispatch } = useAuth()

  useEffect(() => {
    if (user) {
      console.log(user)
      setValue('firstName', user?.firstName)
      setValue('lastName', user?.lastName)
      setValue('email', user?.email)
      setValue('phone', user?.phone)
      setValue('city', user?.city)
      setValue('address', user?.address)
    }
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (values) => {
    setIsLoading(true)
    const CreatingOrders = toast.loading('creating orders in progress')
    try {
      const response = await ApiServices.AddIntoCashDelivery({
        ...values,
        user: user?.id,
      })
      toast.dismiss(CreatingOrders)
      if (response.status === 200) {
        dispatch({
          type: 'SET_BASKET',
          payload: [],
        })
        toast.success('success', {
          description: 'your orders has been created successfully',
          icon: <CheckIcon />,
        })
      } else {
        toast.error('error', {
          description: 'your orders not created please try again',
          icon: <CircleX />,
        })
      }
    } catch (err) {
      toast.dismiss(CreatingOrders)
      console.log(err)
    }
  }
  return (
    <div className={'w-1/2 mx-auto m'}>
      <div>
        <h1 className={'text-3xl center '}>Our service is the best </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className={'font-bold mt-4'}>customer information</div>

          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={'mt-4'}>
              <h1 className={'font-bold my-2 '}>Facture Details</h1>
              <div className={'md:flex justify-between '}>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className={'md:w-2/5'}>
                      <FormLabel>first name</FormLabel>
                      <FormControl>
                        <Input placeholder="Mohamed..." {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className={'md:w-2/5'}>
                      <FormLabel>last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ali..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className={'mt-4'}>
              <h1 className={'font-bold my-2 '}>Maroc</h1>
              <div className={'md:flex justify-between '}>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className={'md:w-2/5'}>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className={'md:w-2/5'}>
                      <FormLabel>city</FormLabel>
                      <FormControl>
                        <Input placeholder="city..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="0661137...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={'md:w-full  mx-auto'}>
            <Button className={'w-full'} disabled={isLoading} type="submit">
              Order Now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
