<template>
<svg viewBox="0 0 100 100" class="animate mx-auto">
  <filter id="dropshadow" height="100%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
    <feFlood flood-color="rgba(76, 175, 80, 1)" flood-opacity="0.5" result="color"/>
    <feComposite in="color" in2="blur" operator="in" result="blur"/>
    <feMerge> 
      <feMergeNode/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
  <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(76, 175, 80, 0.5)" stroke-width="5"/>
  <path d="M67,93 A46.5,46.5 0,1,0 7,32 L43,67 L88,19" fill="none" stroke="rgba(76, 175, 80, 1)" stroke-width="5" stroke-linecap="round" stroke-dasharray="80 1000" stroke-dashoffset="-220"  style="filter:url(#dropshadow)"/>
</svg>
</template>

<style scoped>
svg {
  width : 100px;
  height: 100px;
}

svg.animate path {
  animation: dash .5s linear both;
}

@keyframes dash {
  0% { stroke-dashoffset: 210; }
  75% { stroke-dashoffset: -220; }
  100% { stroke-dashoffset: -205; }
}
</style>