<template>
    <div class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold mb-4">Add New Menu Item</h2>

            <div class="mb-4" v-if="!childCreate">
                <label class="font-medium">Title:</label>
                <input v-model="title" type="text" class="border p-2 w-full rounded" />
            </div>

            <div class="mb-4">
                <label class="font-medium">Child Title (optional):</label>
                <input v-model="childrenTitle" type="text" class="border p-2 w-full rounded" />
            </div>

            <div class="flex justify-end space-x-2">
                <SimpleButton name="Cancel" @click="$emit('close')" />
                <SimpleButton name="Save" @click="submit" />
            </div>

            <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import SimpleButton from "./SimpleButton.vue";
import uniqid from 'uniqid';

export default {
    components: { SimpleButton },
    props: {
        open: Boolean,
        childCreate: Boolean
    },
    data() {
        return {
            title: "",
            childrenTitle: "",
            error: ""
        }
    },
    methods: {
        submit() {
            if (this.childCreate) {
                if (this.childrenTitle.trim() === "") {
                    this.error = "Child Title is required";
                    return;
                }
            } else {
                if (this.title.trim() === "") {
                    this.error = "Title is required";
                    return;
                }
                
            }

            const data: { id: string; title?: string; children: { id: string; title: string }[] } = {
                ...( !this.childCreate && {id: uniqid()}),
                ...(!this.childCreate && {title: this.title}),
                children: this.childrenTitle ? [{ id: uniqid(), title: this.childrenTitle }] : []
            };


            this.$emit("submit", data);
        }
    }
};
</script>
