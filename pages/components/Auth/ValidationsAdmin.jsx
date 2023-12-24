import * as Yup from 'yup';


export const SchemaAdmin = Yup.object().shape({
  
    username: Yup.string().required('Zorunlu alan emailinizi giriniz'),
    password: Yup.string()
    .required('Zorunlu alan şifrenizi giriniz'),
    
  });