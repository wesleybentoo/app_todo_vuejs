<template>
  <q-item
    clickable
    tag="a"
    @click='setLogout'
  >
    <q-item-section
      avatar
    >
      <q-icon name="logout" />
    </q-item-section>

    <q-item-section>
      <q-item-label>Logout</q-item-label>
      <q-item-label caption>Sair do App</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { userStore } from 'src/stores/user';
const user_store = userStore()

const setLogout = () => {
  console.log("acionado")
  user_store.logOut()
}
</script>
