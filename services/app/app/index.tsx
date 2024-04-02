import { Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { client } from '~/lib/client';
export default function Home() {
  // const [hello, setHello] = useState<Array<{ id: string }>>([]);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await client.helloworld.get();
  //     setHello(data ?? []);
  //   })();
  // }, []);
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button
            onPress={async () => {
              client.helloworld.post();
              const { data } = await client.helloworld.get();
              // setHello(data ?? []);
            }}
            title="hello"
          />
        </Link>
        <Text>
          {/* {hello.map(({ id }) => (
            <View>{id}</View>
          ))} */}
        </Text>
      </Container>
    </>
  );
}
