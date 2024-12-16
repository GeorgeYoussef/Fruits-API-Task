<template>
  <div class="fill-height">
    <MessageService />
    <AppLayout />
  </div>
</template>

<script>
import AppLayout from "@/modules/shared/components/app-layout/app-layout.vue";
import MessageService from "@/modules/shared/components/message-service/message-service.vue";
export default {
  components: {
    AppLayout,
    MessageService,
  },
};
</script>
