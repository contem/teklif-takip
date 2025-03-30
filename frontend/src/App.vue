<template>
  <div>
    <nav>
      <router-link to="/customers" exact-active-class="active">Müşteriler</router-link>
      <router-link to="/offers" exact-active-class="active">Teklifler</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
  background-color: #f0f4f8;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
}

nav a {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s;
}

nav a:hover {
  background-color: #e0eafc;
  color: #0056b3;
}

nav a.active {
  background-color: #007bff;
  color: white;
}
</style>
