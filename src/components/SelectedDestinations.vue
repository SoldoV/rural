<template>
  <div class="selected-destinations">
    <div class="grid-container">
      <div class="destination-img upperLarge">
        <div class="destination-img-text">
          Izletista
          <div class="destination-img-second-text">
            Vise od 10 sela u ponudi <v-icon>mdi-arrow-right</v-icon>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
      <div class="destination-img upperSmallLeft">
        <div class="destination-img-text">
          Izletista
          <div class="destination-img-second-text">
            Vise od 10 sela u ponudi <v-icon>mdi-arrow-right</v-icon>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
      <div class="destination-img upperSmallRight">
        <div class="destination-img-text">
          Izletista
          <div class="destination-img-second-text">
            Vise od 10 sela u ponudi <v-icon>mdi-arrow-right</v-icon>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
      <div class="destination-img lowerLarge">
        <div class="destination-img-text">
          Izletista
          <div class="destination-img-second-text">
            Vise od 10 sela u ponudi <v-icon>mdi-arrow-right</v-icon>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
      <div class="destination-img lowerSmallLeft">
        <div class="destination-img-text">
          Izletista
          <div class="destination-img-second-text">
            Vise od 10 sela u ponudi <v-icon>mdi-arrow-right</v-icon>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
      <div class="destination-img lowerSmallRight">
        <div class="destination-img-text">
          Izletista
          <div class="destination-img-second-text">
            Vise od 10 sela u ponudi <v-icon>mdi-arrow-right</v-icon>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
    </div>
    <div class="a"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.destination-img-second-text {
  word-break: break-all;
  color: rgba(255, 255, 255, 0.87);
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  display: none;
}
.grid-container {
  height: 588px !important;
  display: grid;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px 24px;
  grid-template-areas: "upperSmallLeft upperLarge upperLarge upperSmallRight" "lowerLarge lowerLarge lowerSmallLeft lowerSmallRight";
}

.upperLarge {
  grid-area: upperLarge;
  background-image: url("../assets/a.jpeg");
}

.upperSmallLeft {
  grid-area: upperSmallLeft;
  background-image: url("../assets/a.jpeg");
}

.upperSmallRight {
  grid-area: upperSmallRight;
  background-image: url("../assets/a.jpeg");
}

.lowerLarge {
  grid-area: lowerLarge;
  background-image: url("../assets/a.jpeg");
}

.lowerSmallLeft {
  grid-area: lowerSmallLeft;
  background-image: url("../assets/a.jpeg");
}

.lowerSmallRight {
  grid-area: lowerSmallRight;
  background-image: url("../assets/a.jpeg");
}
.destination-img {
  position: relative;
  border-radius: 8px;
  height: 282px !important;
}
.a {
  height: 600px;
}
.overlay {
  position: absolute;
  top: 0;
  border-radius: 8px;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: $primary;
}
.destination-img:hover {
  .overlay {
    opacity: 0.5;
  }
  .destination-img-second-text {
    display: initial;
  }
}
.destination-img-text {
  position: absolute;
  bottom: 24px;
  left: 24px;
  color: rgba(255, 255, 255, 0.87);
  font-family: "MontserratBold";
  font-size: 20px;
  font-weight: 400;
  line-height: 24.38px;
  max-width: calc(100% - 24px);
  text-align: left;
  z-index: 10;
  display: flex;
  flex-direction: column;

  .v-icon {
    color: rgba(255, 255, 255, 0.87);
    font-size: 20px;
  }
}

@media only screen and (max-width: 1100px) {
  .grid-container {
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: "upperSmallLeft upperLarge" "upperSmallRight lowerLarge" "lowerSmallLeft lowerSmallRight";
  }
}
@media only screen and (max-width: 500px) {
  .grid-container {
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: "upperSmallLeft" "upperLarge" "upperSmallRight" "lowerLarge" "lowerSmallLeft" "lowerSmallRight";
  }
}
</style>
