import { useNavigate } from 'react-router-dom'
import StarRating from '../rating/StarRating.jsx'

export const DisplaySearchCard = ({ product, setSearchValue }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    setSearchValue('')
    navigate(`/#${product?.id}`)
      const scrollToProduct = () => {
          const element = document.getElementById(product?.id);
          if (element) {
              element.scrollIntoView({ behavior: "smooth" });
          }
      };

      scrollToProduct();
  }



  return (
    <div
      className="w-full cursor-pointer bg-white shadow-md rounded-lg p-4 mb-4"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={import.meta.env.VITE_APP_BACKEND_IMAGES_URL + product?.images[0]?.image}
            alt={product?.title}
            className="w-16 h-16 mr-4 rounded-lg"
          />
          <div>
            <div className="font-semibold">{product?.title}</div>
            <div className="text-gray-600">${product?.price}</div>
            <div className="flex items-center">
              <StarRating rating={product?.rating}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
