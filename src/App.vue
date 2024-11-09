<template>
  <div class="over_body"></div>
  <header>
    <h1 class="logo">Raschet.com</h1>
    <nav>
      <a href="#first">процент от</a>
      <a href="#second">тмп. роста</a>
      <a href="#third">целев. цена</a>
      <a href="#fourth">маржинал.</a>
      <a href="#fifth">netdebt/ebitda</a>
    </nav>
    <div class="theme_switch">
      <div class="theme_switch__empty"></div>
      <div class="theme_switch__bg">
        <img class="sun_icon" :class="{
              sun_off: !theme_flag,
              sun_on: theme_flag
            }" src="./imgs/sun.png" alt="" />
        <img class="moon_icon" :class="{
              moon_on: !theme_flag,
              moon_off: theme_flag
            }" src="./imgs/moon.png" alt="" />
        <div @click="switch_theme_var" class="switcher">
          <svg :class="{
              switch_animate_on: !theme_flag,
              switch_animate_off: theme_flag
            }"
            class="switcher__round"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="white" />
          </svg>
        </div>
      </div>
      <div class="theme_switch__empty2"></div>
    </div>
  </header>
  <div class="empty_card"></div>
  <main>
    <div v-for="t in test" :key="t" :id="t.id" class="card">
      <h2>{{ t.name }}</h2>
      <div class="card__main">
        <div class="card__main__inputs">
          <label class="input">
            <input
              v-model="t.inp1"
              class="input__field"
              type="number"
              placeholder=" "
            />
            <span class="input__label">{{ t.inp1text }}</span>
            <img
              @click="clear(t, 'inp1')"
              class="input__img"
              src="./imgs/close.png"
              alt=""
            />
          </label>

          <label class="input">
            <input
              v-model="t.inp2"
              class="input__field"
              type="number"
              placeholder=" "
            />
            <span class="input__label">{{ t.inp2text }}</span>
            <img
              @click="clear(t, 'inp2')"
              class="input__img"
              src="./imgs/close.png"
              alt=""
            />
          </label>
        </div>
        <div class="card__main__results">
          <p
            :class="{
              copy_animate_on: copy_flag == t.func,
              copy_animate_off: copy_flag == t.func,
            }"
            class="copy_alert"
          >
            Скопированно!
          </p>
          <h3>результат:</h3>
          <div class="result_container">
            <p
              @click="copy(percent, t.func)"
              v-if="t.func == 'persent'"
              class="copyed_text"
            >
              {{ percent }}%
            </p>
            <p
              @click="copy(growth_rates, t.func)"
              v-if="t.func == 'temps'"
              class="copyed_text"
            >
              {{ growth_rates }}%
            </p>
            <p
              @click="copy(target_price, t.func)"
              v-if="t.func == 'price'"
              class="copyed_text"
            >
              {{ target_price }}
            </p>
            <p
              @click="copy(marginality, t.func)"
              v-if="t.func == 'mar'"
              class="copyed_text"
            >
              {{ marginality }}
            </p>
            <p
              @click="copy(netdebt_ebitda, t.func)"
              v-if="t.func == 'n/e'"
              class="copyed_text"
            >
              {{ netdebt_ebitda }}
            </p>
          </div>
          <p class="note">нажмите на цифру чтобы скопировать</p>
        </div>
      </div>
      <p class="card__info">{{ t.info }}</p>
    </div>
    <div></div>
  </main>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      start_width: window.screen.width,
      copy_flag: null,
      theme_flag: true,
      test: [
        {
          name: "процент от",
          inp1text: "текущее значение",
          inp2text: "предыдущее значение",
          info: "",
          id: "first",
          inp1: "",
          inp2: "",
          func: "persent",
        },
        {
          name: "темпы роста",
          inp1text: "выручка за текущий период",
          inp2text: "выручка за предыдущий период",
          info: "",
          id: "second",
          inp1: "",
          inp2: "",
          func: "temps",
        },
        {
          name: "целевая цена",
          inp1text: "ev (cтоимость бизнеса)",
          inp2text: "кол-во акций",
          info: "*вместо ev можно взять рыночную капитализацию",
          id: "third",
          inp1: "",
          inp2: "",
          func: "price",
        },
        {
          name: "маржинальность",
          inp1text: "себестоимость",
          inp2text: "выручка",
          info: "",
          id: "fourth",
          inp1: "",
          inp2: "",
          func: "mar",
        },
        {
          name: "netdebt/ebitda",
          inp1text: "долг",
          inp2text: "ebitda",
          info: "",
          id: "fifth",
          inp1: "",
          inp2: "",
          func: "n/e",
        },
      ],
    };
  },
  computed:{
    percent() {
      let num1 = this.test[0].inp1;
      let num2 = this.test[0].inp2;

      if(num1 == "" || num2 == ""){
        return 0;
      }
      return ((num1 * 100) / num2).toFixed(3);
    },
    growth_rates() {
      let num1 = this.test[1].inp1;
      let num2 = this.test[1].inp2;

      if(num1 == "" || num2 == ""){
        return 0;
      }
      return ((num1 - num2) / num2 * 100).toFixed(3);
    },
    target_price() {
      let num1 = this.test[2].inp1;
      let num2 = this.test[2].inp2;

      if(num1 == "" || num2 == ""){
        return 0;
      }
      return (num1 / num2).toFixed(3);
    },
    marginality() {
      let num1 = this.test[3].inp1;
      let num2 = this.test[3].inp2;

      if(num1 == "" || num2 == ""){
        return 0;
      }
      return ((num1 / num2) * 100).toFixed(3);
    },
    netdebt_ebitda() {
      let num1 = this.test[4].inp1;
      let num2 = this.test[4].inp2;

      if(num1 == "" || num2 == ""){
        return 0;
      }
      return (num1 / num2).toFixed(3);
    },
  },
  methods: {
    clear(obj, val) {
      if (val == "inp1") {
        obj.inp1 = "";
      } else {
        obj.inp2 = "";
      }
    },
    copy(val, ind) {
      navigator.clipboard.writeText(val);
      this.copy_flag = ind;
      setTimeout(() => {
        this.copy_flag = null;
      }, 2500);
    },
    switch_theme_var(event){
      if (this.theme_flag) {
        localStorage.setItem('theme', false)
        this.theme_flag = false;
      }else {
        localStorage.setItem('theme', true)
        this.theme_flag = true;
      }
      this.switch_theme();
    },
    switch_theme(event) {
      console.log(this.theme_flag);
      if (!this.theme_flag) {
        document.documentElement.style.setProperty("--black", "#ffffff");
        document.documentElement.style.setProperty("--white", "#2a2a2a");
        document.documentElement.style.setProperty("--borderhead", "#393939");
        document.documentElement.style.setProperty("--inputtext", "#dfdfdf");
        document.documentElement.style.setProperty("--inputbg", "#383638");
        document.documentElement.style.setProperty("--switcherbg", "#9656e4");
        document.documentElement.style.setProperty(
          "--bg",
          "0.6"
        );
        document.documentElement.style.setProperty(
          "--cardshadow",
          "rgba(0, 0, 0, 0.3)"
        );
        document.documentElement.style.setProperty("--copyedtext", "#4e426d");
        document.documentElement.style.setProperty("--copyalert", "#494259");
        document.documentElement.style.setProperty("--inputlabel", "#a7a7a7");
        document.documentElement.style.setProperty("--img", "100%");

      } else {
        document.documentElement.style.setProperty(
          "--bg",
          "1"
        );
        document.documentElement.style.setProperty("--black", "#000000");
        document.documentElement.style.setProperty("--white", "#ffffff");
        document.documentElement.style.setProperty("--borderhead", "#dbdbdb");
        document.documentElement.style.setProperty("--inputtext", "#2c2c2c");
        document.documentElement.style.setProperty("--inputbg", "#E1DAE3");
        document.documentElement.style.setProperty("--switcherbg", "#65558f");
        document.documentElement.style.setProperty(
          "--cardshadow",
          "rgba(0, 0, 0, 0.17)"
        );
        document.documentElement.style.setProperty("--copyedtext", "#8973c1");
        document.documentElement.style.setProperty("--copyalert", "#cebaff");
        document.documentElement.style.setProperty("--inputlabel", "#676767");
        document.documentElement.style.setProperty("--img", "0");
      }
    },
  },
  mounted() {
    const theme = localStorage.getItem("theme");

    if (theme != null){
      if(theme == 'false'){
        this.theme_flag = false;
      }else{
        this.theme_flag = true;
      }
      this.switch_theme();
    }

    for(let i = 0; i < 5; i++){
      const inp1 = localStorage.getItem(`inp1_${i}`);
      const inp2 = localStorage.getItem(`inp2_${i}`);
      if(inp1 != null){
        this.test[i].inp1 = inp1;
      }
      if(inp2 != null){
        this.test[i].inp2 = inp2;
      }
    }
  },

  watch: {
    test: {
    handler(newVal, oldVal) {
      for (let i = 0; i < 5; i++) {
        localStorage.setItem(`inp1_${i}`, newVal[i].inp1);
        localStorage.setItem(`inp2_${i}`, newVal[i].inp2);
      }
    },
    deep: true,
  },
  }
};
</script>

<style src="./main.css"></style>
