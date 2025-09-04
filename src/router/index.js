import { createRouter, createWebHistory } from "vue-router";
import TripList from "../views/TripList.vue";
import TripNew from "../views/TripNew.vue";
import TripShow from "../views/TripShow.vue";
import TripEdit from "../views/TripEdit.vue";

const routes = [
    { path: "/trips", name: "Trips", component: TripList },
    { path: "/trips/new", name: "TripNew", component: TripNew },
    { path: "/trips/:id/show", name: "TripShow", component: TripShow, props: true },
    { path: "/trips/:id/edit", name: "TripEdit", component: TripEdit, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
