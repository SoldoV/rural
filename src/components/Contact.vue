<template>
  <div class="contact">
    <div class="contact-header">
      Kontakt
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
              <div class="contact-form-label">Ime i prezime:</div>
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
                :rules="lastNameRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="contact-form-label">Naslov:</div>
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
              <div class="contact-form-label">Poruka:</div>
              <v-textarea
                outlined
                v-model="message"
                :rules="messageRules"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <v-btn class="contact-form-btn" @click="validate">Pošalji</v-btn>
      </v-form>
    </div>
    <div class="contact-inf-div">
      <div class="contact-inf-wrapper">
        <v-col cols="6" class="contact-inf-left">
          Poštanska Adresa:
        </v-col>
        <v-col cols="6" class="contact-inf-right">
          <div>
            Unija za održivi povratak i integracije
            <div>u Bosni i Hercegovini</div>
          </div>
          <div style="margin-top:16px">Mihrivode 59</div>
          <div>71000 Sarajevo</div>
          <div>Bosna i Hercegovina</div>
        </v-col>
      </div>
      <div class="contact-inf-wrapper">
        <v-col cols="6" class="contact-inf-left">
          Telefon:
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
          Društvene mreže:
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

  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    title: "",
    message: "",
    titleRules: [v => !!v || "Naslov je potreban"],
    messageRules: [v => !!v || "Poruka je potrebna"],
    nameRules: [
      v => !!v || "Ime je potrebno",
      v => v.length <= 20 || "Ime mora biti ispod 20 slova"
    ],
    lastNameRules: [
      v => !!v || "Prezime je potrebno",
      v => v.length <= 20 || "Prezime mora biti ispod 20 slova"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail je potreban",
      v => /.+@.+/.test(v) || "E-mail mora biti ispravan"
    ]
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss">
.contact {
  position: relative;
  margin: 0 20% 0 20%;
  margin-bottom: 60px;

  .v-input__slot {
    margin-bottom: 4px;
  }
  .v-text-field--outlined.v-input--is-focused fieldset {
    border: 2px solid #319647;
  }

  .v-text-field--outlined.v-input--is-focused {
    caret-color: #319647 !important;
  }

  .col {
    padding: 0px;
  }

  .contact-inf-div {
    margin-top: 146px;
    margin-bottom: 50px;
  }

  .footer-social {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 104px !important;
    position: absolute;
    right: 0px;

    .footer-social-box {
      cursor: pointer;
      margin-left: 16px;
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
  }

  .contact-email {
    word-break: break-all;
  }
  .contact-header {
    margin-top: 46px;
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.87);
    font-family: "BalooPaaji2Bold";
    font-size: 34px;
    font-weight: 400;
    line-height: 59.87px;
    text-align: left;
  }

  .contact-form-name {
    padding-right: 12px;
  }

  .contact-form-surname {
    padding-left: 12px;
  }

  .contact-form-btn {
    position: absolute;
    right: 0px;
    background-color: #319647 !important;
    border-radius: 4px;
    color: white;
    text-transform: capitalize;
    font-weight: 600;
    box-shadow: 0 10px 20px 0 rgba(49, 150, 71, 0.5);
    width: 116px;
    height: 36px;
  }
  .contact-text {
    color: rgba(0, 0, 0, 0.6);
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.5px;
    text-align: left;
    margin-bottom: 36px;
  }

  .contact-form-label {
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    text-align: left;
  }

  .contact-inf-left {
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    text-align: left;
  }
  .contact-inf-right {
    position: relative;
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    line-height: 17.07px;
    text-align: right;
  }

  .contact-inf-wrapper {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    padding: 23px 0 23px 0;
    display: flex;
    flex-direction: row;
  }
}

@media only screen and (max-width: 964px) {
  .contact {
    margin: 0;
  }
}
</style>
