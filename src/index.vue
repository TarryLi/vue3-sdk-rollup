<template>
  <button @click="open = true" :class="style.btn">Open Modal</button>
  <Teleport to="body">
    <div v-if="open" :class="style.modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from "vue";
import style from "./index.module.scss";

const open = ref(false);

onMounted(() => {
  const self = getCurrentInstance();

  console.log(self)
});
</script>
