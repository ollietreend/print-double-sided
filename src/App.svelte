<script lang="ts">
  import Duplexer from './lib/Duplexer';

  let files, file;
  let sideAurl, sideBurl;
  $: if (files?.length > 0) file = files[0];

  $: if (file) {
    processFile();
  }

  const processFile = async () => {
    const arrayBuffer = await file.arrayBuffer();
    const duplex = await Duplexer.load(arrayBuffer);

    const sideAblob = new Blob([await duplex.sideA], {
      type: 'application/pdf',
    });
    sideAurl = URL.createObjectURL(sideAblob);

    const sideBblob = new Blob([await duplex.sideB], {
      type: 'application/pdf',
    });
    sideBurl = URL.createObjectURL(sideBblob);
  };
</script>

<main>
  <label for="browse-file">Choose a PDF file</label>
  <input
    type="file"
    multiple={false}
    accept="application/pdf"
    bind:files
    id="browse-file"
  />

  <div class="pdf-output">
    <iframe src={sideAurl} />
    <iframe src={sideBurl} />
  </div>
</main>

<style>
  .pdf-output {
    display: flex;
    height: 80vh;
  }
</style>
