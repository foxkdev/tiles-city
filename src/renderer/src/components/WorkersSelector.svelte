<script>
  export let workers = 0
  export let workersCapacity = 0
</script>

<div class="flex w-full">
  <div class="font-bold text-[#FFE29C]">Workers</div>
</div>
<div class="flex justify-between h-12">
  <div class="flex-1 flex items-end justify-center">
    <svg class="w-6 h-6 text-[#FFE29C]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </svg>
    
  </div>
  <div class="w-[60%] flex items-end">
    <div class="flex flex-col items-center justify-end w-full text-[#FFE29C]">
      <span class="font-bold text-xl mb-2">{workers}</span>
      <input class="w-full h-2 bg-[#645340] rounded-lg appearance-none cursor-pointer range-lg" type="range" name="workers" bind:value={workers} min="0" max={workersCapacity}>
    </div>
  </div>
  <div class="flex-1 flex items-end justify-center">
    <svg class="w-6 h-6 text-[#FFE29C]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"/>
    </svg>
    
  </div>
</div>