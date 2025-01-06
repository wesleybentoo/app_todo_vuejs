<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar :icon="icon" :color="iconColor" text-color="white" />
        <span class="q-ml-sm">{{ message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="cancel" />
        <q-btn flat :label="confirmButtonLabel" :color="confirmButtonColor" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean, // Para controlar a abertura do diálogo
  message: { type: String, default: 'Tem certeza que deseja continuar?' },
  icon: { type: String, default: 'warning' },
  iconColor: { type: String, default: 'red' },
  confirmButtonLabel: { type: String, default: 'Confirmar' },
  confirmButtonColor: { type: String, default: 'negative' },
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const isOpen = ref(props.modelValue);

// Sincroniza `modelValue` com `isOpen`
watch(
  () => props.modelValue,
  (newVal) => {
    isOpen.value = newVal;
  }
);

watch(
  () => isOpen.value,
  (newVal) => {
    emit('update:modelValue', newVal);
  }
);

// Emite eventos ao confirmar ou cancelar
const confirm = () => {
  emit('confirm');
  isOpen.value = false;
};

const cancel = () => {
  emit('cancel');
  isOpen.value = false;
};
</script>
