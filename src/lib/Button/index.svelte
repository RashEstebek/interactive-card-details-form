<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface $$Props extends HTMLButtonAttributes {
		variant: "primary" | "secondary";
		size?: "block" | null;
		type: "submit" | "button";
		onClick?: ((e: MouseEvent) => void) | null | undefined;
	}

	export let type: "submit" | "button";
	export let onClick: ((e: MouseEvent) => void) | null = null;
</script>

<button
	class="button"
	{type}
	on:click={onClick}
	{...$$restProps}
>
	<slot />
</button>