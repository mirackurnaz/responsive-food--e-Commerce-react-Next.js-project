import * as Yup from 'yup';


export const SchemaLogin = Yup.object().shape({
  
    email: Yup.string().email('Geçersiz e-posta').required('Zorunlu alan emailinizi giriniz'),
    password: Yup.string()
    .required('Zorunlu alan şifrenizi giriniz'),
    
  });