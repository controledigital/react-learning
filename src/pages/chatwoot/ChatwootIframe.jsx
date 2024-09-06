import React, { useRef, useEffect } from 'react';

const ChatwootEmbed = () => {
  const iframeRef = useRef(null);

  // Function to send a message to the Chatwoot iframe
  const sendMessageToChatwoot = (message) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(message, 'https://talker.nuuv.dev');
    }
  };

  const injectStyles = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow && iframe.contentDocument) {
      try {
        const style = document.createElement('style');
        style.textContent = `
          /* Reset all elements to avoid overflow */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            max-width: 100% !important;  /* Prevent elements from exceeding the iframe's width */
          }

          body, html {
            width: 100%;
            height: 100%;
            overflow: hidden !important; /* Prevent any overflow */
          }

          /* Force containers to respect the iframe's size */
          .chatwoot-container, .widget-container, .main-container {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            overflow: hidden !important;
          }

          /* Adjust the width of specific elements that may be too wide */
          .profiler-result-full .profiler-result {
            width: 100% !important;  /* Change the width to 100% of the parent container */
            max-width: 100% !important;
          }

          /* Handle positioning to keep elements within the iframe */
          .profiler-results {
            position: relative !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          /* Handle potential issues with fixed or absolute positioning */
          .profiler-results.profiler-top,
          .profiler-results.profiler-bottom {
            left: 0 !important;
            right: 0 !important;
          }

          /* Prevent horizontal scroll */
          .profiler-results {
            overflow-x: hidden !important;
          }
        `;
        iframe.contentDocument.head.appendChild(style);
      } catch (error) {
        console.error('Error injecting styles:', error);
      }
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', injectStyles);
    }

    // Listening to messages from Chatwoot
    const handleMessage = (event) => {
      if (event.origin === 'https://talker.nuuv.dev') {
        try {
          const eventData = JSON.parse(event.data);
          console.debug('Received event from Chatwoot:', eventData);
        } catch (error) {
          console.error('Error parsing Chatwoot message:', error);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Clean up event listener on unmount
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', injectStyles);
      }
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <iframe
        ref={iframeRef}
        src="https://talker.nuuv.dev"
        title="Chatwoot Widget"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',  // Prevents scrollbars within the iframe
        }}
        allow="camera; microphone; fullscreen; display-capture; picture-in-picture; clipboard-write;"
      ></iframe>
    </div>
  );
};

export default ChatwootEmbed;
