import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useidopontStore = defineStore('idopont', () => {
  const idopontok = ref([])

  const getIdopontok = async () => {
    const response = await fetch('http://localhost:3000/orvos')
    idopontok.value = await response.json()
    console.log(idopontok.value)
  }

  const bookIdopont = async (name, phone, dayHour) => {
    const [nap, ora] = dayHour.split(' ')
    const response = await fetch('http://localhost:3000/orvos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nev: name,
        telszam: phone,
        nap,
        ora
      }),
    })
    const newAppointment = await response.json()
    idopontok.value.push(newAppointment)
  }

  const removeIdopont = async (name, phone, dayHour) => {
    const [nap, ora] = dayHour.split(' ')
    const response = await fetch('http://localhost:3000/orvos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nev: name,
        telszam: phone,
        nap,
        ora
      }),
    })
    if (response.ok) {
      idopontok.value = idopontok.value.filter(
          idopont => !(idopont.nev === name && idopont.telszam === phone && idopont.nap === nap && idopont.ora === ora)
      )
    }
  }

  return { idopontok, getIdopontok, bookIdopont, removeIdopont }
})