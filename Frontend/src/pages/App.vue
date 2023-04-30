<template>
  <NavBar/>
  <router-view>

  </router-view>
</template>

<script>
// import axios from "axios";
import NavBar from '../components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar,
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>



<!-- <template>

  <NavigationBar></NavigationBar>

<div>
  <to-do-list></to-do-list>
</div>

<div> <FirstPage></FirstPage> </div>
<div><Home></Home></div>

<div>


</div>
</template>

<script>
import ToDoList from '../components/ToDoList.vue';
import NavigationBar from '../components/Navigationbar.vue';
import FirstPage from '../components/FirstPage.vue';
import Home from './Home.vue';




export default {
components: {
  ToDoList,
  NavigationBar,
  FirstPage,
  Home
},
};
</script>

 -->
