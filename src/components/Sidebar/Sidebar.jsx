import './Sidebar.css'
import Category from './Category.jsx'
import Price from './Price/Price.jsx'
import { Button } from '@/components/ui/button.jsx'
import { useState } from 'react'
import { SheetClose } from '../ui/sheet.jsx'

const Sidebar = ({ filter }) => {
  const [categories, setCategories] = useState([])
  const [price, setPrice] = useState(0)

  const handleChangeCat = (category) => {
    console.log(category)

    console.log(categories)
    const isFound = categories.find((cat) => cat === category)
    console.log(isFound)
    console.log(category)
    return isFound
      ? setCategories((prevState) =>
          prevState.filter((cat) => cat !== category),
        )
      : setCategories((prevState) => [...prevState, category])
  }

  const handleChangePrice = (price) => {
    setPrice(price)
  }

  const handleFilter = (e) => {
    e.preventDefault()
    filter(price, categories)
  }
  return (
    <div className="">
      <section className="sidebar dark:text-white">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Price handleChange={handleChangePrice} />
        <Button  onClick={handleFilter} variant={'outline'}  >
          <SheetClose > Filter</SheetClose>
        </Button>
      </section>
    </div>
  )
}

export default Sidebar
