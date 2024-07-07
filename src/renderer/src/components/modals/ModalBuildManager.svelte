<script>
  import { buildPanelSelected, buildPanelActive } from "../../store";

  import BuildGeneratorModal from './BuildGeneratorModal.svelte';

  const modals = {
    'BUILD_GENERATOR': BuildGeneratorModal
  }
  let modal = null
  let active = false;
  let args = null

  

  $: active = $buildPanelActive
  $: if(active) {
    modal = modals[$buildPanelSelected.panelUIType]
    args = {
      id: $buildPanelSelected.id,
      title: $buildPanelSelected.name,
      icon: "🪵",
      cost: $buildPanelSelected.costMoney,
      workers: $buildPanelSelected.workers,
      workersCapacity: $buildPanelSelected.workersCapacity,
      status: $buildPanelSelected.generationStatus,
      generationCount: $buildPanelSelected.resourceGenerationTime
    }
    console.log(args)
  }


</script>
{#if $buildPanelActive && modal}
  <svelte:component this={modal} {args} />
{/if}