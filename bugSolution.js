The solution involves using `Linking.getInitialURLAsync()` to get the initial URL, then set up the event listener.  We use `setTimeout` to introduce a slight delay which seems to help resolve the race condition:

```javascript
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

function App() {
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    const handleUrl = async () => {
      const url = await Linking.getInitialURLAsync();
      setInitialUrl(url);
    };
    const listener = ({ url }) => {
      setInitialUrl(url);
      console.log('URL received in listener:', url);
    };

      // Delay added to fix race conditions
    setTimeout(async () => {
       Linking.addEventListener('url', listener);
       handleUrl();
    }, 500);

    return () => {
      Linking.removeEventListener('url', listener);
    };
  }, []);

  return (
    <View>
      {initialUrl ? <Text>Initial URL: {initialUrl}</Text> : <Text>Waiting for URL...</Text>}
    </View>
  );
}
```