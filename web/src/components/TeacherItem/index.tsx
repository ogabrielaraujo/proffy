import React from 'react'

import whatsappIcon from 'assets/images/icons/whatsapp.svg'

import './styles.css'

interface TeacherItemProps {}

const TeacherItem: React.FC<TeacherItemProps> = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/14953880?s=460&u=854f2a5eb6bda70ecc7431abaca6ae2529ef1b12&v=4"
          alt="Gabriel Araujo"
        />
        <div>
          <strong>Gabriel Araujo</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <br />
        <br />
        Dicta quidem necessitatibus ipsum veritatis rem, accusantium numquam
        molestias tempore aperiam autem corporis iure assumenda iusto eius
        aspernatur voluptas adipisci expedita voluptatum.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem
