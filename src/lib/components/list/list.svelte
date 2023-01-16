<script lang="ts">
	import classNames from 'classnames';

	import * as theme from '$lib/theme';

	export let listType: 'ul' | 'ol' = 'ul';

	const className = classNames('list-disc list-inside space-y-6', theme.maxWidth.body);
</script>

{#if listType === 'ul'}
	<ul class={className}><slot /></ul>
{:else}
	<ol class={className}><slot /></ol>
{/if}
