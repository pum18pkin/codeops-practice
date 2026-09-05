import React, { useState } from 'react'

const AREAS = ['Bole', 'Piassa', 'Kazanchis', 'Megenagna', 'CMC', 'Sarbet']

// TeleBirr numbers are Ethiopian mobile numbers:
//   09XXXXXXXX  (10 digits, local format)
//   +2519XXXXXXXX / 2519XXXXXXXX  (international format)
const isValidTeleBirr = (raw) => {
  const phone = raw.replace(/[\s-]/g, '')
  return /^(?:09\d{8}|(?:\+?251)9\d{8})$/.test(phone)
}

const DeliveryForm = ({ onSubmit }) => {
  // Whole form lives in ONE state object
  const [form, setForm] = useState({ name: '', phone: '', area: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Live validation derived from state on every render
  const phoneValid = isValidTeleBirr(form.phone)
  const nameValid = form.name.trim().length > 0
  const areaValid = form.area !== ''
  const formValid = nameValid && phoneValid && areaValid

  const showPhoneError = form.phone.length > 0 && !phoneValid

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formValid) return
    onSubmit?.({ ...form })
  }

  return (
    <form className="delivery-form" onSubmit={handleSubmit} noValidate>
      <h3 className="delivery-title">Delivery details</h3>

      <label className="delivery-field">
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Abebe Kebede"
          autoComplete="name"
        />
      </label>

      <label className="delivery-field">
        <span>TeleBirr number</span>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="09XXXXXXXX"
          autoComplete="tel"
          aria-invalid={showPhoneError}
        />
        {showPhoneError && (
          <span className="delivery-error">
            Enter a valid TeleBirr number (e.g. 0912345678).
          </span>
        )}
      </label>

      <label className="delivery-field">
        <span>Delivery area</span>
        <select name="area" value={form.area} onChange={handleChange}>
          <option value="">Select an area…</option>
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className="delivery-submit" disabled={!formValid}>
        Place order
      </button>
    </form>
  )
}

export default DeliveryForm
