<template>
  <q-dialog :model-value="modelValue" @update:model-value="closeModal" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">{{ isEdit ? "Editar Tarefa" : "Nova Tarefa" }}</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="taskData.name"
          label="Nome da Tarefa"
          dense
          outlined
          class="q-mb-md"
        />
        <q-input
          v-model="taskData.description"
          label="Descrição"
          type="textarea"
          dense
          outlined
          class="q-mb-md"
        />
        <q-select
          v-model="taskData.status_id"
          :options="statusOptions"
          label="Status"
          option-value="id"
          option-label="label"
          dense
          outlined
          class="q-mb-md"
        />
        <q-select
          v-model="taskData.category_id"
          :options="categoryOptions"
          label="Categoria"
          option-value="id"
          option-label="label"
          dense
          outlined
          class="q-mb-md"
        />
        <q-input
          v-model="taskData.due_date"
          label="Data de Conclusão"
          type="date"
          dense
          outlined
          class="q-mb-md"
        />

        <div v-if="errorMessage" class="alert q-mb-md">
          {{ errorMessage }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" @click="closeModal" />
        <q-btn flat label="Salvar" color="primary" @click="saveTask" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, toRaw } from "vue"
import { taskStore } from 'src/stores/task'

const task_store = taskStore()
const errorMessage = ref(null)

const props = defineProps({
  modelValue: Boolean,
  task: Object,
  statusOptions: {
    type: Array,
    default: () => [],
  },
  categoryOptions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["update:modelValue", "save"])

const taskData = ref({
  id: null,
  name: "",
  description: "",
  status_id: null,
  category_id: null,
  due_date: "",
})

const isEdit = ref(false)

const closeModal = () => {
  emit("closeModal", false)
}

const saveTask = async () => {
  try {
    if (
      !taskData.value.name ||
      !taskData.value.description ||
      !taskData.value.status_id ||
      !taskData.value.category_id ||
      !taskData.value.due_date
    ) {
      errorMessage.value = 'Preencha todos os campos corretamente'
      return
    }
    errorMessage.value = null;

    let response;
    if (props.task?.id) {
      response = await task_store.setUpdated(props.task?.id, toRaw(taskData.value))
    } else {
      response = await task_store.setCreated(toRaw(taskData.value))
    }

    if (response?.status === 201 || response?.status === 200) {
      emit("save", taskData.value)
      closeModal()
    } else {
      errorMessage.value = response?.message + ' - ' + response?.error
    }
  } catch (error) {
    errorMessage.value = error
  }
}

watch(
  () => props.modelValue,
  () => {
    errorMessage.value = null
    isEdit.value =  !!props.task?.id
    taskData.value.id = props.task?.id || null
    taskData.value.name = props.task?.name || null
    taskData.value.description = props.task?.description || null
    taskData.value.status_id = props.task?.status ? {id:props.task?.status.id, label: props.task?.status.name} : null
    taskData.value.category_id = props.task?.category ? {id:props.task?.category.id, label: props.task?.category.name} : null
    taskData.value.due_date = props.task?.due_date || null
  },
  { immediate: true }
);



</script>

<style>
.alert {
  padding: 10px;
  border: 1px solid #ff4d4f;
  background-color: #fff1f0;
  color: #cf1322;
  border-radius: 4px;
  text-align: center;
}
</style>
