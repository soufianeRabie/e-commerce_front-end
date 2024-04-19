import { useAuth } from '../../Context/GlobalState.jsx'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { useEffect, useState } from 'react'
import { Invoice } from './Invoice.jsx'

export const Index = ({
  user,
  delivery,
  orders,
  order,
  collectInvoiceContent,
  index,
}) => {
  const id = order ? order?.id : delivery?.id
  const PrintId = order ? `order${id}` : `delivery${id}`
  // const calculatePriceThisOrder

  useEffect(() => {
    console.log('collect Invoice Contnet ', collectInvoiceContent)
    const content = document.getElementById(`print${PrintId}`)
    console.log(content)
    collectInvoiceContent && collectInvoiceContent(content)
  }, [])
  const SaveAsPDFHandler = () => {
    const dom = document.getElementById(`print${PrintId}`)

    console.log(dom)
    console.log(id)
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image()
        img.crossOrigin = 'annoymous'
        img.src = dataUrl
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [5.5, 8.5],
          })

          // Define reused data
          const imgProps = pdf.getImageProperties(img)
          const imageType = imgProps.fileType
          const pdfWidth = pdf.internal.pageSize.getWidth()

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5)
          const nPages = Math.ceil(pxFullHeight / pxPageHeight)

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight()

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement('canvas')
          const pageCtx = pageCanvas.getContext('2d')
          pageCanvas.width = imgProps.width
          pageCanvas.height = pxPageHeight

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width
            }
            // Display the page.
            const w = pageCanvas.width
            const h = pageCanvas.height
            pageCtx.fillStyle = 'white'
            pageCtx.fillRect(0, 0, w, h)
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h)

            // Add the page to the PDF.
            if (page) pdf.addPage()

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1)
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight)
          }
          // Output / Save
          pdf.save(`invoice-${order?.id || delivery?.id}.pdf`)
        }
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error)
      })
  }

  return (
    <>
      <div className="min-h-screen px-4 text-center">
        <Invoice
          delivery={delivery}
          orders={orders}
          order={order}
          user={user}
          key={index}
        />
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600  font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={SaveAsPDFHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>
    </>
  )
}
