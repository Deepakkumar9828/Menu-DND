<template>
    <button class="custom-button" @click="$emit('submit')">
        {{ name }}
    </button>
</template>

<script lang="ts">
export default {
    props: ["name"]
};
</script>

<style scoped>
.custom-button {
    color: black;
    padding: 0px 12px;
    background: #e9e2e2;
    border-radius: 4px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background 0.3s ease-in-out, transform 0.2s;
}

.custom-button:hover {
    background: #d6cfcf;
    transform: scale(1.05);
}
</style>
