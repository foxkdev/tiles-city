<script>

export let text = 'Click me';
export let onClick = () => {};

</script>

<button on:click={onClick}>
  {text}
</button>