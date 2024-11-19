<template>
  <div class="over_body"></div>
  <header>
    <h1 class="logo">Raschet.com</h1>
    <nav>
      <!-- <div class="dropdown toggle">
        <input id="t2" type="checkbox" checked>
        <label for="t2">Меню</label>
        <ul>
          <li>
            <div class="theme_switch">
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
            </div>
          </li>
          <li><a href="#first">процент от</a></li>
          <li><a href="#second">тмп. роста</a> </li>
          <li><a href="#third">целев. цена</a></li>
          <li><a href="#fourth">маржинал.</a></li>
          <li><a href="#fifth">netdebt/ebitda</a></li>
        </ul>
      </div> -->
    </nav>
    <div class="theme_switch">
      <span class="dropdown" :class="{shown: state}">
        <a href="#" @click.prevent="toggleDropdown" class="dropdown-toggle theme_switch__bg">Меню</a>
        <div class="dropdown-menu" v-show="state">
          <ul class="list-unstyled menu_list">
              <li>
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
            </li>
            <hr class="hr-line">
            <li><RouterLink to="/">Основные расчёты</RouterLink></li>
            <hr class="hr-line">
            <li><RouterLink to="/calc">Калькулятор облигаций</RouterLink></li>
          </ul>
        </div>
      </span>
    </div>
  </header>
  <div class="empty_card"></div>
  <main>
    <RouterView />
    <div></div>
  </main>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { percent, growth_rates, target_price, marginality, netdebt_ebitda } from "./EconomicCalcs.js";

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
      state: false,
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
    callPercent() {
      return percent(this.test[0].inp1, this.test[0].inp2);
    },
    callGrowth_rates() {
      return growth_rates(this.test[1].inp1, this.test[1].inp2);
    },
    callTarget_price() {
      return target_price(this.test[2].inp1, this.test[2].inp2);
    },
    callMarginality() {
      return marginality(this.test[3].inp1, this.test[3].inp2);
    },
    callNetdebt_ebitda() {
      return netdebt_ebitda(this.test[4].inp1, this.test[4].inp2);
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
        document.documentElement.style.setProperty("--input", "#939393");
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
        document.documentElement.style.setProperty("--input", "#8c8c8c");
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
    toggleDropdown() {
      this.state = !this.state; 
      // console.log("Dropdown state:", this.state); 
    },
    close(e) {
      if (!this.$el.contains(e.target) && !e.target.closest('.dropdown-toggle') && !e.target.closest('.theme_switch__bg')) { 
        this.state = false;
      }
      // console.log("Dropdown state:", this.state); 
    },
  },
  mounted() {
    document.addEventListener('click', this.close.bind(this))

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
  beforeDestroy () {
    document.removeEventListener('click',this.close)
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
