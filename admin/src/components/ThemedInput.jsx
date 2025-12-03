import React from 'react'

function ThemedInput({ ph="Masukkan teks", type="text" }) {
  return (
    <input type={type} placeholder={ph} className={`bg-gray-200 px-3 py-2 rounded-md w-[100%]`}   />
  )
}

export default ThemedInput