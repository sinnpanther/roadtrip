<template>

  <H1 title="Créer un nouveau voyage" cls="mb-4" />

  <Form v-slot="$form" :initialValues :resolver :validateOnValueUpdate="false" :validateOnBlur="true" @submit="submit" class="flex flex-col gap-4 w-full">
    <div class="flex flex-col gap-1">
      <FloatLabel variant="on">
        <InputText id="title" name="title" fluid />
        <label for="title">Titre</label>
      </FloatLabel>

      <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error.message }}</Message>
    </div>

    <div class="flex flex-col gap-1">
      <FloatLabel variant="on">
        <DatePicker
            id="start_date"
            name="start_date"
            :minDate="new Date()"
            dateFormat="dd/mm/yy"
            fluid
            showIcon
            iconDisplay="input"
            :pt="{
              panel: { style: 'max-width: 30px' } // largeur auto, avec un minimum
            }"
        />
        <label for="start_date">Date de début</label>
      </FloatLabel>

      <Message v-if="$form.start_date?.invalid" severity="error" size="small" variant="simple">{{ $form.start_date.error.message }}</Message>
    </div>

    <div class="flex flex-col gap-1">
      <FloatLabel variant="on">
        <DatePicker
            id="end_date"
            name="end_date"
            dateFormat="dd/mm/yy"
            fluid
            showIcon
            iconDisplay="input"
            :pt="{
              panel: { class: 'w-auto min-w-[16rem]' } // largeur auto, avec un minimum
            }"
        />
        <label for="end_date">Date de fin</label>
      </FloatLabel>

      <Message v-if="$form.end_date?.invalid" severity="error" size="small" variant="simple">{{ $form.end_date.error.message }}</Message>
    </div>

    <div class="flex flex-col gap-1">
      <FloatLabel variant="on">
        <AutoComplete
            v-model="selectedCountry"
            inputId="country_code"
            :suggestions="countrySuggestions"
            :loading="loadingCountries"
            optionLabel="name"
            :forceSelection="true"
            @complete="onCountryComplete"
            fluid
            name="country_code"
        >
          <template #option="{ option }">
            <span class="mr-2">{{ option.flag }}</span>
            <span>{{ option.name }}</span>
          </template>
        </AutoComplete>
        <label for="country_code">Pays</label>
      </FloatLabel>

      <Message v-if="$form.country_code?.invalid" severity="error" size="small" variant="simple">{{ $form.country_code.error.message }}</Message>
    </div>

    <div class="flex flex-col gap-1">
      <FloatLabel variant="on">
        <Textarea id="description" rows="5" name="description" fluid />
        <label for="description">Description</label>
        <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">{{ $form.description.error.message }}</Message>
      </FloatLabel>
    </div>

    <div class="flex justify-between">
      <Button type="button" severity="secondary" @click="goBack">Retour</Button>
      <Button type="submit">Enregistrer</Button>
    </div>
  </Form>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

import {addTrip} from "../db.js";

import {Form} from '@primevue/forms';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import DatePicker from 'primevue/datepicker';
import AutoComplete from 'primevue/autocomplete';
import Textarea from 'primevue/textarea';

import H1 from "@/components/H1.vue";

const router = useRouter();

const initialValues = {
  title: "",
  start_date: "",
  end_date: "",
  country_code: "",
  description: "",
};

const selectedCountry = ref(null);
const countrySuggestions = ref([]);
const loadingCountries = ref(false);
const submitting = ref(false);

function goBack() {
  if (history.length > 1) router.back();
  else router.push("/trips");
}

const resolver = ({ values }) => {
  const errors = {};
  const title = String(values.title ?? '').trim();
  const startDate = values.start_date;
  const endDate = values.end_date;
  const country = values.country_code;

  if (!title) {
    errors.title = [{ type: 'required', message: 'Le titre est obligatoire' }];
  }

  if (!startDate) {
    errors.start_date = [{type: 'required', message: 'La date de début est obligatoire'}];
  }

  if (!endDate) {
    errors.end_date = [{type: 'required', message: 'La date de fin est obligatoire'}];
  }

  if (startDate && endDate && endDate < startDate) {
    errors.end_date = [{type: 'invalid', message: 'La date de fin doit être supérieure à la date de début'}];
  }

  if (!country) {
    errors.country_code = [{type: 'required', message: 'Le pays est obligatoire'}];
  }

  return { values, errors };
};


async function onCountryComplete(event) {
  const query = String(event?.query ?? '').trim();

  if (!query) {
    countrySuggestions.value = [];
    return;
  }

  loadingCountries.value = true;
  try {
    // Rest Countries: recherche par nom
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fields=cca2,name,flag`;
    const res = await fetch(url);
    if (!res.ok) {
      countrySuggestions.value = [];
      return;
    }
    const data = await res.json();

    countrySuggestions.value = (Array.isArray(data) ? data : [])
        .map(c => ({
          code: c.cca2,
          name: c.name?.common ?? '',
          flag: c.flag ?? ''
        }))
        .filter(c => c.code && c.name)
        .sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error(e);
    countrySuggestions.value = [];
  } finally {
    loadingCountries.value = false;
  }
}


async function submit({values}) {
  // // Validation simple: date fin >= date début
  // if (form.startDate && form.endDate && form.endDate < form.startDate) {
  //   alert("La date de fin doit être supérieure à la date de début.");
  //   return;
  // }
  //
  // submitting.value = true;
  // try {
  //   await addTrip({
  //     // Titre optionnel si vous en ajoutez plus tard
  //     title: form.title,
  //     startDate: form.startDate,
  //     endDate: form.endDate,
  //     countryCode: form.countryCode,
  //     description: form.description
  //   });
  //   router.push("/trips/");
  // } finally {
  //   submitting.value = false;
  // }

}
</script>