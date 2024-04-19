import { useState } from 'react'

export const Invoice = ({ order, delivery, user, orders, index }) => {
  const [id, setId] = useState(
    order ? `order${order?.id}` : `delivery${delivery?.id}`,
  )

  console.log(id)
  const calculateDiscountedAmount = (orderAmount, discountPercentage) => {
    // Parse orderAmount to a number
    const amount = parseFloat(orderAmount)

    // Calculate the discount amount
    const discountAmount = amount * (discountPercentage / 100)

    // Subtract the discount from the original amount
    const discountedAmount = amount - discountAmount

    // Format the discounted amount to fixed 2 decimal places
    const formattedDiscountedAmount = discountedAmount.toFixed(2)

    // Return the discounted amount
    return formattedDiscountedAmount
  }

  console.log('this is the order', order, delivery)
  return (
    <div className="flex justify-center items-center h-full" id={`print${id}`}>
      <div
        className="max-w-4xl w-full rounded-lg shadow-xl p-8"
        id={`print${id}`}
      >
        <div className="font-bold flex flex-wrap justify-between">
          <div className={'text-sky-500'}>
            <span>Invoice Number</span>: {order?.id || delivery?.id}
          </div>
          <h1 className={'text-md md:text-lg font-thin italic'}>
            {' '}
            Soufiane Rabya
          </h1>
        </div>
        <h1 className="text-center text-3xl font-bold text-red-600 mb-6">
          INVOICE
        </h1>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={'font-bold'}> Customer Name: </div>
          <div className="font-bold">
            <span className={'italic font-thin'}>
              {user?.firstName || delivery?.first_name}
            </span>
          </div>
          <div className={'font-bold'}>Customer email</div>
          <div className={'font-sans italic'}>
            {user?.email || delivery?.email}
          </div>
        </div>
        <table className="w-full text-left mb-6">
          <thead>
            <tr className="border-b border-gray-200 text-sm md:text-base">
              <th>ITEM</th>
              <th className="text-center">QTY</th>
              <th className="text-right">PRICE</th>
              <th className="text-right">Discount</th>
              <th className="text-right">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item) => (
              <tr key={item.id}>
                <td>{item?.product?.title}</td>
                <td className="text-center">{item?.quantity}</td>
                <td className="text-right">
                  ${Number(item?.product?.price).toFixed(2)}
                </td>
                <td> {Number(item?.discount)}</td>
                <td className="text-right">
                  ${Number(item?.totalPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="font-bold">Subtotal:</span>
            <span>${Number(delivery?.amount || order?.amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Discount:</span>
            <span>%{delivery?.TotalDiscount || order?.TotalDiscount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Tax:</span>
            <span>${0}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 py-2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              $
              {Number(
                calculateDiscountedAmount(
                  delivery?.amount || order?.amount,
                  delivery?.TotalDiscount || order?.TotalDiscount,
                ),
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
