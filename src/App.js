import React, { useState, useEffect} from "react";
import Home from './components/Home';
import Completion from './components/Completion';
import Form from './components/Form';
import schema from "./validation/formSchema";
import * as yup from 'yup';
import axios from 'axios';
import './App.css';

const initialForm = {
  name: '',
  size: '',
  pepperoni: false,
  sausage: false,
  mushroom: false,
  onion: false,
  instructions: ''
}

const initialErrors = {
  name: '',
  size: ''
};
const initialFoods = [];
const initialDisabled = true;


export default function App()
{
    const [foods, setFoods] = useState(initialFoods);
    const [formValues, setFormValues] = useState(initialForm); // object
    const [formErrors, setFormErrors] = useState(initialErrors); // object
    const [disabled, setDisabled] = useState(initialDisabled);       // boolean

    const getFoods = () => {
        axios
        .get(`http://localhost:4000/friends`)
        .then((res) => {
          setFoods(res.data)
        })
        .catch((err) => {
          debugger
          alert(`have error`)
        })
      }

      const postNewFood = (newFood) => {
        axios
        .post(`http://localhost:4000/friends`, newFood)
        .then((res) => {
          setFoods([res.data, ...foods])
          setFormValues(initialForm)
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
 
    const formSubmit = () =>
    {
        const newFood = {
            name: formValues.name.trim(),
            size: formValues.size,
            toppings: ['pepperoni', 'sausage', 'mushroom', 'onion'].filter(topping => formValues[topping]),
            instructions: formValues.instruction.trim()
        };

        postNewFood(newFood);
    };

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
                <header>
              <h1>Lambda Eats</h1>
                </header>
                    <Form
                        values={formValues}
                        change={inputChange}
                        submit={formSubmit}
                        disabled={disabled}
                        errors={formErrors}
                    />
    
                    <Completion />
                    <Home />
                
            
        </div>
    );
};
