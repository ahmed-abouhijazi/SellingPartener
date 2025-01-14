<template>
  <div id="app" class="app-container">
    <header class="header">
      <h1 class="title">Order Management System</h1>
      <nav>
        <ul class="nav-list">
          <li><a href="/" class="nav-link">Home</a></li>
          <!-- Add more navigation links here if needed -->
        </ul>
      </nav>
    </header>
    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-container {
  min-height: 100vh;
  background-color: #f7fafc;
}

.header {
  background-color: #38a169;
  color: white;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.nav-list {
  display: flex;
  gap: 16px;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  color: #e2e8f0;
}

.main-content {
  padding: 16px;
}
</style>
