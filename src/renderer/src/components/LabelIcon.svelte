<script>
  export let cost = 0
  export let icon = ''
  export let label = ''
</script>
<span class="flex text-[#FFE29C] text-lg font-bold">
  {#if icon != ''}
  <span class="font-bold mr-1">{icon}</span>
  {/if}
  <slot name="icon" clas="mr-1"></slot>
  <span class="font-bold">{cost}</span>
  <span class="font-semibold text-sm flex items-end text-[#645340]">{label}</span>
</span>