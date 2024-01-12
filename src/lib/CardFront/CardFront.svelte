<script lang="ts">
  import { Motion } from "svelte-motion";

  export let cardNumber: string;
  export let cardName: string;
  export let expireMonth: string | number = "MM";
  export let expireYear: string | number = "YY";

  function formatCardNumber(number: string | number) {
    return number
      .toString()
      .replace(/\W/gi, "")
      .replace(/(.{4})/g, "$1 ");
  }
</script>

<Motion
  let:motion
  initial={{ x: -50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <div class="card-purple" use:motion>

    <picture>
      <source srcset="./public/desktop/desktop-card-purple-rounds.svg" media="(min-width: 75em)">
      <img src="./public/mobile/mobile-card-purple-rounds.svg" alt="Rounds" />
    </picture>

    <p class="card-purple__number">{formatCardNumber(cardNumber || "0000000000000000")}</p>

    <div class="card-purple__name-cvc">
        <p>{cardName || "Jane Appleseed"}</p>
        <p>{expireMonth || "00"}/{expireYear || "00"}</p>
    </div>
</div>
</Motion>