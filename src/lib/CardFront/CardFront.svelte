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
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="54"
        height="30"
        viewBox="0 0 54 30"
        fill="none"
        >
        <ellipse cx="15.0932" cy="15" rx="15.0932" ry="15" fill="white" />
        <path
            d="M53.5 15C53.5 18.4489 50.6859 21.25 47.2081 21.25C43.7302 21.25 40.9161 18.4489 40.9161 15C40.9161 11.5511 43.7302 8.75 47.2081 8.75C50.6859 8.75 53.5 11.5511 53.5 15Z"
            stroke="white"
        />
    </svg>

    <p class="card-purple__number">{formatCardNumber(cardNumber || "0000000000000000")}</p>

    <div class="card-purple__name-cvc">
        <p>{cardName || "Jane Appleseed"}</p>
        <p>{expireMonth || "00"}/{expireYear || "00"}</p>
    </div>
</div>
</Motion>