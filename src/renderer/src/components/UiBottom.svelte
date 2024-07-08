<script>
  import { toolActive } from "../store";
  import { tools } from "../tools";

  
  let buttonBuildActive = {
    id: '',
    text: '',
    toolId: ''
  }
  const onButtonBuildClick = (button) => {
    buttonBuildActive = button
    toolActive.set(button)
  }

  let buttonsBuild = Object.values(tools).filter((tool) => tool.toolId === 'PLACE')

  let fastActions = [
    { ...tools['SELECT'] },
    { ...tools['DELETE'] },
    { ...tools['MOVE'] },
    { id: null },
    { id: null },
    { id: null },
    { id: null }
  ]

  $: toolActive.subscribe(value => {
    buttonBuildActive = value
  })
</script>

<div id="ui-bottom" class="absolute bottom-0 left-0 w-full h-[120px] flex  gap-6 items-center px-6">
  <div class="flex items-end pb-3 justify-end w-[25%] h-full">
    <div class="grid grid-cols-4 grid-rows-2 h-[60px]">
      {#each fastActions as action, i}
        <div class="flex items-center justify-center border border-[#645340] hover:bg-[#3C3A39] {buttonBuildActive.id === action.id ? 'bg-[#3C3A39]' : 'bg-[#2B272E]'} h-[30px] w-[30px]">
          {#if action.id}
            <button class="w-full h-full " on:click={() => onButtonBuildClick(action)}>{action.text}</button>
          {:else}
            <span class="text-gray-500 text-sm">{i+1}</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  <div class="flex flex-col w-[50%] h-full justify-end pb-3">
    <div class="h-[35px] flex rounded-t-lg">
      <span class="p-1 px-3 border border-b-0 border-r-0 rounded-tl-lg border-[#645340] hover:bg-[#3C3A39] bg-[#2B272E]">Farming</span>
      <span class="p-1 px-3 border border-b-0 border-[#645340] rounded-tr-lg bg-[#2B272E]">Obreros</span>
    </div>
    <div class="h-[60px] flex items-center rounded-lg rounded-tl-none bg-[#2B272E] border border-[#645340]">
      {#each buttonsBuild as button}
        <button class="border-r border-[#645340] h-full px-3 hover:bg-[#3C3A39] {buttonBuildActive.id === button.id ? 'bg-[#3C3A39]' : ''}" on:click={() => onButtonBuildClick(button)}>{button.text}</button>
      {/each}
    </div>
  </div>
  <div class="right">

  </div>
</div>