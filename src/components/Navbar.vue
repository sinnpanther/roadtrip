<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
      <!-- Lien interne -->
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <!-- Lien externe -->
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
    </template>
  </Menubar>
</template>

<script setup>
import { ref } from 'vue';
import Menubar from 'primevue/menubar';

const items = ref([
  {
    label: 'Accueil',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: 'Voyages',
    icon: 'pi pi-compass',
    route: '/trips'
  },
  // {
  //   label: 'Ressources',
  //   icon: 'pi pi-folder',
  //   items: [
  //     {
  //       label: 'Docs Menubar',
  //       icon: 'pi pi-book',
  //       url: 'https://www.primefaces.org/primevue/menubar'
  //     },
  //     {
  //       separator: true
  //     },
  //     {
  //       label: 'GitHub',
  //       icon: 'pi pi-github',
  //       url: 'https://github.com/',
  //       target: '_blank'
  //     }
  //   ]
  // },
  // {
  //   label: 'Contact',
  //   icon: 'pi pi-envelope',
  //   route: '/contact'
  // }
]);
</script>
