<template>
  <div class="register">
    <v-dialog
      v-model="registerOpen"
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
              <div class="login-header-text">Registracija</div>
            </div>
            <div class="login-body">
              <v-form ref="form" v-model="form" lazy-validation>
                <div class="login-label">Ime i prezime:</div>
                <v-text-field
                  outlined
                  required
                  :rules="nameRules"
                  v-model="name"
                ></v-text-field>
                <div class="login-label">
                  E-Mail:
                </div>
                <v-text-field
                  outlined
                  required
                  v-model="email"
                  :rules="emailRules"
                ></v-text-field>
                <div class="login-label">Lozinka:</div>
                <v-text-field
                  outlined
                  required
                  type="password"
                  :rules="passRules"
                  v-model="password"
                ></v-text-field>
                <div class="login-label">Ponovite lozinku:</div>
                <v-text-field
                  type="password"
                  outlined
                  required
                  :rules="passRules.concat(passwordConfirmationRule)"
                  v-model="repeatPassword"
                ></v-text-field>
                <v-btn
                  depressed
                  @click="register"
                  class="header-log-in login-btn"
                  >Prijavite se</v-btn
                >
              </v-form>
              <div class="login-registracija" @click="login">
                Prijavite se <v-icon color="primary">mdi-arrow-right</v-icon>
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
    registerOpen: {
      required: true
    }
  },
  data: () => ({
    form: false,
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    passRules: [
      v => !!v || "Morate unijeti lozinku",
      v => (v && v.length >= 5) || "Lozinka mora imati više od 8 znakove"
    ],
    nameRules: [v => !!v || "Ime i prezime mora biti popunjeno"],
    emailRules: [
      v =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail mora biti ispravan",
      v => !!v || "Morate unijeti E-Mail"
    ]
  }),
  computed: {
    passwordConfirmationRule() {
      return (
        this.password === this.repeatPassword || "Lozinke se moraju podudarati"
      );
    }
  },
  methods: {
    register() {
      this.$refs.form.validate();
    },
    login() {
      this.close();
      this.$emit("login");
    },
    close() {
      this.$emit("register");
    }
  }
};
</script>

<style lang="scss">
</style>
