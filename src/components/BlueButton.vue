<template>
    <button class="blue-button">
        {{ name }}
    </button>
</template>

<script lang="ts">
export default {
    props: ["name"]
};
</script>

<style scoped>
.blue-button {
    color: white;
    width: max-content !important;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px 12px;
    background: blue;
    border-radius: 4px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background 0.3s ease-in-out, transform 0.2s;
}

.blue-button:hover {
    background: #d6cfcf;
    transform: scale(1.05);
}
</style>
