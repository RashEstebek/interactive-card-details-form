<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  interface $$Props extends HTMLInputAttributes {
    error: boolean;
    id: string;
    placeholder?: string;
    value: string | number;
  }

  export let id: string;
  export let placeholder: string = "e.g. Jane Appleseed";
  export let value: string | number = "";
  export let error: boolean;
</script>

<input class={`${error && 'form-input-error'}`} {...$$restProps} {id} {placeholder} bind:value />
