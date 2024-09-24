<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastContainer from '@/views/toasts/ToastContainer.vue'
import ToastAlert from '@/views/toasts/ToastAlert.vue'
import { useNotificationsStore } from '@/stores'


const notificationsStore = useNotificationsStore()

</script>

<template>
  <div class="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-soko-500 from-0% to-black to-70%">
    <RouterView #default="{ Component, route }">
      <template v-if="Component">
        <component :is="Component" :key="route.fullPath" />
      </template>
    </RouterView>
    <ToastContainer v-if="notificationsStore.hasNotifications">
      <template v-for="notification in notificationsStore.getNotifications" :key="notification.id">
        <ToastAlert
          v-if="notification.id && notification.isShown"
          :id="notification.id"
          :is-shown="notification.isShown"
          :message="notification.message"
          :type="notification.type"
        />
      </template>
    </ToastContainer>
  </div>
</template>


