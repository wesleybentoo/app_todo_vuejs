<template>
  <q-page padding class="flex flex-center bg-grey-1">
    <q-card v-if='!successRegister' flat bordered class="register-card q-pa-lg shadow-3">
      <q-card-section class="text-center q-pb-md">
        <div class="text-h5 text-primary">Registrar</div>
      </q-card-section>
      <div v-if="errorMessage" class="alert q-mb-md">
        {{ errorMessage }}
      </div>
      <q-form
        ref="registerForm"
        class="q-pa-md"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        @submit="submitRegister"
      >
        <q-card-section>
          <!-- Nome -->
          <q-input
            v-model="name"
            outlined
            label="Nome"
            lazy-rules
            class="q-mb-md"
            :rules="[validateName]"
          />

          <!-- Email -->
          <q-input
            v-model="email"
            outlined
            type="email"
            label="Email"
            lazy-rules
            class="q-mb-md"
            :rules="[validateEmail]"
          />

          <!-- Senha -->
          <q-input
            v-model="password"
            outlined
            label="Senha"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            class="q-mb-md"
            :rules="[validatePassword]"
          >
            <template v-slot:append>
              <q-icon
                name="visibility"
                @click="isPwd = !isPwd"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <!-- Confirmação da Senha -->
          <q-input
            v-model="confirmPassword"
            outlined
            label="Confirme a Senha"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            class="q-mb-md"
            :rules="[validateConfirmPassword]"
          >
            <template v-slot:append>
              <q-icon
                name="visibility"
                @click="isPwd = !isPwd"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <!-- Botão de Registrar -->
          <q-btn
            color="primary"
            label="Registrar"
            size="md"
            padding="md"
            type="submit"
            class="full-width q-mb-md"
            :loading="submitting"
          >
            <template #loading>
              <q-spinner />
            </template>
          </q-btn>

          <!-- Link para voltar ao login -->
          <div class="text-center text-caption text-grey-7 q-mt-sm">
            Já tem uma conta?
            <q-btn flat label="Voltar para login" color="primary" @click="redirectToLogin" />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
    <q-card v-if='successRegister' flat bordered class="success-card q-pa-lg shadow-3">
      <!-- Ícone de Sucesso -->
      <q-card-section class="text-center q-pb-md">
        <q-icon name="check_circle" color="green" size="56px" />
      </q-card-section>

      <!-- Mensagem de Sucesso -->
      <q-card-section class="text-center q-pb-md">
        <div class="text-h5 text-green-7">Cadastro Realizado com Sucesso!</div>
        <div class="text-body2 text-grey-7 q-mt-sm">
          Parabéns! Sua conta foi criada e agora você pode fazer login no sistema.
        </div>
      </q-card-section>

      <!-- Botões -->
      <q-card-actions align="center">
        <q-btn
          color="primary"
          label="Fazer Login"
          size="md"
          padding="md"
          @click="redirectToLogin"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { router } from 'src/router'
import { userStore } from 'src/stores/user'

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isPwd = ref(true);
const submitting = ref(false);
const errorMessage = ref("");
const successRegister = ref(false);
const user_store = userStore();

// Função para validar o nome
const validateName = (value) => {
  return value && value.length >= 4 || "O nome deve ter pelo menos 4 caracteres.";
};

// Função para validar o email
const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Email inválido.";
};

// Função para validar a senha
const validatePassword = (value) => {
  return value && value.length >= 6 || "A senha deve ter pelo menos 6 caracteres.";
};

// Função para validar a confirmação da senha
const validateConfirmPassword = (value) => {
  return value === password.value || "As senhas não coincidem.";
};

// Submeter o registro
const submitRegister = async () => {
  errorMessage.value = ""; // Limpa mensagens de erro
  try {
    submitting.value = true;

    // Valida os campos localmente
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
      errorMessage.value = "Todos os campos são obrigatórios.";
      submitting.value = false;
      return;
    }

    if (password.value !== confirmPassword.value) {
      errorMessage.value = "As senhas não coincidem.";
      submitting.value = false;
      return;
    }
    const response = await user_store.register(name.value, email.value, password.value);
    if (response?.user) {
      successRegister.value = true
    } else {
      // Verifica se o erro contém um objeto `errors`
      if (response.response?.data?.errors) {
        const errors = response.response.data.errors;
        const messages = [];
        for (const key in errors) {
          if (Array.isArray(errors[key])) {
            messages.push(...errors[key]);
          }
        }
        errorMessage.value = messages.join("\n");
      } else {
        errorMessage.value = response.response?.data?.message || "Erro ao registrar o usuário.";
      }
    }
    submitting.value = false;

    // Redirecionar após o sucesso
    //router.push("/login");
  } catch (error) {
    submitting.value = false;
    errorMessage.value = error.message || "Erro ao registrar o usuário.";
  }
};


const redirectToLogin = () => {
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.register-card {
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
}
.alert {
  padding: 10px;
  border: 1px solid #ff4d4f;
  background-color: #fff1f0;
  color: #cf1322;
  border-radius: 4px;
  text-align: center;
}
</style>
