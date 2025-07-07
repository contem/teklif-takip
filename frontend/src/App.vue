<template>
  <el-container style="min-height: 100vh;">
    <el-header height="60px">
      <el-row align="middle" justify="space-between">
        <el-col :span="11">
          <h1 style="margin:0; font-size:1.5rem; color:#2563eb;">Teklif Takip</h1>
        </el-col>
        <el-col :span="13" style="text-align:right;">
          <el-menu mode="horizontal" :default-active="$route.path" router>
            <el-menu-item index="/">Müşteriler</el-menu-item>
            <el-menu-item index="/offers">Teklifler</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
    <el-footer height="40px" style="text-align:center; color:#888; font-size:0.9rem;padding-top: 10px;">
      © 2025 Teklif Takip Uygulaması
    </el-footer>
  </el-container>
</template>

<style>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(.55,0,.1,1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
body {
  background: #f1f5f9;
  margin: 0;
}
</style>
