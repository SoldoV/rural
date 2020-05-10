<template>
  <div class="about">
    <div class="about-header">
      O nama
    </div>
    <div class="about-text">
      <b>Unija za održivi povratak i integracije u Bosni i Hercegovini</b>
      pokrenula je stranicu <b class="about-text-ex">"BH SELO"</b> s ciljem
      prikupljanja podataka i kreiranja informacija o turističkim destinacijama
      koja se odnose na etno sela, seoska domaćinstva, nacionalne parkove i
      druge prirodne destinacije u Bosni i Hercegovini.
      <div class="about-subtext">
        "BH SELO" nastoji unaprijedi ruralna područja koja imaju velike
        mogućnosti za razvoj turističkih kapaciteta u Bosni i Hercegovini.
        Želimo motivisati i podržati što više osoba koje žive u ruralnim
        sredinama da se organizovano bave pokretanjme sosptvenog biznisa kroz
        otvaranje seoskih domaćinstava i ukazati im na mogućnosti koje nude
        ruralna područja. Koristeći dobre prakse i direktni uvid u potrebe,
        zajedno sa ciljnom grupom nastojimo kreirati rješenja koja su realna i
        izvodljiva.
      </div>
      <div class="about-subtext">
        Pored očuvanja kulturne baštine, obnove starih kuća, poljoprivrednih
        objekata, cilj je i zaustaviti iseljavanje stanovništva te podstaći
        povratak domicilnog stanovništva, s naglaskom izmedju ostalog, i na
        proizvodnju zdrave hrane.
      </div>
      <div class="about-subtext">
        Projekat Unije pod nazivom <b>“Zajedno učinimo život boljim u BiH”</b>,
        podržan od strane Vlade Švicarske, a implementira se na području Bihaća,
        Lukavca i Čapljine.
      </div>
      Anketiranje povratnika i interno raseljenih lica u 2016. godini u Bihaću,
      Čapljini i Lukavcu koje je provela Unija za održivi povratak i integracije
      u BiH, omogućilo nam je stvaranje šire slike o potrebama za ulaganjem u
      oblasti koje imaju šanse da uspiju i omoguće običnom čovjeku da radi i
      živi od svog rada. Obzirom da se pomenuto anketiranje, uglavnom, provodilo
      u ruralnim područjima, shvatili smo da trebamo konkretno pomoći
      anketiranim porodicama, a ujedno i stvoriti ambijent u cilju jačanja
      turističkih potencijala.
    </div>
    <div class="about-subheader">
      Unaprijedimo ruralna područja u BIH !
    </div>
    <div class="about-text">
      Ruralna područja u Bosni i Hercegovini imaju velike mogućnosti za razvoj
      seoskog turizma. Motivišimo i podržimo što više osoba koje žive u ruralnim
      sredinama da se organizovano bave pokretanjem sopstvenog biznisa kroz
      otvaranje seoskih domaćinstava.
    </div>
    <div class="about-bottom-subheader">
      <b
        >Projekat "Zajedno učinimo život boljim u BiH" podržan je od strane
        Vlade Švicarske.</b
      >
    </div>
    <div class="about-logo"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@font-face {
  font-family: "BalooPaaji2";
  src: url("../assets/fonts/BalooPaaji2-Regular.ttf");
}

@font-face {
  font-family: "BalooPaaji2Bold";
  src: url("../assets/fonts/BalooPaaji2-SemiBold.ttf");
}

.about {
  font-family: "BalooPaaji2" !important;

  .about-logo {
    background-image: url("../assets/swissLogo.png");
    background-size: 100%;
    width: 100%;
    max-width: 294px;
    height: 154px;
  }

  .about-header {
    font-family: "BalooPaaji2Bold" !important;
    font-size: 34px;
    font-weight: 400;
    line-height: 59.87px;
    text-align: left;
    margin-bottom: 16px;
  }

  .about-subheader {
    color: rgba(0, 0, 0, 0.87);
    font-size: 20px;
    line-height: 24px;
    text-align: left;
    margin-top: 46px;
    margin-bottom: 16px;
    font-family: "MontserratBold";
  }

  .about-bottom-subheader {
    margin-top: 50px;
    font-family: "MontserratBold" !important;
  }

  .about-text {
    color: rgba(0, 0, 0, 0.6);
    font-family: "Montserrat";
    font-size: 16px;
    font-weight: 400;
    line-height: 19.5px;
    text-align: left;

    .about-subtext {
      margin-top: 16px;
    }

    b {
      font-family: "MontserratBold";
    }

    b:not(.about-text-ex) {
      color: rgba(0, 0, 0, 0.87);
    }
  }
}
</style>
