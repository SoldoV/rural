<template>
  <div class="new-household-properties row justify-center">
    <v-col cols="12" lg="8" md="10">
      <v-form v-model="valid" ref="form" lazy-validation>
        <tags
          :householdId="householdId"
          @errorNotif="errorNotif"
          :tags="tags"
        />
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
          outlined
          v-model="links.booking"
          :label="$t('admin.newHouseholdProperties.booking')"
        ></v-text-field>
        <div class="new-household-btn-wrapper">
          <v-btn
            depressed
            outlined
            v-if="this.$route.params.id"
            class="new-household-btn common-btn-outlined"
            @click="goBack()"
            >{{ $t("common.back") }}</v-btn
          >
          <v-btn
            depressed
            color="primary"
            class="common-btn"
            :loading="btnLoad"
            :disabled="!isValid()"
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
    </v-col>
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
      "PLATFORM_RESP",
      "HOUSEHOLD_IMAGE_RESP",
      "PRICE_RESP",
      "HOUSEHOLD_TAG_RESP",
      "GET_ERROR_MSG",
      "GET_SINGLE_HOUSEHOLD",
      "GET_HOUSEHOLDID_RESP"
    ]),
    ...mapActions(["postPlatforms", "postHouseholdTags", "getHouseholdById"]),
    goBack() {
      this.$router.push(
        `/dashboard/household/${this.$route.params.id}/description`
      );
    },
    isValid() {
      return (
        this.tags.length > 0 && this.images.length > 0 && this.prices.length > 0
      );
    },
    save() {
      if (this.$refs.form.validate()) {
        this.btnLoad = true;
        let platforms = {
          method: "sync",
          data: {
            1: {
              uid: this.links.airBnb
            }
          }
        };
        if (this.links.booking.length !== 0) {
          platforms.data[2] = {
            uid: this.links.booking
          };
        }
        this.postPlatforms([platforms, this.householdId]).then(() => {
          if (!this.PLATFORM_RESP())
            return this.errorNotif(this.GET_ERROR_MSG());
          this.success = true;
          this.btnLoad = false;
          this.$emit("setStepper", 3);
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
        this.images.push({ image: a.image_url, id: a.id });
      });
      data.prices.forEach(a => {
        this.prices.push({
          value: a.value,
          date: [a.date_from, a.date_to],
          id: a.id,
          householdId: this.householdId
        });
      });
      this.links = {
        airBnb: data.platforms[0].pivot.uid,
        booking: data.platforms.length > 1 ? data.platforms[1].pivot.uid : ""
      };
    }
  },
  created() {
    this.$emit("setStepper", 2);
    if (this.$route.params.id) {
      this.getHouseholdById([
        this.$route.params.id,
        { withTranslations: 1 }
      ]).then(() => {
        if (this.GET_HOUSEHOLDID_RESP()) {
          this.setEditedHouseholdItems();
        }
      });
    } else this.householdId = localStorage.getItem("household_id");
  }
};
</script>
