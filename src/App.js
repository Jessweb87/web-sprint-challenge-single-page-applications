import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav.js'
import Home from './components/Home.js'
import Form from './components/Form.js'
import * as yup from 'yup'
import axios from 'axios'
import schema from './validation/formSchema'

const initialFormValues = {
  username: "",
  email: "",
  size: "",
  peppers: false,
  sausage: false,
  pineapple: false,
}

const initialFormErrors = {
  username: "",

}

const initialFoods = [];
const initialDisabled = true;

export default function App() {

  const [foods, setFoods] = useState(initialFoods); 
  const [formValues, setFormValues] = useState(initialFormValues); 
  const [formErrors, setFormErrors] = useState(initialFormErrors); 
  const [disabled, setDisabled] = useState(initialDisabled); 


  const getFoods = () => {
    axios
    .get(`https://reqres.in/api/pizza`)
    .then((res) => {
      setFoods(res.data)
    })
    .catch(err => console.error(err))
  } 

  const postNewFood = (newFood) => {
    axios
    .post(`https://reqres.in/api/pizza`, newFood)
    .then((res) => {
      setFoods([res.data, ...foods])
      setFormValues(initialFormValues)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

      setFormValues({
        ...formValues,
        [name]: value,
      })
  }

  const formSubmit = () => {
    const newFood = {
      username: formValues.username.trim(),

      toppings: ["peppers", "sausage", "pineapple"].filter(
        (topping) => formValues[topping]
        )
    } 
    postNewFood(newFood)
  }

  useEffect(() => {
    getFoods()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div>
        <h1>Pizza Shop</h1>
        <Switch>
          <Route path="/pizza">
            <Nav />
            <Form 
              values={formValues}
              change={inputChange}
              submit={formSubmit}
              disabled={disabled}
              errors={formErrors}
            />
          </Route>
          <Route path="/">
            < Nav />
            <Home />
          </Route>
      </Switch>
    
    </div>
  )
}