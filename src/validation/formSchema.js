import * as yup from 'yup';

const formSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Name is required!')
      .min(3, 'Name must be 3 characters long!'),
    size: yup
    .string()
    .oneOf(['small', 'medium', 'large', 'x-large'], 'Pizza size is required!'),
    pepproni: yup.boolean(),
    sausage: yup.boolean(),
    mushroom: yup.boolean(),
    onion: yup.boolean()
  })

export default formSchema;