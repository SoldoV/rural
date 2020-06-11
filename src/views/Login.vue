<template>
  <div class="login">
    <v-card class="login-card">
      <div class="login-wrapper align-column-center">
        <div class="login-box">
          <div class="login-header align-column-center">
            <div class="login-header-image"></div>
            <div class="login-header-text">{{ $t("header.signIn") }}</div>
          </div>
          <div class="login-body">
            <v-form ref="form" v-model="valid">
              <div class="login-label">E-Mail:</div>
              <v-text-field
                outlined
                :rules="emailRules"
                v-model="email"
              ></v-text-field>
              <div class="login-label">{{ $t("login.pass") }}</div>
              <v-text-field
                outlined
                :rules="passRules"
                type="password"
                v-model="password"
                @keyup.enter="login()"
              ></v-text-field>
              <v-btn depressed class="header-log-in login-btn" @click="login">{{
                $t("header.signIn")
              }}</v-btn>
            </v-form>
          </div>
        </div>
      </div>
      <v-alert type="error" class="error-alert" v-if="error">
        {{ errorValue }}
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      error: false,
      errorValue: "",
      valid: false,
      email: "",
      password: "",
      passRules: [
        v => !!v || this.$t("login.passRules"),
        v => (v && v.length >= 6) || this.$t("login.passRules2")
      ],
      emailRules: [
        v =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          this.$t("contact.mailRules"),
        v => !!v || this.$t("contact.mailRules2")
      ]
    };
  },
  watch: {
    error(val) {
      if (val) setTimeout(() => (this.error = false), 5000);
    }
  },
  methods: {
    ...mapActions(["userLogin"]),
    ...mapGetters(["IS_LOGGED_IN", "GET_ERROR_MSG"]),
    login() {
      if (this.$refs.form.validate()) {
        let data = {
          email: this.email,
          password: this.password
        };
        this.userLogin(data).then(() => {
          if (this.IS_LOGGED_IN()) {
            this.$router.push("/");
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

