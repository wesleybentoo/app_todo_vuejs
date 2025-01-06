<template>
  <div class="task-filter q-px-md q-py-sm">
    <!-- Campo de pesquisa -->
    <div class="row q-col-gutter-sm">
      <q-input
        color="primary"
        filled
        v-model="search"
        label="Pesquisar.."
        @update:model-value="emitSearch"
        class="col-12 col-md-12"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <!-- Filtros e Botão -->
    <div class="row q-mt-md q-col-gutter-sm">
      <!-- Filtro por status -->
      <q-select
        filled
        dense
        v-model="status"
        label="Filtrar por Status"
        :options="statusOptions"
        class="col-12 col-md-3"
        @update:model-value="emitFilterStatus"
      />

      <!-- Filtro por categoria -->
      <q-select
        filled
        dense
        v-model="category"
        label="Filtrar por Categoria"
        :options="categoryOptions"
        class="col-12 col-md-3"
        @update:model-value="emitFilterCategory"
      />

      <!-- Ordenação -->
      <q-select
        filled
        dense
        v-model="sort"
        label="Ordenar"
        :options="sortOptions"
        class="col-12 col-md-3"
        @update:model-value="emitSort"
      />

      <!-- Botão de Nova Tarefa -->
      <q-btn
        color="primary"
        label="+ Nova Tarefa"
        class="col-12 col-md-3 q-mt-xs q-mt-md-none"
        @click="emitOpenModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";

// Props
const props = defineProps({
  statusOptions: {
    type: Array,
    default: () => [{id: 0, label: 'Todos'}],
  },
  categoryOptions: {
    type: Array,
    default: () => [{id: 0, label: 'Todas'}],
  },
  sortOptions: {
    type: Array,
    default: () => [
      { label: "Título (A-Z)", value: { field: "name", order: "asc" } },
      { label: "Título (Z-A)", value: { field: "name", order: "desc" } },
      { label: "Data (mais antiga)", value: { field: "due_date", order: "asc" } },
      { label: "Data (mais recente)", value: { field: "due_date", order: "desc" } },
    ],
  },
});

// Eventos emitidos
const emit = defineEmits(["search", "filterStatus", "filterCategory", "sort", "openModal"]);

// Estados locais
const search = ref("");
const status = ref("");
const category = ref("");
const sort = ref("");

// Métodos para emitir eventos
const emitSearch = () => emit("search", search.value);
const emitFilterStatus = () => emit("filterStatus", status.value);
const emitFilterCategory = () => emit("filterCategory", category.value);
const emitSort = () => emit("sort", sort.value);
const emitOpenModal = () => emit("openModal", true);

onUpdated(() => {
  if (!status.value) {
    status.value = props.statusOptions[0]
  }
  if (!category.value) {
    category.value = props.categoryOptions[0]
  }
  if (!sort.value ) {
    sort.value = props.sortOptions[0]
  }
})
</script>
