<template>
  <div class="toast" v-show="showToast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      showToast: false
    }
  },
  methods: {
    show(message='默认文字', duration=1500) {
      this.message = message
      this.showToast = true

      setTimeout(() => {
        this.showToast = false
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style>
  .toast {
    background-color: rgba(0, 0, 0, .75);
    color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 6px 8px;
    z-index: 999;
  }
</style>