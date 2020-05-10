<template>
  <div class="footer">
    <div class="footer-logo"></div>
    <div class="footer-copyright">
      Rural.ba © 2020 All rights reserved.
    </div>
    <div class="footer-social">
      <a href="https://instagram.com" target="_blank">
        <div class="footer-social-box"><v-icon>mdi-instagram</v-icon></div>
      </a>
      <a href="https://facebook.com" target="_blank">
        <div class="footer-social-box"><v-icon>mdi-facebook</v-icon></div>
      </a>
      <v-select
        class="footer-lang"
        :items="items"
        dense
        v-model="selected"
        :menu-props="{ top: true, offsetY: true }"
        outlined
        hiede-details
      ></v-select>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["English", "Hrvatski"],
    selected: "English"
  })
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.footer {
  height: 130px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .footer-logo {
    min-width: 103px;
    width: 103px;
    height: 67px;
    background-image: url("../assets/logo.svg");
  }

  .footer-copyright {
    margin-left: 130px;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    color: rgba(0, 0, 0, 0.6);
  }

  .footer-social {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .footer-social-box {
      cursor: pointer;
      margin: 0px 8px 0px 8px;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .v-icon {
      color: #292929;
    }
    .footer-lang {
      border-radius: 4px;
      width: 120px;
      margin-left: 8px;
      max-width: 120px;
      font-size: 14px;

      fieldset {
        height: 41px;
      }
      .v-input__slot {
        min-height: 36px !important;
        height: 36px;
        margin-bottom: 0px;
      }
      .v-input__control {
        min-height: 36px;
        height: 36px;
        margin-bottom: 0px;
      }

      .v-input__control > .v-input__slot fieldset {
        border-color: rgba(0, 0, 0, 0.12) !important;
      }
      .v-select__selections {
        max-width: 100px !important;
        width: 100px !important;
      }
    }
    .v-text-field__details {
      display: none !important;
    }
  }
}
@media only screen and (max-width: 964px) {
  .footer {
    flex-direction: column !important;
    height: 300px;
    padding: 3em 0 3em 0;

    .footer-copyright {
      margin: 0px !important;
    }
  }
}
</style>
