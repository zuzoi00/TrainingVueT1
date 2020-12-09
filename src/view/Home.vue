<template>
  <div class="home">
    <h1>Homepage</h1>
    <!-- có bóng -->
    <!-- <v-btn color="blue">Click1</v-btn> -->
    <!-- depressed làm mất bóng -->
    <v-btn  class="hidden-sm-and-up" depressed color="blue">Click2</v-btn>
    <!-- text làm cho background là trắng, 
      color là màu chữ và màu bg khi hover vào  -->
    <v-btn class="hidden-sm-only" text color="red">Click3</v-btn>
    <v-btn class="hidden-sm-and-down" depressed color="blue green-text">
      <v-icon left color="green darken-2">fas fa-address-card</v-icon>
      <span>email me</span>
    </v-btn>
  </div>
  
</template>

<script>
export default {};
</script>

<style>
</style>