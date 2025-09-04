<template>
  <div class="flex items-center justify-between mb-4">
    <H1 title="Mes voyages" />

    <Button asChild v-slot="slotProps">
      <RouterLink :to="{ name: 'TripNew' }" :class="[slotProps.class, 'ml-4']" title="Create new trip">
        <i class="pi pi-plus"></i><span class="hidden sm:block">Créer nouveau</span>
      </RouterLink>
    </Button>
  </div>


  <!-- Trip List -->
  <div v-if="trips.length > 0">
    <Card v-for="trip in trips" :key="trip.id" class="w-full overflow-hidden mb-4">
      <template #title>{{ trip.title }}</template>
      <template #subtitle>{{ formatDate(trip.start_date) }} - {{ formatDate(trip.end_date) }}</template>
      <template #content>
        <p class="m-0">
          {{ trip.description }}
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button asChild v-slot="slotProps" size="small">
            <RouterLink :to="{ name: 'TripShow', params: { id: trip.id } }" :class="[slotProps.class]" title="Voir le voyage">
              <i class="pi pi-external-link"></i>
            </RouterLink>
          </Button>
          <Button icon="pi pi-trash" severity="danger" size="small" />
        </div>
      </template>
    </Card>
  </div>

  <p v-else class="">Aucun voyage trouvé. Créez-en un !</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getTrips } from "../db.js";

import Button from "primevue/button";
import Card from "primevue/card";

import H1 from "@/components/H1.vue";
import { formatDate } from '@/utils/dates';

const trips = ref([]);
const router = useRouter();

onMounted(async () => {
  trips.value = await getTrips();
});
</script>
