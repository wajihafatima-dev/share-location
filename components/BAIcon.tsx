import Icon from 'react-native-vector-icons/MaterialIcons';

type propsType = {
  name: string;
  size?: number;
  color?: string;
};

export default function BAIcon(props: propsType) {
  const {name, size, color} = props;
  return <Icon  name={name} color={color ?? '#000000'} size={size ?? 20} />;
}
