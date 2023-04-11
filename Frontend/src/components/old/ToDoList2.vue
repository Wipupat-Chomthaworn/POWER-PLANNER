<template>
    <div>
      <h2>My To-Do List</h2>
      <form @submit.prevent="addItem">
        <input v-model="newItem" placeholder="Add a new item" />
        <button>Add Item</button>
      </form>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
          <button @click="deleteItem(index)">
            <!-- <span> => </span> -->
            Delete It!</button>
        </li>
      </ul>
      <button @click="exportData"> Save It!!!</button>
      <button @click="importData"> Load My ToDoList!!!</button>

      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newItem: "",
        items: [],
      };
    },
    methods: {
      addItem() {
        if (this.newItem !== "") {
          this.items.push(this.newItem);
          this.newItem = "";
        }
      },
      deleteItem(index) {
        this.items.splice(index, 1);
      },


      exportData() {
        localStorage.setItem('myToDoSt', this.items);

    //   const data = JSON.stringify(this.items);
    //   const filename = 'todo-list.json';
    //   const blob = new Blob([data], { type: 'application/json' });
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = filename;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   window.URL.revokeObjectURL(url);
    },
    importData() {
        // var myStorage = localStorage.getItem('myToDOSt');
        this.items = JSON.parse(myStorage.getItem('myToDOSt'));

    //   const input = document.createElement('input');
    //   input.type = 'file';
    //   input.accept = 'application/json';
    //   input.onchange = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //       const data = JSON.parse(event.target.result);
    //       this.items = data;
    //     };
    //     reader.readAsText(file);
    //   };
    //   input.click();
    },




    //   exportData() {
    //     let myToDo = this.items
    //   const data = JSON.stringify(this.items);
    //   const filename = 'todo-list.json';
    //   const blob = new Blob([data], { type: 'text/json;charset=utf-8;' });
    //   if (navigator.msSaveBlob) {
    //     navigator.msSaveBlob(blob, filename);
    //   } else {
    //     const link = document.createElement('a');
    //     if (link.download !== undefined) {
    //       const url = URL.createObjectURL(blob);
    //       link.setAttribute('href', url);
    //       link.setAttribute('download', filename);
    //       link.style.visibility = 'hidden';
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     }
    //   }
    // },
    },
  };
  </script>

<style>
input{
    padding: auto;
}</style>



<template>
    <div>
      <h2>My To-Do List</h2>
      <form @submit.prevent="addItem">
        <input v-model="newItem.name" placeholder="Add a new item" />
        <input v-model="newItem.dueDate" type="date" placeholder="Due Date" />
        <button>Add Item</button>
      </form>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.name }} - Due: {{ item.dueDate }}
          <button @click="deleteItem(index)">Delete It!</button>
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
        },
        items: [],
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
    },
  };
  </script>
  