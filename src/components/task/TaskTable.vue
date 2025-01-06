<template>
  <q-table
    :rows="paginatedTasks"
    :columns="columns"
    :rows-per-page-options="[5, 10, 15]"
    flat
    bordered
    row-key="id"
    :pagination="localPagination"
  >
    <template v-slot:body-cell-actions="props">
      <q-btn icon="edit" color="primary" dense @click="$emit('edit', props.row)" />
      <q-btn icon="delete" color="negative" dense @click="$emit('delete', props.row.id)" />
    </template>
  </q-table>
</template>

<script setup>
import { ref, computed, watch, onUpdated, onMounted } from 'vue';

const props = defineProps({
  tasks: { type: Array, required: true },
  pagination: { type: Object, required: true },
});

const emit = defineEmits(['updatePagination', 'edit', 'delete']);

const columns = ref([
  { name: 'name', required: true, label: 'Título', align: 'left', field: 'name', sortable: true },
  { name: 'status', label: 'Status', align: 'left', field: row => row.status?.name || 'N/A', sortable: true },
  { name: 'category', label: 'Categoria', align: 'left', field: row => row.category?.name || 'N/A', sortable: true },
  { name: 'created_at', label: 'Data de Criação', align: 'left', field: row => {
      const date = new Date(row.created_at);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }, sortable: true },
  { name: 'actions', label: 'Ações', align: 'center' },
]);



const paginatedTasks = computed(() => {
  console.log("mexi aqui ??")
  const start = (localPagination.value.page - 1) * localPagination.value.rowsPerPage;
  const end = start + localPagination.value.rowsPerPage;
  return props.tasks.slice(start, end);

});

const localPagination = ref({ ...props.pagination });

/*const localPagination = ref({
  page: props.pagination.page || 1,
  rowsPerPage: props.pagination.rowsPerPage || 5,
  rowsNumber: props.tasks.length, // Número total de linhas (tarefas)
});*/

watch(localPagination, (newVal) => {
  emit('updatePagination', newVal);
});

watch(() => props.tasks, (newTasks) => {
  localPagination.value.rowsNumber = newTasks.length;
});

onUpdated(() => {
  localPagination.value.rowsNumber = props.tasks.length;
})

onMounted(() => {
  localPagination.value.rowsNumber = props.tasks.length;
});
</script>
