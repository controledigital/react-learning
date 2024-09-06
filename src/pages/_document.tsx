import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full light" data-theme="true" lang="en">
      <Head />
      <body className="antialiased flex h-full coditpl sidebar-fixed sidebar-collapse header-fixed bg-[#fefefe] dark:bg-coal-500">
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,t) {
                var BASE_URL="https://talker.nuuv.dev";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.defer = true;
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.talkerSDK.run({
                    websiteToken: 'WgozZ7fM92NnYjKS3yqdbu7X',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `,
          }}
        />
      </body>
    </Html>
  );
}
