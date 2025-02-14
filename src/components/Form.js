// import { Link, useRouteMatch } from 'react-router-dom'
import React from 'react';

export default function Form(props) {
    const { values, submit, change, errors, disabled } = props
    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = event => {
        const { name, value, type, checked } = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }
    return (
        <div className='pizzaFormDiv'>
            <h1>Create Your Masterpiece Pizza!</h1>
            <img src="Assets/Pizza.jpg" alt=''></img>
            <form onSubmit={onSubmit}>
                <div className='errors'>
                    <p>{errors.name}</p>
                    <p>{errors.size}</p>
                </div>

                <label>
                    <h3>Name Here!</h3>
                    <input
                        name='name'
                        type='text'
                        value={values.name}
                        onChange={onChange}
                    />
                </label>

                <label>
                    <h3>Masterpiece Pizza Size!</h3>
                    <select
                        onChange={onChange}
                        value={values.size}
                        name='size'>
                        <option value=''>---Size---</option>
                        <option value='personal'>Personal</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='extra large'>Extra Large</option>
                    </select>
                </label>

                <label>
                    <h3>Masterpiece Pizza Toppings!</h3>
                    <h4>Up to 4 per Masterpiece Pizza</h4>
                    <label>Pepperoni
                    <input
                            type='checkbox'
                            name='pepperoni'
                            onChange={onChange}
                        />
                    </label>

                    <label>Olives
                    <input
                            type='checkbox'
                            name='olives'
                            onChange={onChange}
                        />
                    </label>

                    <label>Jalapenos
                    <input
                            type='checkbox'
                            name='jalapenos'
                            onChange={onChange}
                        />
                    </label>

                    <label>Mushrooms
                    <input
                            type='checkbox'
                            name='mushrooms'
                            onChange={onChange}
                        />
                    </label>
                </label>

                <label>
                    <h3>Masterpiece Pizza Special Instructions</h3>
                    <input
                        style={{ width: '90%', marginLeft: '4%' }}
                        name='instructions'
                        type='text'
                        onChange={onChange}
                        value={values.instructions}
                    />
                </label>

                <button id="submit" disabled={disabled}>Order Masterpiece Pizza!</button>

            </form>
        </div>
    )
}