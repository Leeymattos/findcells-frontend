import * as Yup from 'yup'
import { setLocale } from 'yup'

setLocale({
  string:{
    min: 'Precisa de mais caracteres!',
    email: 'Ensira um email válido!',
    matches:'Somente números!'
  }
})

export default Yup.object().shape({
  cell_name: Yup.string().min(2).required('Precisa ser preenchido!'),
  leader_name: Yup.string().min(2).required('Precisa ser preenchido!'),
  network_color: Yup.string().min(2).required('Precisa ser preenchido!'),
  day: Yup.string().min(2).required('Precisa ser preenchido!'),
  schedule: Yup.string().min(2).required('Precisa ser preenchido'),
  email: Yup.string().email().required('Precisa ser preenchido!'),
  whatsapp: Yup.string().min(9).required('Precisa ser preenchido!'),
  adress: Yup.string().min(10).required('Precisa ser preenchido!'),

})