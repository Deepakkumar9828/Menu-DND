<template>
    <div class="w-1/4 p-4 border w-full h-full overflow-auto">
        <p class="text-md font-bold mb-4">Menus</p>
        <SimpleButton name="Create new menu" @click="addNewMenu" />
        <p v-if="menu.length === 0" class="w-max mx-auto text-center text-gray-500 mt-10">No Data</p>
        <div class="flex flex-col gap-2 mt-4">
            <div v-for="(item, index) in menu" :key="index"
                class="border p-2 rounded w-full flex items-center justify-between">
                <p class="w-4/5">{{ item.title }}</p>
                <SimpleButton name="Select" @click="finalChooseMenu(item.id)" />
            </div>
        </div>

    </div>

    <DialogComponent v-if="open" :open="open" @close="open = false" @submit="handleNewMenuData" />
</template>

<script lang="ts">
import SimpleButton from "./SimpleButton.vue";
import DialogComponent from "./DialogComponent.vue";

export default {
    components: { SimpleButton, DialogComponent },
    props: ["menu"],
    data() {
        return {
            error: "",
            open: false
        }
    },
    methods: {
        finalChooseMenu(id: number) {
            this.$emit("menu-selected", id);
            this.error = "";
        },
        handleNewMenuData(newMenu) {
            this.$emit("addNewMenuData", newMenu);
            this.open = false;
        },
        addNewMenu() {
            this.open = true;
        }
    },
};
</script>
