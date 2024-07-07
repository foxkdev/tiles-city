<script lang="ts">
  import { onMount } from "svelte";
  import { gameLoaded } from "../../store";
  import { Game } from "../../game/game";
  import UiBottom from '../../components/UiBottom.svelte';
  import UiTop from '../../components/UiTop.svelte';
  import ModalBuildManager from '../../components/modals/ModalBuildManager.svelte';
	import Debugger from "../../components/Debugger.svelte";
  
  let loaded = false;

  let dom = null
  onMount( () => {
    // const dom = document.getElementById('game-window')
    window.game = new Game(dom);
    window.game.join();
    gameLoaded.subscribe( value => {
      // console.log('GAME LOADED', value)
      if (value) {
        // window.game.start();
        loaded = true;
      }
    })
    
  })
  
</script>

<div class="w-full h-full bg-[#3C3A39] flex">
  <div id="game-window" bind:this={dom} class="w-full h-full bg-white overflow-hidden flex" class:hidden={!loaded}></div>
  {#if loaded}
    <UiTop />
    <UiBottom />
    <ModalBuildManager />
  {:else} 
    <div class="w-full h-full flex items-center justify-center">Loading..</div>
  {/if}
  <Debugger />
</div>
