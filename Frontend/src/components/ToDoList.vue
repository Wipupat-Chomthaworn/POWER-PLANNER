<template>
    <div>
        <h2>My To-Do List</h2>
        <span>Sort by:
            <select v-model="sortBy">
                <option value="name">Name</option>
                <option value="dueDate">Due Date</option>
            </select>
        </span>
        <span>
            Filter by:
            <select v-model="filterBy">
                <option value="none">None</option>
                <option value="late">Late</option>
                <option value="complete">Completed</option>
            </select>
        </span>
        <form @submit.prevent="addItem">
            <!-- <div :style="{ backgroundColor: color, width: '20px', height: '20px',borderRadius:'50%' }">
                
            </div> -->
            <input type="color" v-model="selectedColor"/>
            <input v-model="newItem.name" placeholder="Add a new item" />
            <input v-model="newItem.dueDate" type="date" placeholder="Due Date" />

            <button>Add Item</button>
        </form>
        <ul>
            <li v-for="(item, index) in filteredItems" :key="index">
                <!-- <p class="color-box" :style="{ backgroundColor: item.selectedColor }">" "</p> -->
                Task: "{{ item.name }}" =>>
                <p :class="checkDate(item)">Due Date Is : {{ item.dueDate }}</p>
                <button v-if="!item.status" @click="completeItem(index)">
                    Make it complete
                </button>
                <button id="button" @click="deleteItem(index)">Delete It!</button>
            </li>
        </ul>
        <button @click="exportData">Save It!!!</button>
        <button @click="importData">Load My ToDoList!!!</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newItem: {
                name: "",
                dueDate: "",
                statue: "",
                selectedColor: "#f00", // default color is red
            },
            items: [],
            sortBy: "name", // default sort order is by name
            filterBy: "none", // default filter is none
        };
    },
    methods: {
        addItem() {
            if (this.newItem.name !== "" && this.newItem.dueDate !== "") {
                this.items.push({
                    name: this.newItem.name,
                    dueDate: this.newItem.dueDate,
                });
                this.newItem.name = "";
                this.newItem.dueDate = "";
            }
        },
        deleteItem(index) {
            this.items.splice(index, 1);
        },
        exportData() {
            let myToDo = JSON.stringify(this.items);
            localStorage.setItem("myToDoSt", myToDo);
        },
        importData() {
            let myToDo = localStorage.getItem("myToDoSt");
            if (myToDo) {
                this.items = JSON.parse(myToDo);
            }
        },
        checkDate(item) {
            let date = new Date(item.dueDate);
            // console.log("Checking", new Date(date.getFullYear(), date.getMonth(), date.getDate()) < new Date(), "date", new Date(date.getFullYear(), date.getMonth(), date.getDate()), "||| newdate", new Date())
            if (item.status == "complete") {
                console.log("complete");
                return "completedItem";
                // return true;
            } else if (
                new Date(date.getFullYear(), date.getMonth(), date.getDate()) <
                new Date()
            ) {
                console.log("late");
                return "late";
            } else {
                console.log("ontime");
                return "ontime";
            }
        },
        completeItem(index) {
            this.items[index].status = "complete";
        },
    },
    computed: {
        sortedItems() {
            return this.items.sort((a, b) => {
                if (this.sortBy === "name") {
                    return a.name.localeCompare(b.name);
                } else if (this.sortBy === "dueDate") {
                    return new Date(a.dueDate) - new Date(b.dueDate);
                }
            });
        },

        filteredItems() {
            if (this.filterBy === "none") {
                return this.sortedItems;
            } else if (this.filterBy === "complete") {
                return this.sortedItems.filter((item) => item.status === "complete");
            } else if (this.filterBy === "late") {
                return this.sortedItems.filter((item) => {
                    let date = new Date(item.dueDate);
                    return (
                        item.status !== "complete" &&
                        new Date(date.getFullYear(), date.getMonth(), date.getDate()) <
                        new Date()
                    );
                });
            }
        },
    },
};
</script>
<style scoped>
.ontime {
    color: rgb(255, 255, 255);
}

.completedItem {
    color: rgb(0, 255, 123);
}

.late {
    color: #f00;
}

#button {
    padding: 2%;
}
</style>
