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
import { useRegistration } from '../Hooks/useRegistration.js'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader, UserCheckIcon } from 'lucide-react'
import { toast } from 'sonner'

const formSchema = z
  .object({
    email: z.string().email().max(50),
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(3).max(30),
    address: z.string().min(8).max(100),
    city: z.string().min(3).max(30),
    phone: z.string().min(10).max(30),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(4),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'The passwords do not match.',
    path: ['confirmPassword'],
  })

export const Register = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      address: '',
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      password: '',
      confirmPassword: '',
    },
  })
  const { user } = useAuth()
  const navigate = useNavigate()
  const { isLoading, isError, error, register, isRegistrationSuccess, errors } =
    useRegistration()

  useEffect(() => {
    console.log(errors)
    if (isRegistrationSuccess) {
      navigate('/login')
      toast.success('account created', {
        description: 'your account has been registered successfully',
        icon: <UserCheckIcon />,
        duration: 3000,
      })
    }
  }, [isError, error, isRegistrationSuccess])

  const onSubmit = async (values) => {
    const creatingAccountLoader = toast.loading('creating account in progress')
    await register(values)
    toast.dismiss(creatingAccountLoader)
  }
  return (
    <div className={'w-2/3 mx-auto my-10'}>
      <div>
        <h1 className={'text-3xl center '}>Register Page </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className={'mt-4'}>
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
                    <FormMessage />
                    {isError && (
                      <span className={'text-red-600 text-sm'}>{error}</span>
                    )}
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
            <div></div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  {errors?.email && (
                    <span className={'text-sm text-red-600'}>
                      {errors?.email[0]}
                    </span>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={'mt-4'}>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={'password'}
                      placeholder="***************"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type={'password'}
                      placeholder="***************"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className={'w-full'} type="submit">
            {isLoading ? (
              <Loader className={'animate-spin'} />
            ) : (
              <span>sign up</span>
            )}
          </Button>
        </form>
      </Form>
      <div className={'w-full flex justify-center gap-2'}>
        <p>already have an account?</p>
        <Link className={'text-slate-300 underline'} to={'/login'}>
          login
        </Link>
      </div>
    </div>
  )
}
