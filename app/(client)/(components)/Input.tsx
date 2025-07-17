import React from 'react'
import FieldError from './FieldError'
import { inputProps } from '../(types)/types'
import { categories } from '../(constants)/caledarData'

const Input = ({ field, error, id, type, placeholder, label }: inputProps) => {
    return (
        <div>
            {type != "options" ?
                <>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label} <span className="text-red-500">*</span></label>
                    <input type={type} id={id} name={id} value={field.state.value} onChange={(e) =>field.handleChange(e.target.value)} onBlur={field.handleBlur} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all" placeholder={placeholder} />
                    {(field.state.meta.errors || error) && <FieldError field={field} error={((id == "title" && error.title) || (id == "description" && error.description)) ? error : false} />}
                </> :
                <>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <select id={id} name={id} value={field.state.value} onChange={field.state.value} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all bg-white">
                        <option value="">{placeholder}</option>
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>{category.label}</option>
                        ))}
                    </select>
                    {(field.state.meta.errors || error) && <FieldError field={field} error={(error?.category) ? error : false} />}
                </>
            }
        </div>
    )
}

export default Input