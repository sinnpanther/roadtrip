<template>
  <div class="flex items-center justify-between mb-4">
    <H1 :title="trip.title" />

    <Button type="button" text icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
      <template #item="{ item, props }">
        <!-- Lien interne -->
        <router-link v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
  </div>
  <ConfirmDialog />
</template>

<script setup>
import { ref, onMounted, computed} from "vue";
import { useRouter, useRoute } from "vue-router";

import { getTrips, deleteTrip } from "../db.js";

import Button from 'primevue/button';
import Menu from 'primevue/menu';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

import H1 from "@/components/H1.vue";

const router = useRouter();
const route = useRoute();
const trip = ref({ id: null, title: "" });
const confirm = useConfirm();
const menu = ref(null)
const toggle = (event) => {
  menu.value?.toggle(event)
}

onMounted(async () => {
  const trips = await getTrips();
  const t = trips.find(t => t.id === route.params.id);
  if (t) trip.value = { ...t };
});

const items = computed(() => {

  return [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      route: { name: 'TripEdit', params: { id: trip.value.id } },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      route: '',
      command: () => confirmDelete(),
    },
  ]
});

// Supprimer le trip avec confirmation (ConfirmDialog)
function confirmDelete() {
  const id = trip.value.id ?? route.params.id;
  confirm.require({
    header: "Êtes-vous sûr de vouloir supprimer ce voyage ?",
    message: "Cette action est irréversible.",
    icon: "pi pi-exclamation-triangle",
    rejectLabel: "Annuler",
    acceptLabel: "Supprimer",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-secondary",
    rejectProps: {variant: "outlined"},
    accept: async () => {
      if (!id) return;

      deleteTrip(trip.value.id).then(() => {
        router.push("/");
      });
    },
  });
}
</script>
