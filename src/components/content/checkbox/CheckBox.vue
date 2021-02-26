<template>
  <div class="checkbox" :class="{boxactive: isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style>
  .checkbox {
    background-color: #eeeeee;
    border-radius: 50%;
    border:solid 1px #aaa;
  }

  .boxactive{
    border-color: #ff5777;
    border-radius: 50%;
    background-color: #ff5777;
  }
</style>