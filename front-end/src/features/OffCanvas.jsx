import React, { useState } from 'react'

const OffCanvas = ({ isOpen, onClose }) => {
  return (
    <div
      className={`off-canvas ${isOpen ? 'open' : ''}`}
      onClick={() => onClose()}
    >
      <div className="off-canvas-content">
        <button onClick={() => onClose()}>Close</button>
        <p>This is the off-canvas content.</p>
      </div>
    </div>
  )
}

export default OffCanvas
