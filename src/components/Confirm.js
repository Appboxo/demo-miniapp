import React from 'react'
import { ReactComponent as CrossIcon } from './svgs/cross.svg'
import { ReactComponent as PeopleIcon } from './svgs/people.svg'

import styles from './Confirm.module.scss'

const Confirm = ({ onClose, onConfirm }) => {
  return (
    <section className={styles.confirm}>
      <div className={styles['confirm-modal']}>
        <div className={styles['confirm-modal__close']}>
          <CrossIcon onClick={onClose}/>
        </div>
        <div className={styles['confirm-modal__icon']}>
          <PeopleIcon />
        </div>
        <h3>This service is requesting access to your account</h3>
        <p>The service will be able to see the email address linked to your account</p>
        <button className="button" onClick={onConfirm}>Allow</button>
      </div>
    </section>
  )
}

export default Confirm
