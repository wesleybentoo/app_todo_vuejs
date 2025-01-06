<template>
  <q-page padding class="flex flex-center bg-grey-1">
    <q-card flat bordered class="login-card q-pa-lg shadow-3">
      <!-- Título -->
      <q-card-section class="text-center q-pb-md">
        <div class="text-h5 text-primary">Login</div>
      </q-card-section>

      <!-- Formulário -->
      <q-form
        ref="loginForm"
        class="q-pa-md"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        @submit="submitLogin"
      >
        <q-card-section>
          <!-- Campo de Email -->
          <q-input
            v-model="email"
            outlined
            type="email"
            label="Email"
            lazy-rules
            class="q-mb-md"
          />
          <!-- Campo de Senha -->
          <q-input
            outlined
            v-model="password"
            label="Senha"
            :type="isPwd ? 'password' : 'text'"
            class="q-mb-md"
          >
            <template v-slot:append>
              <q-icon
                name="visibility"
                @click="isPwd = !isPwd"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <div v-if="errorMessage" class="alert q-mb-md">
            {{ errorMessage }}
          </div>

          <!-- Botão de Entrar -->
          <q-btn
            color="primary"
            label="Entrar"
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

          <!-- Link para criar conta -->
          <div class="text-center text-caption text-grey-7 q-mt-sm">
            Não tem uma conta?
            <q-btn flat label="Criar uma conta" color="primary" @click="redirectToSignup" />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { userStore } from "src/stores/user";
import { router } from 'src/router'

const user_store = userStore();

const email = ref(null);
const password = ref(null);
const isPwd = ref(true);
const submitting = ref(false);
const loginForm = ref(null);
const errorMessage = ref(null);

const submitLogin = async () => {
  try {
    submitting.value = true;
    errorMessage.value = null;

    if (!email.value || !password.value) {
      submitting.value = false;
      errorMessage.value = 'Preencha os campos acima';
      return;
    }
    const response = await user_store.loginUser(email.value, password.value);
    if (response.status !== 200) {
      errorMessage.value = response?.response?.data?.message || 'Usuário ou senha incorretos'
    }

    submitting.value = false;
  } catch (error) {
    console.log(error);
    submitting.value = false;
  }
};

const redirectToSignup = () => {
  router.push('/register')
};
</script>

<style lang="scss" scoped>
.login-card {
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
