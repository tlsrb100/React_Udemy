import Card from './Card';
import useCount from '../hooks/use-counter';

const BackwardCounter = () => {
  let counter = useCount(false);
  let counter2 = useCount(false);
  return (
    <Card>
      {counter}
      {counter2}
    </Card>
  );
};

export default BackwardCounter;
