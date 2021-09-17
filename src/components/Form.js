import React from 'react';
// import { useHistory  } from 'react-router-dom';

export default function Form(props) {
    // const history = useHistory()

    const {
        values,
        change,
        submit,
        disabled,
        errors,
    } = props;

    const onSubmit = (evt) => {
        evt.preventDefault()
        submit()
    };

    const onChange = (evt) => {
        const { name, value, checked, type } =evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    };

    return(
        <form classname='form-container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Build Your Own Pizza</h2>
                <button disabled={disabled}>submit</button>

             <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.size}</div>
                </div>

                <div className='form-group inputs'>
                    <h4>Pizza Details</h4>

                    <label>Name&nbsp;
                        <input
                            value={values.name}
                            onChange={onChange}
                            name='name'
                            type='text'
                        />
                    </label>

                    <label>Size
                        <select
                            onChange={onChange}
                            value={values.size}
                            name='size'
                        >
                            <option value=''>-- Select a pizza size --</option>
                            <option value='small'>Small</option>
                            <option value='medium'>Medium</option>
                            <option value='large'>Large</option>
                            <option value='x-large'>X-Large</option>
                        </select>
                    </label>
                </div>

                <div className='form-group checkboxes'>
                    <h4>Toppings</h4>

                    <label>Pepperoni
                        <input
                            type="checkbox"
                            name="pepperoni"
                            checked={values.pepperoni}
                            onChange={onChange}
                        />
                    </label>

                    <label>Sausage
                        <input
                            type="checkbox"
                            name="sausage"
                            checked={values.sausage}
                            onChange={onChange}
                        />
                    </label>

                    <label>Mushroom
                        <input
                            type="checkbox"
                            name="mushroom"
                            checked={values.mushroom}
                            onChange={onChange}
                        />
                    </label>

                    <label>Onion
                        <input
                            type="checkbox"
                            name="onion"
                            checked={values.onion}
                            onChange={onChange}
                        />
                    </label>
                </div>

                <div className='form-group inputs'>
                    <label>Instructions&nbsp;
                        <input
                            value={values.instructions}
                            onChange={onChange}
                            name='instructions'
                            type='text'
                        />
                    </label>
                </div>
            </div>
        </form >
    );
}; 