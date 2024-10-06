<template>
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
      <img class="sun_icon" src="./imgs/sun.jpg" alt="" />
      <div class="switcher">
        <svg
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
      <div class="theme_switch__empty2"></div>
    </div>
  </header>
  <div class="empty_card"></div>
  <main>
    <div v-for="t in test" :key="t" :id="t.id" class="card">
      <h2>{{ t.name }}</h2>
      <div class="card__main">
        <div class="card__main__inputs">
          <div class="input_div">
            <p class="input_text">{{ t.inp1text }}</p>
            <input v-model="t.inp1" type="number" placeholder="Введите текст" />
            <img
              @click="clear(t, 'inp1')"
              class="input_img"
              src="./imgs/close.png"
              alt=""
            />
          </div>

          <div class="input_div">
            <p class="input_text">{{ t.inp2text }}</p>
            <input v-model="t.inp2" type="number" placeholder="Введите текст" />
            <img
              @click="clear(t, 'inp2')"
              class="input_img"
              src="./imgs/close.png"
              alt=""
            />
          </div>
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
          <h2>результат:</h2>
          <div class="result_container">
            <p
              @click="copy(percent(t.inp1, t.inp2), t.func)"
              v-if="t.func == 'persent'"
              class="copyed_text"
            >
              {{ percent(t.inp1, t.inp2) }}
            </p>
            <p
              @click="copy(growth_rates(t.inp1, t.inp2), t.func)"
              v-if="t.func == 'temps'"
              class="copyed_text"
            >
              {{ growth_rates(t.inp1, t.inp2) }}
            </p>
            <p
              @click="copy(target_price(t.inp1, t.inp2), t.func)"
              v-if="t.func == 'price'"
              class="copyed_text"
            >
              {{ target_price(t.inp1, t.inp2) }}
            </p>
            <p
              @click="copy(marginality(t.inp1, t.inp2), t.func)"
              v-if="t.func == 'mar'"
              class="copyed_text"
            >
              {{ marginality(t.inp1, t.inp2) }}
            </p>
            <p
              @click="copy(netdebt_ebitda(t.inp1, t.inp2), t.func)"
              v-if="t.func == 'n/e'"
              class="copyed_text"
            >
              {{ netdebt_ebitda(t.inp1, t.inp2) }}
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
export default {
  data() {
    return {
      persent1: null,
      copy_flag: null,
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
  methods: {
    percent(num1, num2) {
      return ((num1 * 100) / num2).toFixed(3);
    },
    growth_rates(num1, num2) {
      return ((num1 - num2) / num2).toFixed(3);
    },
    target_price(num1, num2) {
      return (num1 / num2).toFixed(3);
    },
    marginality(num1, num2) {
      return ((num1 / num2) * 100).toFixed(3);
    },
    netdebt_ebitda(num1, num2) {
      return (num1 / num2).toFixed(3);
    },
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
    increment() {
      this.count++;
    },
  },
};
</script>

<style src="./main.css"></style>
