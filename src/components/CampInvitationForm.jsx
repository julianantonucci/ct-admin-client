import React, { useState } from 'react'
import classes from './CampInvitationForm.module.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
const { REACT_APP_ADMIN_API_HOST, REACT_APP_ADMIN_API_PATH } = process.env
const url = `${REACT_APP_ADMIN_API_HOST}${REACT_APP_ADMIN_API_PATH}/camps/invitations`

export default function CampInvitation() {
  const { token } = useAuth()
  const [ submitted, setSubmitted ] = useState(null)

  const defaultFormValues = {
    campName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    campCount: 1,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: defaultFormValues,
  })

  const registerFormOptions = {
    campName: { required: 'Camp name is required.' },
    firstName: { required: 'First name is required.' },
    lastName: { required: 'Last name is required.' },
    email: {
      required: 'Email is required.',
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email',
      },
    },
    phone: {
      required: 'Phone number is required',
      minLength: { value: 10, message: 'Phone must have at least 10 digits' }
    },
    campCount: {
      required: 'Count is required.',
      minValue: { value: 1, message: 'Minimum value is 1' },
      maxValue: { value: 10, message: 'Maximum value is 10' },
    },
  }

  const onSubmit = async (data) => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${token}` },
      }
      await axios.post(url, data, options)
      setSubmitted(data)
    } catch (error) {
      console.error(error)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    reset()
  }

  if (submitted) {
    return (
      <section className={classes.camp_invite}>
        <p className={classes.camp_invite__result}>
          Sent invitation to {submitted.email} for {submitted.campName}.
        </p>
        <button onClick={resetForm}>Invite Another?</button>
      </section>
    )
  } else {
    return (
      <section className={classes.camp_invite}>
        {/* TODO After a successful submit, we should show a submit response element with an 'add another' button. */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <input
            type="text"
            placeholder="Camp Name"
            {...register('campName', registerFormOptions.campName)}
          />
          <p className="error">{errors?.campName && errors.campName.message}</p>

          <input
            type="text"
            placeholder="First name"
            {...register('firstName', registerFormOptions.firstName)}
          />
          <p className="error">
            {errors?.firstName && errors.firstName.message}
          </p>

          <input
            type="text"
            placeholder="Last name"
            {...register('lastName', registerFormOptions.lastName)}
          />
          <p className="error">{errors?.lastName && errors.lastName.message}</p>

          <input
            type="email"
            className= {classes.camp_invite__email}
            placeholder="Email"
            {...register('email', registerFormOptions.email)}
          />
          <p className="error">{errors?.email && errors.email.message}</p>

          <input
            type="tel"
            placeholder="Phone"
            {...register('phone', registerFormOptions.phone)}
          />
          <p className="error">{errors?.phone && errors.phone.message}</p>

          <input
            type="number"
            placeholder="Camp Count"
            {...register('campCount', registerFormOptions.campCount)}
          />
          <p className="error">
            {errors?.campCount && errors.campCount.message}
          </p>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </section>
    )
  }
}
