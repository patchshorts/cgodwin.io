---
title: BrowserOS
icon: web
article: false
headerDepth: 1
showInSidebar: false
sidebar: false
---

<div id="emulator-container">
    <div id="screen_container"></div>
</div>

<script>

export default {
  name: 'Emulator',
  mounted() {
    let script = document.createElement('script')
    script.src = '/toys/lib/libv86.js'
    document.head.appendChild(script)
    // Create a new instance of the V86 emulator when the component is mounted

    await new Promise(resolve => script.onload = resolve);
    const emulator = new V86({
      wasm_path: '/toys/lib/v86.wasm',
      memory_size: 512 * 1024 * 1024,
      vga_memory_size: 8 * 1024 * 1024,
      screen_container: document.getElementById('screen_container'),
      initial_state: {
        url: '/toys/os/images/debian-state-base.bin',
      },
      filesystem: {
        baseurl: '/toys/os/images/debian-9p-rootfs-flat/',
      },
      autostart: true,
    });
  },
};
</script>

<style scoped>
/* Add any styles you need for your emulator container */
#emulator-container {
  /* Example styles */
  width: 100%;
  height: 100%;
}
</style>