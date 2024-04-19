import CurrencyFormat from 'react-currency-format'
import { Link } from 'react-router-dom'
import React from 'react'
import { PriceAfterDiscount } from './Checkout.jsx'
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group.jsx'
import { Label } from '../../ui/label.jsx'
import { Popover, PopoverContent } from '../../ui/popover.jsx'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '../../ui/button.jsx'

export const ToTalPriceCard = ({ basket, user, tPrice, Discount }) => {
  return (
    <div className={'flex justify-center '}>
      {basket.length > 0 ? (
        <div className="flex flex-col lg:mr-8 justify-center mt-20  xl:fixed top-36 right-0  items-center  p-2 m-2 border border-gray-300 shadow-md  rounded-md max-w-sm">
          {/*<RadioGroup defaultValue="option-one">*/}
          {/*  <div className="flex items-center space-x-2">*/}
          {/*    <RadioGroupItem value="option-one" id="option-one" />*/}
          {/*    <Label htmlFor="option-one">Option One</Label>*/}
          {/*  </div>*/}
          {/*  <div className="flex items-center space-x-2">*/}
          {/*    <RadioGroupItem value="option-two" id="option-two" />*/}
          {/*    <Label htmlFor="option-two">Option Two</Label>*/}
          {/*  </div>*/}
          {/*</RadioGroup>*/}

          <p className="text-2xl font-semibold mb-4">Your Shopping Basket</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://placekitten.com/50/50"
                alt="Product"
                className="w-10 ml-4 h-10 rounded-full"
              />
              <p className="text-gray-700"> {user?.email}</p>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex w-full justify-evenly border-t border-gray-300 pt-4">
            <div className={'flex'}>
              <p className="text-lg font-semibold mr-2">Total: </p>
              <p className="text-green-500 text-lg font-semibold">
                <CurrencyFormat
                  value={PriceAfterDiscount(tPrice, Discount)}
                  displayType={'text'}
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix={'$'}
                />
              </p>
            </div>
            <div className="text-right">
              <p className="text-red-600">
                <span className={'text-sm'}> discount </span>
                {Discount}%
              </p>
              {/* Add quantity or other information here */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-1 mt-4">
            <Link to={'/'}>
              <Button variant={'secondary'}>Continue Shopping</Button>
            </Link>
            {/*<Link to={'/payment'}>*/}
            {/*</Link>*/}

            <Popover>
              <PopoverTrigger className={'w-32'}>
                <Button className={'w-full'} variant={''}>
                  Buy Now
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className={'flex gap-1'}>
                  {' '}
                  <Link to={'/delivery'}>
                    <Button> Cash on Delivery</Button>
                  </Link>
                  <Link to={'/payment'}>
                    <Button> Payment Online</Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
