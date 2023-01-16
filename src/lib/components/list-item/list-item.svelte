<script lang="ts">
	import classNames from 'classnames';

	import * as theme from '$lib/theme';

	const className = classNames(theme.font.body, theme.text.body, 'list-item');
</script>

<li class={className}><slot /></li>
