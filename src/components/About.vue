<template>
  <div class="about">
    <div class="about-header">
      {{ $t("about.about") }}
    </div>
    <div class="about-text">
      <b>{{ $t("about.text1") }}</b>
      {{ $t("about.text2")
      }}<b class="about-text-ex">{{ $t("about.text3") }}</b>
      {{ $t("about.text4") }}
      <div class="about-subtext">
        {{ $t("about.text5") }}
      </div>
      <div class="about-subtext">
        {{ $t("about.text6") }}
      </div>
      <div class="about-subtext">
        {{ $t("about.text7") }}<b>{{ $t("about.text8") }}</b
        >,
        {{ $t("about.text9") }}
      </div>
      {{ $t("about.text10") }}
    </div>
    <div class="about-subheader">
      {{ $t("about.text11") }}
    </div>
    <div class="about-text">
      {{ $t("about.text12") }}
    </div>
    <div class="about-bottom-subheader">
      <b>{{ $t("about.text13") }}</b>
    </div>
    <div class="about-logo"></div>
  </div>
</template>

<script>
export default {};
</script>
