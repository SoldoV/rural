<template>
  <div class="new-household-properties">
    <v-form v-model="valid" ref="form" lazy-validation>
      <tags :householdId="householdId" @errorNotif="errorNotif" :tags="tags" />
      <images
        @errorNotif="errorNotif"
        :householdId="householdId"
        :images="images"
      />
      <priceComp
        @errorNotif="errorNotif"
        :householdId="householdId"
        :prices="prices"
      />
      <v-text-field
        required
        :rules="inputRules"
        outlined
        v-model="links.airBnb"
        :label="$t('admin.newHouseholdProperties.airBnb')"
        class="mt-10"
      ></v-text-field>
      <v-text-field
        :rules="inputRules"
        required
        outlined
        v-model="links.booking"
        :label="$t('admin.newHouseholdProperties.booking')"
      ></v-text-field>
      <div class="new-household-btn-wrapper">
        <v-btn
          depressed
          color="primary"
          class="common-btn"
          :loading="btnLoad"
          @click="save"
          >{{ $t("common.next") }}</v-btn
        >
      </div>
    </v-form>
    <v-alert type="success" class="success-alert" v-if="success">
      {{ successMessage }}
    </v-alert>
    <v-alert type="error" class="success-alert" v-if="error">
      {{ errorValue }}
    </v-alert>
  </div>
</template>

<script>
import tags from "../../components/Admin/NewHouseholdTags.vue";
import priceComp from "../../components/Admin/NewHouseholdPrice.vue";
import images from "../../components/Admin/NewHouseholdImage.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    tags,
    priceComp,
    images
  },
  data: function() {
    return {
      inputRules: [v => !!v || this.$t("common.required")],
      householdId: null,
      valid: false,
      error: false,
      btnLoad: false,
      errorValue: "",
      success: false,
      prices: [],
      tags: [],
      newTags: [],
      links: {
        airBnb: "",
        booking: ""
      },
      images: []
    };
  },
  watch: {
    success(val) {
      if (val) setTimeout(() => (this.success = false), 2000);
    },
    error(val) {
      if (val) setTimeout(() => (this.error = false), 5000);
    }
  },
  computed: {
    successMessage() {
      if (this.$route.params.id)
        return this.$t("admin.newHouseholdProperties.successEdit");
      return this.$t("admin.newHouseholdProperties.successAdd");
    }
  },
  methods: {
    ...mapGetters([
      "GET_HOUSEHOLD_ID",
      "PLATFORM_RESP",
      "GET_ERROR_MSG",
      "GET_SINGLE_HOUSEHOLD",
      "GET_HOUSEHOLDID_RESP"
    ]),
    ...mapActions(["postPlatforms", "postHouseholdTags", "getHouseholdById"]),
    save() {
      if (this.$refs.form.validate()) {
        this.btnLoad = true;
        let platforms = {
          method: "attach",
          data: {
            1: {
              uid: this.links.airBnb
            },
            2: {
              uid: this.links.booking
            }
          }
        };
        this.postPlatforms([platforms, this.householdId]).then(() => {
          if (!this.PLATFORM_RESP())
            return this.errorNotif(this.GET_ERROR_MSG());
          this.success = true;
          this.btnLoad = false;
          setTimeout(() => this.$router.push("/dashboard/households"), 2000);
        });
      }
    },
    errorNotif(val) {
      this.error = true;
      this.errorValue = val;
      this.btnLoad = false;
    },
    setEditedHouseholdItems() {
      this.householdId = this.$route.params.id;
      let data = this.GET_SINGLE_HOUSEHOLD();
      data.tags.forEach(a => {
        this.tags.push({
          type: {
            category_id: a.category_id,
            created_at: a.created_at,
            icon: a.icon,
            id: a.id,
            title: a.title,
            updated_at: a.updated_at
          },
          value: a.pivot.value,
          householdId: this.householdId
        });
      });
      data.images.forEach(a => {
        this.images.push({ image: a.file_path, id: a.id });
      });
      data.prices.forEach(a => {
        this.prices.push({
          price: a.price,
          date: [a.date_from, a.date_to],
          id: a.id,
          householdId: this.householdId
        });
      });
      this.links = {
        airBnb: data.platforms[0].pivot.uid,
        booking: data.platforms[1].pivot.uid
      };
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getHouseholdById(this.$route.params.id).then(() => {
        if (this.GET_HOUSEHOLDID_RESP()) {
          this.setEditedHouseholdItems();
        }
      });
    } else this.householdId = this.GET_HOUSEHOLD_ID();
  }
};
</script>
