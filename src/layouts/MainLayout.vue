<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          ToDo App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Olá, {{ user.name }}
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <LogoutButton/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import {userStore} from 'src/stores/user'
import EssentialLink from 'src/components/EssentialLink.vue'
import LogoutButton from 'src/components/LogoutButton.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'quasar.dev',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Task',
    caption: 'Minhas tarefas',
    icon: 'list',
    link: '/tasks'
  },
 /* {
    title: 'Categorias',
    caption: 'Minhas categorias',
    icon: 'list',
    link: '/categories'
  },
  {
    title: 'Status',
    caption: 'Meus status',
    icon: 'list',
    link: '/status'
  },*/
]

const leftDrawerOpen = ref(false)

const user_store = userStore()

const user = ref(user_store)

console.log(user_store)
console.log("User Store", user)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
