<template>
  <div>
    CHAT
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import onMessage from '../utils/chat.utils'

export default {
  name: 'ChatView',
  setup() {
    onMessage((entry) => {
      console.info(entry)
    })
    const state = reactive({

    })
    return {
      state,
    }
  }
}
</script>

<style scoped lang="sass">

</style>