<script lang="ts">
	import Button from './button.svelte';

	export let text: string;
	export let variant: 'primary' | 'secondary' | undefined = 'primary';
</script>

<svelte:component this={Button} {variant}>
	{text}
</svelte:component>
