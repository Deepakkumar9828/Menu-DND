<template>
    <div class="w-full h-full p-4 border rounded-lg">
        <div v-if="menuItems?.id">
            <div class="flex items-center gap-4 mb-4">
                <p class="font-bold min-w-[100px]">Menu Name:</p>
                <input type="text" class="border p-2 flex-grow rounded max-h-[30px] max-w-[80%]" v-model="menuTitle"
                    @input="updateTitle" placeholder="Enter menu name..." />
                <BlueButton name="Save Menu" @click="changeMenuTitle" />
            </div>

            <div>
                <h2 class="text-lg font-bold mb-2">Menu Structure</h2>
                <p class="text-gray-600 mb-2">Manage your menu items below:</p>
            </div>
            <SimpleButton name="Create Menu Item" @click="handleChildCreate(menuItems)" class="mt-2 mb-4" />
            <draggable v-model="menuItems.children" group="menu" item-key="id" class="space-y-2">
                <template #item="{ element }">
                    <div class="border p-3 rounded-lg shadow w-full">
                        <p class="font-semibold">{{ element.title }}</p>

                        <SimpleButton name="Create Child" @click="handleChildCreate(menuItems, element)" class="mt-2" />

                        <draggable v-if="element.children && element.children.length" v-model="element.children"
                            :group="{ name: 'menu', pull: true, put: true }" item-key="id" class="ml-4 mt-2 space-y-2">
                            <template #item="{ element: child }">
                                <div class="border p-2 rounded w-full">
                                    <p class="font-semibold">{{ child.title }}</p>

                                    <draggable v-if="child.children && child.children.length" v-model="child.children"
                                        :group="{ name: 'menu', pull: true, put: true }" item-key="id"
                                        class="ml-4 mt-2 space-y-2">
                                        <template #item="{ element: subChild }">
                                            <div class="border p-2 rounded w-full">
                                                <p class="font-semibold">{{ subChild.title }}</p>
                                            </div>
                                        </template>
                                    </draggable>

                                </div>
                            </template>
                        </draggable>

                    </div>
                </template>
            </draggable>
        </div>
        <p v-else class="w-max mx-auto text-center text-gray-500 mt-10">No Menu Select</p>
    </div>
    <DialogComponent v-if="open" :childCreate="true" :open="open" @close="open = false" @submit="createChildMenuItem" />
</template>

<script lang="ts">
import draggable from "vuedraggable";
import BlueButton from "./BlueButton.vue";
import SimpleButton from "./SimpleButton.vue";
import DialogComponent from "./DialogComponent.vue";

export default {
    components: { draggable, BlueButton, SimpleButton, DialogComponent },
    props: ["menuItems"],
    data() {
        return {
            menuTitle: this.menuItems.title,
            open: false,
            updatingDataIds: {
                mainId: null as string | null,
                childId: null as string | null
            }
        };
    },
    watch: {
        menuItems: {
            handler(newVal) {
                this.menuTitle = newVal.title;
            },
            deep: true
        }
    },
    methods: {
        updateTitle(event) {
            this.menuTitle = event.target.value;
        },
        changeMenuTitle() {
            if (this.menuTitle.trim() === "") {
                return;
            }
            this.$emit("changeMenuTitle", this.menuItems.id, this.menuTitle);
        },
        createChildMenuItem(data) {
            if (this.updatingDataIds.mainId && this.updatingDataIds.childId) {
                this.$emit("addNewSubChildMenu", this.updatingDataIds, data);
                this.updatingDataIds = { mainId: null, childId: null }
            } else {
                this.$emit("addNewChildMenu", { mainId: this.updatingDataIds.mainId }, data);
                this.updatingDataIds = { mainId: null, childId: null }
            }
            this.open = false;
        },
        handleChildCreate(main, child) {
            if (main && child) {
                if (!child?.children) {
                    child.children = [];
                }
                this.updatingDataIds = { mainId: main.id, childId: child?.id };
            } else {
                this.updatingDataIds = { mainId: main.id };
            }
            this.open = true;
        }
    }
};
</script>
