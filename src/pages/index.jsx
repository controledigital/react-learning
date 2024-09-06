import { useEffect } from 'react';

export default function Home({ name }) {
  useEffect(() => {
    (function(d, t) {
      const BASE_URL = "https://talker.nuuv.net";
      const g = d.createElement(t);
      const s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g, s);
      g.onload = function() {
        if (window.talkerSDK && typeof window.talkerSDK.run === 'function') {
          window.talkerSDK.run({
            websiteToken: 'JA4oBz5i7WopBqna8CYaeoiW',
            baseUrl: BASE_URL,
          });
        }
      };
    })(document, "script");

    window.addEventListener("message", function(event) {
      console.log(event.data);
      try {
        const eventData = JSON.parse(event?.data);
        console.debug('eventData', eventData);
      } catch (e) { 
        console.error(e);
      }
    });
  }, []);

  return (
    <>
      <div>Hello, {name}!</div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://codi.nuuv.dev/api/hello');
  const data = await res.json();

  return {
    props: {
      name: data.name,
    },
  };
}
