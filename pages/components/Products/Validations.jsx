import * as Yup from 'yup';


export const Schema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, 'Çok kısa!')
      .max(6, 'Çok uzun!')
      .required('Zorunlu alan,isim ve soyisminizi giriniz'),
      numberPhone: Yup.number()
      .min(5, 'Çok kısa!')
      .max(6, 'Çok uzun!')
      .required('Zorunlu alan,telefon numaranızı giriniz'),
    email: Yup.string().email('Geçersiz email').required('Zorunlu alan,emailinizi giriniz'),
    person: Yup.string()
    .min(5, 'Çok kısa!')
    .max(6, 'Çok uzun!')
    .required('Zorunlu alan,kişi sayısını giriniz'),
    date: Yup.date()
    .required('Zorunlu alan,tarihini giriniz'),
  });