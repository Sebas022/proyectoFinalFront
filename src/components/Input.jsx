import React from 'react'

const Input = ({name, label, type, handleInput, value}) => {
  return (
    <div>
        <label htmlFor="block p-1">{label}</label>
        <input className="input w-full" 
            type={type}
            name={name}
            onChange={handleInput}
            value={value[name]}
        />
    </div>
  )
}

export default Input