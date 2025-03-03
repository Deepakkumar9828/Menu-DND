<template>
    <div class="flex space-x-4 p-4">
        <div class="w-1/3 shadow">
            <CreateMenuData :menu="menu" @menu-selected="menuSelected" @addNewMenuData="addNewMenuData" />
        </div>

        <div class="w-2/3 shadow">
            <MenuBuilder :menu-items="selectedData" @update-menu="updateMenu" @changeMenuTitle="changeMenuTitle"
                @addNewChildMenu="addNewChildMenu" @addNewSubChildMenu="addNewSubChildMenu" />
        </div>
    </div>
</template>
<script lang="ts">
import MenuBuilder from '../components/MenuBuilder.vue';
import CreateMenuData from '../components/CreateMenuData.vue';

export default {
    components: { MenuBuilder, CreateMenuData },
    data() {
        return {
            menu: [] as any[],
            selectedData: {} as any,
        };
    },
    created() {
        this.loadMenuFromStorage();
    },
    watch: {
        menu: {
            handler(newMenu) {
                localStorage.setItem('menuData', JSON.stringify(newMenu));
            },
            deep: true,
        }
    },
    methods: {
        loadMenuFromStorage() {
            const savedMenu = localStorage.getItem('menuData');
            if (savedMenu) {
                this.menu = JSON.parse(savedMenu);
            }
        },
        menuSelected(id: number) {
            const findData = this.menu.find(item => item.id === id);
            this.selectedData = findData ? JSON.parse(JSON.stringify(findData)) : {};
        },
        changeMenuTitle(id: number, newTitle: string) {
            const menuItem = this.menu.find(item => item.id === id);
            if (menuItem) {
                menuItem.title = newTitle;
            }
            if (this.selectedData.id === id) {
                this.selectedData.title = newTitle;
            }
            this.saveMenuToStorage();
        },
        addNewSubChildMenu(ids: { mainId: number, childId: number }, newChild: any) {
            const findMenu = this.menu.find(item => item.id === ids.mainId);
            if (findMenu) {
                if (!findMenu.children) findMenu.children = [];

                const findChild = findMenu.children.find(item => item?.id === ids.childId);
                if (findChild) {
                    if (!findChild.children) findChild.children = [];
                    findChild.children.push(...(newChild.children || []));
                }

                if (!this.selectedData.children) this.selectedData.children = [];
                const findChild1 = this.selectedData.children.find(item => item?.id === ids.childId);
                if (findChild1) {
                    if (!findChild1.children) findChild1.children = [];
                    findChild1.children.push(...(newChild.children || []));
                }
            }

            this.menu = [...this.menu];
            this.selectedData = { ...this.selectedData };
            this.saveMenuToStorage();
        },
        addNewChildMenu(ids: { mainId: number }, newChild: any) {
            const findMenu = this.menu.find(item => item.id === ids.mainId);
            if (findMenu) {
                if (!findMenu.children) findMenu.children = [];
                findMenu.children.push(...newChild.children);

                if (!this.selectedData.children) this.selectedData.children = [];
                this.selectedData.children.push(...newChild.children);
            }
            this.menu = [...this.menu];
            this.selectedData = { ...this.selectedData };
            this.saveMenuToStorage();
        },
        addNewMenuData(newMenu) {
            this.menu.push(newMenu);
            this.saveMenuToStorage();
        },
        saveMenuToStorage() {
            localStorage.setItem('menuData', JSON.stringify(this.menu));
        }
    }
};
</script>

