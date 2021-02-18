import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, } from 'react-leaflet'
import schema from '../../validation/schema'
import axios from 'axios'
import './style.css'
import { ErrorMessage, Formik } from 'formik';
import Dropzone from '../../components/dropzone'
import logo from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {

  const [ufs, setUfs] = useState([])
  const [selectedUf, setSelectedUf] = useState('0')
  const [citys, setCitys] = useState([])
  const [selectedLat, setSelectedLat] = useState('0')
  const [selectedLong, setSelectedLong] = useState('0')
  const [initalPosition, setInitialPosition] = useState([undefined, undefined])
  const [selectedFile, setSelectedFile] = useState()
  const [selectedFileUrl, setSelectedFileUrl] = useState('')


  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome)
        setCitys(cityNames)
      })
  }, [selectedUf])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords

      setInitialPosition([latitude, longitude])
    })


  }, [])

  async function handleSubmit(values, { resetForm }) {
    
    if (selectedLat && selectedLong === '0') {
      alert('Você precisa selecionar o local da célula no mapa!')
      return
    }

    const data = new FormData();

    data.append('cell_name', values.cell_name)
    data.append('leader_name', values.leader_name)
    data.append('network_color', values.network_color)
    data.append('schedule', values.schedule)
    data.append('email', values.email)
    data.append('whatsapp', values.whatsapp)
    data.append('adress', values.adress)
    data.append('uf', selectedUf)
    data.append('city', values.city)
    data.append('latitude', selectedLat)
    data.append('longitude', selectedLong)

    if (selectedFile) {
      data.append('image', selectedFile)
    } else {
      alert('Você precisa adcionar a imagem da célula!')
    }

    try {
      await api.post('create_cell', data)
      alert(`Célula ${values.cell_name} cadastrada com sucesso!`)
      resetForm({})
      setSelectedUf('')
      setSelectedFileUrl('')
      setSelectedLat('')
      setSelectedLong('')
    } catch (err) {
      alert('Aconteceu algum problema, tente novamente!')
    }

  }

  function handleChangeUf(e) {
    setSelectedUf(e.target.value)

  }

  function MarkLocation() {

    useMapEvents({
      click: (e) => {
        setSelectedLat(e.latlng.lat)
        setSelectedLong(e.latlng.lng)

      }
    })
    return null
  }

  return (
    <div className="register-container">
      <img src={logo} alt="logo" className='logo' />
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          cell_name: '',
          leader_name: '',
          network_color: '',
          schedule: '',
          email: '',
          whatsapp: '',
          adress: '',
          city: '',

        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit
        }) => (
          <form
            onSubmit={handleSubmit}>

            <Link to='/' className='link-form'><FiArrowLeft size={22} /></Link>
            <h3 className='title-form'>Preencha as informações abaixo para cadastrar a célula.</h3>

            <Dropzone onFileUploaded={setSelectedFile} setSelectedFileUrl={setSelectedFileUrl} selectedFileUrl={selectedFileUrl} />

            <div className="inputs-container">

              <div className="input-container">
                <label htmlFor="name">Nome da célula:</label>
                <input className={errors.cell_name && touched.cell_name ? 'input-error' : ''} value={values.cell_name} type="text" name='cell_name' onChange={handleChange} />
              </div>
              <div className="error">
                <ErrorMessage name='cell_name' />
              </div>

              <div className="input-container">
                <label htmlFor="leader_name">Nome do líder:</label>
                <input className={errors.leader_name && touched.leader_name ? 'input-error' : ''} value={values.leader_name} type="text" name='leader_name' onChange={handleChange} />
              </div>
              <div className="error">
                <ErrorMessage name='leader_name' />
              </div>

              <div className="input-container">
                <label htmlFor="adress">Cor da rede:</label>
                <input className={errors.network_color && touched.network_color ? 'input-error' : ''} value={values.network_color} type="text" name='network_color' onChange={handleChange} />
              </div>
              <div className="error">
                <ErrorMessage name='network_color' />
              </div>

              <div className="input-container">
                <label htmlFor="adress">Horário:</label>
                <input className={errors.schedule && touched.schedule ? 'input-error' : ''} value={values.schedule} type="text" name='schedule' onChange={handleChange} />
              </div>
              <div className="error">
                <ErrorMessage name='schedule' />
              </div>

              <div className="input-container">
                <label htmlFor="email">E-mail:</label>
                <input className={errors.email && touched.email ? 'input-error' : ''} value={values.email} type="text" name='email' onChange={handleChange} />
              </div>
              <div className="error">
                <ErrorMessage name='email' />
              </div>

              <div className="input-container">
                <label htmlFor="whatsapp">Whatsapp:</label>
                <input className={errors.whatsapp && touched.whatsapp ? 'input-error' : ''} value={values.whatsapp} type="text" name='whatsapp' onChange={handleChange} />
              </div>

              <div className="error">
                <ErrorMessage name='whatsapp' />
              </div>

              <div className="input-container">
                <label htmlFor="adress">Rua:</label>
                <input className={errors.adress && touched.adress ? 'input-error' : ''} value={values.adress} type="text" name='adress' onChange={handleChange} />
              </div>
              <div className="error">
                <ErrorMessage name='adress' />
              </div>

              <h3 className='label-select'>Selecione um estado e uma cidade:</h3>

              <div className="select-container">
                <select value={selectedUf} name="uf" id="uf" onChange={handleChangeUf} required>
                  <option value="">Selecione um Estado:</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>

                <select value={values.city} name="city" id="city" onChange={handleChange} required>
                  <option value="">Selecione uma Cidade:</option>
                  {citys.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <h3 className='label-select'>Selecione onde a célula está localizada:</h3>

            {initalPosition[0] !== undefined && initalPosition[1] !== undefined ? (
              <>
                <MapContainer center={[initalPosition[0], initalPosition[1]]} zoom={17}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[selectedLat, selectedLong]} />
                  <MarkLocation />

                </MapContainer>
                <div className="button-container">
                  <button className='button-form' type='submit'>Enviar</button>
                </div>
              </>
            ) : (<></>)}

          </form>
        )}
      </Formik>

    </div>
  )
}