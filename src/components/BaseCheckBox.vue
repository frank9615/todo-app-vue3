<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    value: any;
}>();

const value = ref(props.value);

const emit = defineEmits(['checked']);

watch(() => value.value, (state) => {
    console.log("Cambio di stato");
    emit('checked', {
        value: props.value,
        checked: state
    });
});

</script>

<template>
    <input type="checkbox" :value="value" v-model="value"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
</template>

<style scoped></style>