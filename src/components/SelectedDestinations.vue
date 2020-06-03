<template>
  <div class="selected-destinations">
    <div class="selected-news-title mb-6">Izdvojene destinacije</div>
    <div class="selected-destinations-wrapper">
      <div
        class="destination-img"
        :style="{ backgroundImage: `url(${getUrl(i + 1)})` }"
        v-for="(item, i) in destinations"
        :key="i"
      >
        <div class="destination-img-text">
          {{ item.title }}
          <div class="destination-img-second-text">
            Pogledajte ponudu <v-icon>mdi-arrow-right</v-icon>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    destinations: []
  }),
  methods: {
    ...mapGetters(["GET_FILTERS"]),
    ...mapActions(["fetchFilters"]),
    getUrl(val) {
      return require("@/assets/homepage/selected" + val + ".png");
    }
  },
  created() {
    this.fetchFilters(4).then(() => {
      this.destinations = this.GET_FILTERS().slice(0, 6);
    });
  }
};
</script>

<style lang="scss">
.selected-destinations {
  margin: 80px 0 126px 0;

  .selected-destinations-wrapper {
    display: flex;
    flex-flow: row wrap;
  }
  .destination-img:nth-child(even) {
    width: calc(50% - 20px);
  }
  .destination-img:nth-child(odd) {
    width: calc(25% - 20px);
  }
  .destination-img:nth-child(6) {
    width: calc(25% - 20px);
  }
  .destination-img-second-text {
    word-break: break-all;
    color: rgba(255, 255, 255, 0.87);
    font-size: 16px;
    display: none;
  }

  .upperLarge {
    background-image: url("../assets/image.jpg");
  }
  .destination-img {
    margin: 10px;
    position: relative;
    background-size: cover;
    border-radius: 8px;
    height: 282px;
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
    opacity: 0.8;
    background: rgb(32, 32, 32);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 50%
    );
    transition: 0.5s ease;
  }
  .destination-img:hover {
    .overlay {
      opacity: 0.5;
      background: $primary;
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
}
@media only screen and (max-width: 1000px) {
  .destination-img {
    width: calc(50% - 20px) !important;
  }
}
@media only screen and (max-width: 450px) {
  .destination-img {
    width: calc(100% - 20px) !important;
    height: 200px !important;
  }
}
</style>
