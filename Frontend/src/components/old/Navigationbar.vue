<template>
  <nav class="navigation-bar">
    <div class="logo">
      <!-- <router-link to="/power-planner">Power Planner</router-link> -->
      <img src="../assets/PP logo.png" alt="Logo">
      <label for="" id="PP">Power Planner</label>
    </div>
    <div class="links">
      <router-link to="/calendar">Calendar</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      // data properties here
    }
  },
  methods: {
    // methods here
  }
}
</script>

<style scoped>
*,
body {
  margin: 0;
}

.navigation-bar {
  display: flex;
  flex-shrink: 0;
  width: 100%;
  justify-content: flex-start;
  padding: 0;
  background-color: #877979;
}


.logo #PP {
  color: #000;
  position: absolute;
  margin-left: 5px;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: bold;
  top: 20%;
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  margin-right: auto;
}

.logo #PP {
  color: #000;
  margin-left: 5px;
  font-weight: bold;
  text-align: center;
}


.links {
  color: #000;
  display: flex;
  gap: 1rem;
}

.links a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}

.links a:hover {
  color: #0066cc;
}</style>
