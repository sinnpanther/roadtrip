import localforage from "localforage";

// Configuration de localForage
localforage.config({
    name: "tripApp",
    storeName: "trips"
});

// --- Utils ---
async function getAllTrips() {
    return (await localforage.getItem("trips")) || [];
}

async function saveTrips(trips) {
    await localforage.setItem("trips", trips);
}

// --- CRUD Trips ---
export async function addTrip(input) {
    const trips = await getAllTrips();
    const base = (typeof input === "string") ? { title: input } : (input || {});

    const newTrip = {
        id: crypto.randomUUID(),
        title: base.title ?? "",
        description: base.description ?? "",
        start_date: base.start_date ?? null,
        end_date: base.end_date ?? null,
        country_code: base.country_code ?? "",
        days: []
    };

    trips.push(newTrip);
    await saveTrips(trips);
    return newTrip;
}

export async function getTrip(id) {
    const trips = await getAllTrips();
    return trips.find(t => t.id === id) || null;
}

export async function getTrips() {
    return await getAllTrips();
}

export async function updateTrip(id, updates) {
    const trips = await getAllTrips();
    const trip = trips.find(t => t.id === id);
    if (!trip) return null;

    Object.assign(trip, updates);
    await saveTrips(trips);
    return trip;
}

export async function deleteTrip(id) {
    let trips = await getAllTrips();
    trips = trips.filter(t => t.id !== id);
    await saveTrips(trips);
}

// --- CRUD Days ---
export async function addDay(tripId, date) {
    const trips = await getAllTrips();
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return null;

    const newDay = {
        id: crypto.randomUUID(),
        date,
        notes: []
    };

    trip.days.push(newDay);
    await saveTrips(trips);
    return newDay;
}

export async function updateDay(tripId, dayId, updates) {
    const trips = await getAllTrips();
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return null;

    const day = trip.days.find(d => d.id === dayId);
    if (!day) return null;

    Object.assign(day, updates);
    await saveTrips(trips);
    return day;
}

export async function deleteDay(tripId, dayId) {
    const trips = await getAllTrips();
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return null;

    trip.days = trip.days.filter(d => d.id !== dayId);
    await saveTrips(trips);
}

// --- CRUD Notes ---
export async function addNote(tripId, dayId, text, imageBlob) {
    const trips = await getAllTrips();
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return null;

    const day = trip.days.find(d => d.id === dayId);
    if (!day) return null;

    const newNote = {
        id: crypto.randomUUID(),
        text,
        image: imageBlob ? URL.createObjectURL(imageBlob) : null
    };

    day.notes.push(newNote);
    await saveTrips(trips);
    return newNote;
}

export async function updateNote(tripId, dayId, noteId, updates) {
    const trips = await getAllTrips();
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return null;

    const day = trip.days.find(d => d.id === dayId);
    if (!day) return null;

    const note = day.notes.find(n => n.id === noteId);
    if (!note) return null;

    Object.assign(note, updates);
    await saveTrips(trips);
    return note;
}

export async function deleteNote(tripId, dayId, noteId) {
    const trips = await getAllTrips();
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return null;

    const day = trip.days.find(d => d.id === dayId);
    if (!day) return null;

    day.notes = day.notes.filter(n => n.id !== noteId);
    await saveTrips(trips);
}
