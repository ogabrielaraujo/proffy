import React, { FormEvent, useState } from 'react'
import { useImmer } from 'use-immer'
import api from 'services/api'

import PageHeader from 'components/PageHeader'
import TeacherItem, { Teacher } from 'components/TeacherItem'
import Input from 'components/Input'
import Select from 'components/Select'

import SearchIcon from 'assets/images/icons/search.svg'

import './styles.css'

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([])
  const [search, setSearch] = useImmer({
    subject: '',
    week_day: '',
    time: '',
  })

  function updateField(field: string, value: string) {
    setSearch((draft) => {
      draft[field] = value
    })
  }

  async function handleSearch(e: FormEvent) {
    e.preventDefault()

    const response = await api.get('classes', {
      params: search,
    })

    if (response.status !== 200) {
      alert('Não foi possível se conectar ao sistema')
      return
    }

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={handleSearch}>
          <Select
            name="subject"
            label="Matéria"
            value={search.subject}
            onChange={(e) => updateField('subject', e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Física', label: 'Física' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Programação', label: 'Programação' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={search.week_day}
            onChange={(e) => updateField('week_day', e.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={search.time}
            onChange={(e) => updateField('time', e.target.value)}
          />

          <button type="submit">
            <img src={SearchIcon} alt="Buscar" />
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers &&
          teachers.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher} />
          })}
      </main>
    </div>
  )
}

export default TeacherList
