import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/GlobalState.jsx'
import { DisplaySearchCard } from './DisplaySearchCard.jsx'

function Search() {
  const { products } = useAuth()
  const [currentProducts, setCurrentProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [tempProducts, setTempProducts] = useState([])

  useEffect(() => {
    setCurrentProducts(products)

    const searchProducts = currentProducts.filter(
      (product) =>
        product?.description.includes(searchValue) ||
        product?.title.includes(searchValue) ||
        product?.price.includes(searchValue),
    )

    setTempProducts(searchProducts)
  }, [searchValue, products])

  const handleSearchProducts = (e) => {
    setSearchValue(e.target.value)
  }

  const displaySearchProducts = () => {
    return tempProducts.map((product, key) => (
      <DisplaySearchCard
        product={product}
        key={key}
        setSearchValue={setSearchValue}
      />
    ))
  }

  return (
    <div className="relative">
      <div className="relative ">
        <input
          id={'searchInput'}
          className="w-full h-10 px-4 rounded-lg text-gray-800 bg-white border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search for products..."
          name="searchBar"
          value={searchValue}
          onChange={handleSearchProducts}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pointer-events-none"></div>
      </div>
      {tempProducts?.length > 0 && searchValue?.length > 0 && (
        <div
          className={`absolute bg-white left-0 right-0 shadow-gray-600 shadow-xl mt-2   rounded-lg  h-auto max-h-96 overflow-auto`}
        >
          {searchValue?.length > 0 && displaySearchProducts()}
        </div>
      )}
    </div>
  )
}

export default Search
