import React from 'react'
import { fieldErrorProps } from '../(types)/types'

const FieldError = ({ field, error }: fieldErrorProps) => {
  if(field.state.meta.errors.length > 0){
    return (
        <p className="text-red-500 text-sm mt-1">{field.state.meta.errors[0].message || String(field.state.meta.errors[0])}</p>
    )
  }
  if(error){
    return (
        <p className="text-red-500 text-sm mt-1">{error}</p>
    )
  }

  return null
}

export default FieldError