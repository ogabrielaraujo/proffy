import React, { useState, FormEvent } from 'react'
import { useImmer } from 'use-immer'
import { useHistory } from 'react-router-dom'
import api from 'services/api'

import PageHeader from 'components/PageHeader'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Select from 'components/Select'

import warningIcon from 'assets/images/icons/warning.svg'

import './styles.css'

const TeacherForm: React.FC = () => {
  const history = useHistory()

  const [teacher, setTeacher] = useImmer({
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    cost: '',
  })

  function updateField(field: string, value: string) {
    setTeacher((draft) => {
      draft[field] = value
    })
  }

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: '',
      to: '',
    },
  ])

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: '',
      },
    ])
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, i) => {
      if (i === index) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItem)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    if (!teacher.name || !teacher.subject || !teacher.cost) {
      alert('Campos vazios')
      return
    }

    api
      .post('classes', {
        name: teacher.name,
        avatar: teacher.avatar,
        whatsapp: teacher.whatsapp,
        bio: teacher.bio,
        subject: teacher.subject,
        cost: Number(teacher.cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!')

        history.push('/')
      })
      .catch(() => {
        alert('Erro no cadastro, verifique os campos e tente novamente.')
      })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={teacher.name}
              onChange={(e) => {
                updateField('name', e.target.value)
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={teacher.avatar}
              onChange={(e) => {
                updateField('avatar', e.target.value)
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={teacher.whatsapp}
              onChange={(e) => {
                updateField('whatsapp', e.target.value)
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={teacher.bio}
              onChange={(e) => {
                updateField('bio', e.target.value)
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={teacher.subject}
              onChange={(e) => {
                updateField('subject', e.target.value)
              }}
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
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={teacher.cost}
              onChange={(e) => {
                updateField('cost', e.target.value)
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
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
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
