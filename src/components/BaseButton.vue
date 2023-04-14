<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
    type: string;
    disabled: boolean
}>();

// define the events that this component emits
const emit = defineEmits(['click']);

const handleClick = () => {
    emit("click");
}

const classValue = ref("")

onMounted(() => {
    switch (props.type) {
        case "text":
            classValue.value = "h-10 px-5 text-gray-800 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-gray-200";
            break;
        case "outline":
            classValue.value = "h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100";
            break;
        case "solid":
            classValue.value = "h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700";
            break;
        default:
            classValue.value = "h-10 px-5 text-gray-800 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-gray-200";
            break;
    }
});


</script>

<template>
    <button type="button" :class="classValue" @click="handleClick" :disabled="props.disabled">
        <slot name="textButton"></slot>
    </button>
</template>

