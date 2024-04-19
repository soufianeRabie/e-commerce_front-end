import Online from '../Invoices/Online.jsx'
import Delivery from '../Invoices/Delivery.jsx'
import { jsPDF } from 'jspdf'
import { useState } from 'react'
import * as htmlToImage from 'html-to-image'
import { toPng } from 'html-to-image'

// eslint-disable-next-line react/prop-types
export const AllInvoices = () => {
  const [invoicesContent, setInvoicesContent] = useState([])

  // Collect content of each invoice
  const collectInvoiceContent = (invoiceContent) => {
    console.log('invoiceContent', invoiceContent)
    setInvoicesContent((prevContent) => [...prevContent, invoiceContent])
  }

  console.log(invoicesContent)

  const generateSinglePDF = () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [5.5, 8.5],
    })

    const promises = []

    invoicesContent.forEach((dom, key) => {
      const promise = toPng(dom)
        .then((dataUrl) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.src = dataUrl
          return new Promise((resolve) => {
            img.onload = () => {
              const imgProps = pdf.getImageProperties(img)
              const imageType = imgProps.fileType
              const pdfWidth = pdf.internal.pageSize.getWidth()
              const pxFullHeight = imgProps.height
              const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5)
              const nPages = Math.ceil(pxFullHeight / pxPageHeight)

              pdf.addPage()
              for (let page = 0; page < nPages; page++) {
                const yOffset = page * pxPageHeight
                // Add a new page for each invoice after drawing the content
                const pageHeight = pdf.internal.pageSize.getHeight()
                const pageCanvas = document.createElement('canvas')
                const pageCtx = pageCanvas.getContext('2d')
                pageCanvas.width = imgProps.width
                pageCanvas.height = pxPageHeight

                pageCtx.fillStyle = 'white'
                pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
                pageCtx.drawImage(
                  img,
                  0,
                  yOffset,
                  imgProps.width,
                  Math.min(pxPageHeight, pxFullHeight - yOffset),
                  0,
                  0,
                  imgProps.width,
                  Math.min(pxPageHeight, pxFullHeight - yOffset),
                )

                const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1)
                pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight)
              }
              resolve()
            }
          })
        })
        .catch((error) => {
          console.error('An error occurred while processing invoice:', error)
          // Reject the promise to handle errors downstream
          return Promise.reject(error)
        })

      promises.push(promise)
    })

    Promise.all(promises)
      .then(() => {
        // Save the PDF after all invoices are processed
        pdf.save(`invoices-${Date.now()}.pdf`)
      })
      .catch((error) => {
        console.error('An error occurred while generating PDF:', error)
      })
  }

  return (
    <>
      <div>
        <div>
          <Online collectInvoiceContent={collectInvoiceContent} />
        </div>

        <div>{<Delivery collectInvoiceContent={collectInvoiceContent} />}</div>

        <button
          className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={generateSinglePDF}
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
          <span>Download All</span>
        </button>
      </div>
    </>
  )
}
