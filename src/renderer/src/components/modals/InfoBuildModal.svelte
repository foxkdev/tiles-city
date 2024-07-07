<script>
  import { buildPanelActive } from "../../store";
export let title = 'Title'

const closeModal = () => {
  buildPanelActive.set(false)
}
</script>

<div class="absolute right-2 bottom-20 w-72 border border-[#645340] bg-[#3C3A39] flex flex-col rounded p-3 gap-3">
  <div class="flex w-full h-8 justify-between">
    <span class="font-bold text-[#FFE29C]">{title}</span>
    <svg on:click={closeModal} class="w-6 h-6 text-[#FFE29C] cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
    </svg>
  </div>
  <slot />
  
</div>