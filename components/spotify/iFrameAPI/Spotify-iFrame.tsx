


export default function SpotifyiFrame() {
  return (
    <>
    <div id="embed-iframe"></div>
  <script src="https://open.spotify.com/embed/iframe-api/v1" async>
  </script>
  <script type="text/javascript">
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        width: '100%',
        height: '160',
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
      const callback = (EmbedController) => {
        document.querySelectorAll('.episode').forEach(
          episode => {
            episode.addEventListener('click', () => {
              EmbedController.loadUri(episode.dataset.spotifyId)
            });
          })
      };
      IFrameAPI.createController(element, options, callback);
    };
  </script>

</>
  );
}