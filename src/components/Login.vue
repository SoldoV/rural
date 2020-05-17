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
              <v-form ref="forma" v-model="valid">
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
                <v-btn depressed class="header-log-in login-btn"
                  >Prijavite se</v-btn
                >
              </v-form>
              <div class="login-registracija" @click="register">
                Registracija <v-icon color="primary">mdi-arrow-right</v-icon>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    loginOpen: {
      required: true
    }
  },
  data: () => ({
    valid: false,
    email: "",
    password: "",
    passRules: [
      v => !!v || "Morate unijeti lozinku",
      v => (v && v.length >= 5) || "Lozinka mora imati više od 8 znakove"
    ],
    emailRules: [
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail mora biti ispravan",
      v => !!v || "Morate unijeti E-Mail"
    ]
  }),
  methods: {
    register() {
      this.close();
      this.$emit("register");
    },
    close() {
      this.$emit("login");
    },
    login() {
      this.$refs.validate();
    }
  }
};
</script>

<style lang="scss">
</style>
