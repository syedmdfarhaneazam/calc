"use client"

import { useEffect, useRef } from "react"

const Modal = ({ id, title, isActive, onClose, children }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose()
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [onClose])

  return (
    <div id={id} className={`modal ${isActive ? "active" : ""}`} ref={modalRef}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
