import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { value } from 'lodash/seq.js'

const Price = ({ handleChange }) => {
  const [price, setPrice] = useState([33]) // Initial state for price

  const handlePriceChange = (value) => {
    setPrice(value) // Update the price state when slider value changes
    handleChange(value) // Call the handleChange function with the new value
  }

  const formatTooltip = (value) => {
    return `$${value[0]}` // Custom tooltip format
  }

  return (
    <div className={"w-5/6 mx-auto my-10"}>
      <div>
        greather than <span className={'text inline-block text-green-600 my-3'}>${price}</span>
      </div>
      <Slider
        defaultValue={price}
        max={10000}
        step={50}
        onChange={handlePriceChange}
        tipFormatter={formatTooltip} // Formats the tooltip value
      />
    </div>
  )
}

export default Price
