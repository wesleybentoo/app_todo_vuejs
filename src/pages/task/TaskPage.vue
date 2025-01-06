<template>
  <q-page class="task-page">
    <q-card flat bordered class="q-px-md q-py-sm">
      <!-- Filtro e Pesquisa -->
      <TaskFilter
        :statusOptions="[{ id: 0, label: 'Todos' }, ...statusOptions]"
        :categoryOptions="[{ id: 0, label: 'Todas' }, ...categoryOptions]"
        :sortOptions="sortOptions"
        @search="setSearch"
        @filterStatus="setFilterStatus"
        @filterCategory="setFilterCategory"
        @sort="setSort"
        @openModal='openCloseModal'
      />

      <!-- Tabela de Tarefas -->
      <TaskTable
        :tasks="filteredTasks"
        :pagination="pagination"
        @updatePagination="updatePagination"
        @edit="openEditModal"
        @delete="deleteTask"
      />
    </q-card>

    <!-- Modal para Criar/Editar -->
    <TaskModal
      :modelValue="isModalOpen"
      :task="selectedTask"
      :statusOptions="statusOptions"
      :categoryOptions="categoryOptions"
      @save="saveTask"
      @closeModal='openCloseModal'
    />

    <!-- ConfirmDialog Component -->
    <ConfirmDialog
      v-model="confirmDialog.open"
      message="Tem certeza que deseja deletar esta tarefa?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, toRaw } from 'vue';
import TaskFilter from 'src/components/task/TaskFilter.vue';
import TaskTable from 'src/components/task/TaskTable.vue';
import TaskModal from 'src/components/task/TaskModal.vue';
import ConfirmDialog from 'src/components/ConfirmDialog.vue';
import { statusStore } from 'src/stores/status'
import { categoriesStore } from 'src/stores/categories'
import { taskStore } from 'src/stores/task'

const search = ref('');
const filterStatus = ref(null);
const filterCategory = ref(null);
const sortField = ref('');
const sortOrder = ref('asc');
const pagination = ref({ page: 1, rowsPerPage: 5 });

const isModalOpen = ref(false);
const selectedTask = ref(null);

const status_store = statusStore()
const categories_store = categoriesStore()
const tasks_store = taskStore()

// Opções de Status e Categorias
const statusOptions = ref([]);

const categoryOptions = ref([]);

const sortOptions = ref([
  { label: "Título (A-Z)", value: { field: "name", order: "asc" } },
  { label: "Título (Z-A)", value: { field: "name", order: "desc" } },
  { label: "Data (mais antiga)", value: { field: "due_date", order: "asc" } },
  { label: "Data (mais recente)", value: { field: "due_date", order: "desc" } },
]);

// Dados das tarefas
const tasks = ref([
  { id: 1, name: "Finalizar Documentação", description: "Completar a entrega final.", status_id: 1, category_id: 1, due_date: "2025-01-15" },
  { id: 2, name: "Estudar Vue.js", description: "Praticar com Composition API.", status_id: 2, category_id: 3, due_date: "2025-01-20" },
  { id: 3, name: "Organizar Arquivos", description: "Limpar o computador.", status_id: 3, category_id: 2, due_date: "2025-01-25" },
]);

onMounted(() => {
  getStatusOption()
  getCategoriesOption()
  getTasksTable()
})

// Computed: Filtrar e ordenar tarefas
const filteredTasks = computed(() => {
  let result = [...tasks.value];

  // Filtro por busca
  if (search.value) {
    result = result.filter((task) =>
      task.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  // Filtro por status
  if (filterStatus.value && filterStatus.value.id !== 0) {
    result = result.filter((task) => task.status_id === filterStatus.value.id);
  }

  // Filtro por categoria
  if (filterCategory.value && filterCategory.value.id !== 0) {
    result = result.filter((task) => task.category_id === filterCategory.value.id);
  }

  // Ordenação
  if (sortField.value) {
    result.sort((a, b) => {
      const aValue = a[sortField.value];
      const bValue = b[sortField.value];
      if (sortOrder.value === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  return result;
});

// Métodos para manipular eventos
const setSearch = (value) => {
  search.value = value;
};

const setFilterStatus = (value) => {
  filterStatus.value = toRaw(value);
};

const setFilterCategory = (value) => {
  filterCategory.value = value;
};

const setSort = ({ field, order }) => {
  sortField.value = field;
  sortOrder.value = order;
};

const updatePagination = (newPagination) => {
  pagination.value = newPagination;
};

const openEditModal = (task) => {
  selectedTask.value = task;
  isModalOpen.value = true;
};

const openCloseModal = (val) => {
  isModalOpen.value = val;
  if (!val) {
    selectedTask.value = null
  }
};

const saveTask = (task) => {
  console.log(task)
  getTasksTable()
};

const getStatusOption = async () => {
  try {
    const response = await status_store.getAll();
    if (response?.statuses) {
      const transformedStatuses = response.statuses.map((status) => {
        return {
          id: status.id,
          label: status.name
        };
      });
      statusOptions.value = transformedStatuses
      filterStatus.value = { "id": 0, "label": "Todos" }
    } else {
      statusOptions.value = [{ id: 0, label: 'Todos' }];
    }
  } catch (error) {
    console.log(error);
    statusOptions.value = [{ id: 0, label: 'Todos' }];
  }
};

const getCategoriesOption = async () => {
  try {
    const response = await categories_store.getAll();
    if (response?.categories) {
      const transformedCategories = response.categories.map((categories) => {
        return {
          id: categories.id,
          label: categories.name
        };
      });
      categoryOptions.value = transformedCategories
      //filterStatus.value =
    } else {
      categoryOptions.value = [{ id: 0, label: 'Todas' }];
    }
  } catch (error) {
    console.log(error);
    statusOptions.value = [{ id: 0, label: 'Todas' }];
  }
};

const getTasksTable = async () => {
  try {
    const response = await tasks_store.getAll();
    if (response?.tasks) {
      tasks.value = response.tasks
    }
  } catch (error) {
    console.log(error)
  }
}


// Configuração do diálogo de confirmação
const confirmDialog = ref({
  open: false, // Estado do diálogo
  taskId: null, // ID da tarefa a ser deletada
});

// Abre o diálogo de confirmação
const deleteTask = (id) => {
  confirmDialog.value.taskId = id;
  confirmDialog.value.open = true;
};

// Confirma a exclusão
const confirmDelete = async () => {
  const taskId = confirmDialog.value.taskId;
  try {
    const response = await tasks_store.setDeleted(taskId);
    if (response.status === 200) {
      confirmDialog.value.open = false
      await getTasksTable();
    }
  } catch (error) {
    console.log(error)
    cancelDelete()
  }
};

// Cancela a exclusão
const cancelDelete = () => {
  confirmDialog.value.open = false; // Apenas fecha o diálogo
};
</script>
