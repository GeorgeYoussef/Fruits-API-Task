<template>
  <div class="landingPage">
    <p>Welcome To Fruits API task</p>
    <v-btn class="primaryBtn" text :ripple="false" :to="{ name: 'fruitsList' }">
      <v-icon class="mr-3"> mdi-food </v-icon>
      Go To Fruits List
    </v-btn>
  </div>
</template>
<style>
.landingPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 426px;
  p {
    color: #172b4d;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
