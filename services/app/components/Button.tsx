import { Text, TouchableOpacity } from 'react-native';

export const Button = ({ onPress, title }: { onPress?: () => void; title: string }) => {
  return (
    <TouchableOpacity className={styles.button} onPress={onPress}>
      <Text className={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: 'items-center bg-indigo-500 rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
};
