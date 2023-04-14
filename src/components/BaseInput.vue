<script setup  lang="ts">
import { ref } from "vue";

const content = ref("");

const emit = defineEmits(["input"]);

const handleInput = (e: any) => {
    emit("input", content.value);
};

</script>

<template>
    <input type="text" class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        placeholder="Inserisci Todo..." v-model="content" @input="handleInput">
</template>

