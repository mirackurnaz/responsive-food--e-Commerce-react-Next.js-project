import * as Yup from 'yup';

const passwordRules=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const SchemaRegister = Yup.object().shape({
  fullName: Yup.string().required('Zorunlu alan isminizi ve soyisminizi giriniz'),
    email: Yup.string().email('Geçersiz email').required('Zorunlu alan emailinizi giriniz'),
    password:Yup.string().min(5,"En az 5 karakterden oluşan bir şifre oluşturun").matches
    (passwordRules,
       {
        message:"Lütfen en az 1 büyük harf, 1 küçük harf ve 1 rakam giriniz"
       } ).required("Şifre girmek zorunludur"),
     passwordConfirm:Yup.string().oneOf([Yup.ref("password")],"Şifreler birbiriyle eşleşmiyor").required("Şifre tekrarını girmek zorunludur")
})
  