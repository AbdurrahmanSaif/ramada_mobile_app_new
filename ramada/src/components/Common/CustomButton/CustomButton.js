import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomButton = ({ loading, children }) => (<Button
  icon={loading ?
    <Icon
      name="arrow-right"
      size={15}
      color="white"
    /> : null
  }
  title={children}
  />
);

export default CustomButton;
