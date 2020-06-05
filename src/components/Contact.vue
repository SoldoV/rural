<template>
  <div class="contact">
    <div class="contact-header">
      {{ $t("contact.contact") }}
    </div>
    <div class="contact-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar
      sem euismod lorem molestie, vel lobortis magna euismod. Aliquam fermentum
      in ex et porttitor. Praesent felis dui, volutpat et odio ut, facilisis
      blandit dolor.
    </div>
    <div class="contact-form-wrapper">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="6" class="contact-form-name">
              <div class="contact-form-label">
                {{ $t("contact.firstAndLastName") }}
              </div>
              <v-text-field
                outlined
                v-model="firstname"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6" class="contact-form-sur">
              <div class="contact-form-label">E-mail:</div>
              <v-text-field
                outlined
                v-model="lastname"
                :rules="emailRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="contact-form-label">{{ $t("contact.title") }}</div>
              <v-text-field
                outlined
                v-model="title"
                :rules="titleRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="contact-form-label">{{ $t("contact.message") }}</div>
              <v-textarea
                outlined
                v-model="message"
                :rules="messageRules"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <v-btn class="contact-form-btn" @click="validate">{{
          $t("contact.send")
        }}</v-btn>
      </v-form>
    </div>
    <div class="contact-inf-div">
      <div class="contact-inf-wrapper">
        <v-col cols="6" class="contact-inf-left">
          {{ $t("contact.address") }}
        </v-col>
        <v-col cols="6" class="contact-inf-right">
          <div>
            {{ $t("contact.union1") }}
            <div>{{ $t("contact.union2") }}</div>
          </div>
          <div style="margin-top:16px">Mihrivode 59</div>
          <div>71000 Sarajevo</div>
          <div>{{ $t("contact.bih") }}</div>
        </v-col>
      </div>
      <div class="contact-inf-wrapper">
        <v-col cols="6" class="contact-inf-left">
          {{ $t("contact.phone") }}
        </v-col>
        <v-col cols="6" class="contact-inf-right">
          <div>+387 33 239 604</div>
          <div>+387 33 239 605</div>
        </v-col>
      </div>
      <div class="contact-inf-wrapper">
        <v-col cols="6" class="contact-inf-left">
          Fax:
        </v-col>
        <v-col cols="6" class="contact-inf-right">
          +387 33 273 581
        </v-col>
      </div>
      <div class="contact-inf-wrapper">
        <v-col cols="4" class="contact-inf-left">
          E-Mail:
        </v-col>
        <v-col cols="8" class="contact-inf-right contact-email">
          <div>uzopi@bih.net.ba</div>
          <div>ured@uzopibih.com.ba</div>
        </v-col>
      </div>
      <div class="contact-inf-wrapper">
        <v-col cols="6" class="contact-inf-left">
          {{ $t("contact.social") }}
        </v-col>
        <v-col cols="6" class="contact-inf-right">
          <div class="footer-social">
            <a href="https://instagram.com" target="_blank">
              <div class="footer-social-box">
                <v-icon>mdi-instagram</v-icon>
              </div>
            </a>
            <a href="https://facebook.com" target="_blank">
              <div class="footer-social-box"><v-icon>mdi-facebook</v-icon></div>
            </a>
          </div>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";

export default {
  mixins: [validationMixin],

  data: function() {
    return {
      valid: false,
      firstname: "",
      lastname: "",
      title: "",
      message: "",
      titleRules: [v => !!v || this.$t("contact.titleRule")],
      messageRules: [v => !!v || this.$t("contact.messageRule")],
      nameRules: [
        v => !!v || this.$t("contact.nameRules"),
        v => v.length <= 20 || this.$t("contact.nameRules2")
      ],
      emailRules: [
        v =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          this.$t("contact.mailRules"),
        v => !!v || this.$t("contact.mailRules2")
      ],
      email: ""
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>
