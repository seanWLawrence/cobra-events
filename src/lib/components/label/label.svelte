<script lang="ts">
	import classNames from 'classnames';

	import * as theme from '$lib/theme';

	const className = classNames('flex flex-col gap-y-2', theme.font.heading, theme.text.formElement);
</script>

<label class={className}><slot /></label>
