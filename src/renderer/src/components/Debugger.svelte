<script>
  import { tileSelected } from "../store";
</script>

<div class="flex flex-col absolute top-12 right-3 bg-gray-800 p-3 rounded w-52 h-40">
  <h1 class="font-bold mb-2">Debugger</h1>
  
  <div><span class="font-bold">X:</span> {$tileSelected?.x || "-"}</div>
  <div><span class="font-bold">Y:</span> {$tileSelected?.y || "-"}</div>
  <div><span class="font-bold">Tile Type</span> {$tileSelected?.building?.type || $tileSelected?.type || "-"}</div>
</div>