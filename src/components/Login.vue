<template>
  <div class="login">
    <v-dialog
      v-model="loginOpen"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="white">
          <v-spacer></v-spacer>
          <v-btn icon light @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="login-wrapper align-column-center">
          <div class="login-box">
            <div class="login-header align-column-center">
              <div class="login-header-image"></div>
              <div class="login-header-text">Prijavite se</div>
            </div>
            <div class="login-body">
              <v-form ref="form" v-model="valid">
                <div class="login-label">E-Mail:</div>
                <v-text-field
                  outlined
                  :rules="emailRules"
                  v-model="email"
                ></v-text-field>
                <div class="login-label">Lozinka:</div>
                <v-text-field
                  outlined
                  :rules="passRules"
                  type="password"
                  v-model="password"
                ></v-text-field>
                <div class="login-forgotten">Zaboravili ste lozinku?</div>
                <v-btn depressed class="header-log-in login-btn" @click="login"
                  >Prijavite se</v-btn
                >
              </v-form>
            </div>
          </div>
        </div>
        <v-alert type="error" class="error-alert" v-if="error">
          {{ errorValue }}
        </v-alert>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    loginOpen: {
      required: true
    }
  },
  data: () => ({
    error: false,
    errorValue: "",
    valid: false,
    email: "",
    password: "",
    passRules: [
      v => !!v || "Morate unijeti lozinku",
      v => (v && v.length >= 6) || "Lozinka mora imati više od 5 znakova"
    ],
    emailRules: [
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail mora biti ispravan",
      v => !!v || "Morate unijeti E-Mail"
    ]
  }),
  watch: {
    error(val) {
      if (val) setTimeout(() => (this.error = false), 5000);
    }
  },
  methods: {
    ...mapActions(["userLogin"]),
    ...mapGetters(["IS_LOGGED_IN", "GET_ERROR_MSG"]),
    close() {
      this.$emit("login");
    },
    login() {
      if (this.$refs.form.validate()) {
        let data = {
          email: this.email,
          password: this.password
        };
        this.userLogin(data).then(() => {
          if (this.IS_LOGGED_IN()) {
            this.$emit("login");
          } else this.errorNotif(this.GET_ERROR_MSG());
        });
      }
    },
    errorNotif(val) {
      this.error = true;
      this.errorValue = val;
    }
  }
};
</script>

<style lang="scss">
.error-alert {
  position: fixed !important;
  bottom: 1em !important;
  margin: 0 10% 0 10%;
  width: 80%;
}
</style>
