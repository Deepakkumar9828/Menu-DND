<template>
    <div>
        <select
            class="w-full px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="$emit('select-menu', $event.target.value)">
            <option value="" disabled selected>Select a menu</option>
            <option v-for="(item, index) in data" :key="index" :value="item.id">
                {{ item.title }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
export default {
    props: ["data"]
};
</script>
