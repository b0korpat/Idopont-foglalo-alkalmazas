<script setup>
import { ref } from 'vue';
import { useidopontStore } from '@/stores/idopont.js';
import { useToast } from "vue-toastification";

const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
const hours = [];
for (let i = 8; i <= 16; i++) {
  hours.push(i);
}

const showModal = ref(false);
const formData = ref({ name: '', phone: '' });
const selectedDayHour = ref('');

const idopontStore = useidopontStore();
const toast = useToast();


const openModal = (day, hour) => {
  selectedDayHour.value = `${day} ${hour}:00`;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formData.value = { name: '', phone: '' };
};

const submitForm = async () => {
  await idopontStore.bookIdopont(formData.value.name, formData.value.phone, selectedDayHour.value);
  closeModal();
  toast.success('Időpont sikeresen foglalva!');
  await idopontStore.getIdopontok();
};

const isAppointmentBooked = (day, hour) => {
  return idopontStore.idopontok.some(appointment => appointment.nap === day && appointment.ora === `${hour}:00`);
};

const getCellClass = (day, hour) => {
  return isAppointmentBooked(day, hour) ? 'booked' : '';
};
</script>

<template>
  <div class="container-fluid">
  <table class="table table-bordered">
    <thead>
    <tr>
      <th>Időpont Foglalás</th>
      <th v-for="day in days" :key="day">{{ day }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="hour in hours" :key="hour">
      <td>{{ hour }}:00</td>
      <td v-for="day in days" :key="day" :class="getCellClass(day, hour)">
        {{ day }} {{ hour }}:00
        <button v-if="!isAppointmentBooked(day, hour)" class="btn btn-primary btn-sm" @click="openModal(day, hour)">+</button>
      </td>
    </tr>
    </tbody>
  </table>


  <div v-if="showModal" class="modal show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Időpont foglalás: {{selectedDayHour}}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Név:</label>
              <input type="text" id="name" class="form-control" v-model="formData.name" required />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Telefonszám:</label>
              <input type="text" id="phone" class="form-control" v-model="formData.phone" required />
            </div>
            <button type="submit" class="btn btn-primary">Foglalás</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.booked {
  background-color: blue;
  color: white;
}
.modal.show {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>